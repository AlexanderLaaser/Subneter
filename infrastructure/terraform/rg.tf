module "naming" {
  source = "Azure/naming/azurerm"
  suffix = [var.stage]
}

resource "azurerm_resource_group" "tfbackend" {
  name     = "rg-tfbackend"
  location = var.location
}

resource "azurerm_resource_group" "main" {
  name     = module.naming.resource_group.name
  location = var.location
}


