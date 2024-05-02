import json
from django.contrib.auth import authenticate, login, get_user_model, logout
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register_user(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        email = data['email']
        first_name = data.get('firstname', '')
        last_name = data.get('lastname', '')
    except (KeyError, json.JSONDecodeError) as e:
        # If JSON is not valid or key element are missing
        return JsonResponse({'error': 'Invalid or missing data'}, status=400)

    if not (username and password and email):
        return JsonResponse({'error': 'Missing data'}, status=400)

    # Creating user entry
    try:
        user = User.objects.create_user(username, email, password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
def login_user(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
    except (KeyError, json.JSONDecodeError) as e:
        # If JSON is not valid or key element are missing
        return JsonResponse({'error': 'Invalid or missing data'}, status=400)

    if not (username and password):
        return JsonResponse({'error': 'Missing email or password'}, status=400)

    # authenticate user
    user = authenticate(request, username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Account is disabled'}, status=403)
    else:
        return JsonResponse({'error': 'Invalid login credentials'}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    User = get_user_model()
    user = User.objects.get(username=request.user.username)
    user_data = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    }
    return JsonResponse({'user': user_data}, status=200)

@api_view(['POST'])
def logout_user(request):
    # logout of current user
    logout(request)
    
    return JsonResponse({'message': 'Logged out successfully'}, status=200)