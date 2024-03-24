resource "azurerm_storage_account" "tfbackend" {
  name                          = "sttfbackendsubneter"
  resource_group_name           = azurerm_resource_group.tfbackend.name
  location                      = var.location
  account_tier                  = var.sa_tier
  account_replication_type      = "LRS"
  public_network_access_enabled = false

  tags = {
    environment = var.stage
  }
}

resource "azurerm_storage_container" "backend" {
  name                  = "terraform-state"
  storage_account_name  = azurerm_storage_account.tfbackend.name
  container_access_type = "private"
}
