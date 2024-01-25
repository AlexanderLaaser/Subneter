#!/bin/bash
cd backend
source venv/bin/activate
cd api
flask --app endpoints run
