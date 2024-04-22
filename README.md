## Subneter

Application for calculating ip addresses in virtual networks with JSON-export functionalities

# Technical overview

Frontend: Vite JS \
Backend: Django \
CI: GitHub Actions \
Infrastructure: Azure Kubernetes with Helm \
IaC: Terraform \
GitOps/CD: ArgoCD \

# Infrastructure architecture

![Subneter Architecture (1)](https://github.com/AlexanderLaaser/Subneter/assets/45990752/886ae516-89df-4f30-98c0-00728d621f33)

# Environmental variables

VITE_API_SERVER_URL

# Solved Problems

1. State handling in multi component architecture with useContext API and Zustand (a state managing library)
2. Implementing persistant state management
3. Building declarative CICD Chain with ArgoCD
4. Migrating from flask to Django
5. CORS handling with CSFR cookies
