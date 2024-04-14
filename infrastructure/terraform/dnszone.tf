resource "azurerm_dns_zone" "subneter-public" {
  name                = "subneter.de"
  resource_group_name = azurerm_resource_group.main.name
}
