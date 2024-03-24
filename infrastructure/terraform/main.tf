provider "azurerm" {
  features {

  }
}

terraform {
  backend "azurerm" {
    resource_group_name  = azurerm_resource_group.tfbackend.name
    storage_account_name = azurerm_storage_account.tfbackend.name
    container_name       = azurerm_storage_container.tfbackend.name
    key                  = "${var.stage}.terraform.tfstate"
  }
}

