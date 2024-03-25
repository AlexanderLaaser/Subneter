terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfbackend"
    storage_account_name = "sttfbackendsubneter"
    container_name       = "terraform-state"
    key                  = "dev.terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.97.1"
    }
  }
}
