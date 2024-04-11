locals {
  user_object_id = "7b2baf8f-4831-40cc-98e6-77f3340f7b2d"
}

resource "azurerm_kubernetes_cluster" "main" {
  name                             = module.naming.kubernetes_cluster.name
  location                         = var.location
  resource_group_name              = azurerm_resource_group.aks.name
  dns_prefix                       = "subneter"
  http_application_routing_enabled = var.http_application_routing_enabled

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_D2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  azure_active_directory_role_based_access_control {
    managed            = true
    azure_rbac_enabled = true
  }

  key_vault_secrets_provider {
    secret_rotation_enabled = false
  }

  tags = {
    environment = var.stage
  }

}


