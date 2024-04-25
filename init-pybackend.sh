#!/bin/bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
