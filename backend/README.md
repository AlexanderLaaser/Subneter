# Switch zum venv

sudo apt install python3 python3-pip ipython3
sudo apt-get install python-pip
pip install django
source venv/bin/activate

# Recreating Postgres DB

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py migrate calculator_app zero --fake
python3 manage.py migrate calculator_app

# Thunder Client Testing

1. delete invalid session in cookies tab
2. Add csrftoken from browser to cookies tab
3. login
4. set current X-CSRFTOKEN to Header in CRUD Operation
