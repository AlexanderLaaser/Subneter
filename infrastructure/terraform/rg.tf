module "naming" {
  source  = "Azure/naming/azurerm"
  suffix = [ var.stage ]
}

resource "azurerm_resource_group" "rg-subneter" {
  name     = module.naming.resource_group.name
  location = var.location
}