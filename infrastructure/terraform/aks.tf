locals {
  user_object_id = "7b2baf8f-4831-40cc-98e6-77f3340f7b2d"
}

resource "azurerm_kubernetes_cluster" "main" {
  name                = module.naming.kubernetes_cluster.name
  location            = var.location
  resource_group_name = azurerm_resource_group.aks.name
  dns_prefix          = "subneter"

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

  tags = {
    environment = var.stage
  }

}

resource "azurerm_role_assignment" "aksacrpull" {
  principal_id                     = azurerm_kubernetes_cluster.main.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
}

resource "azurerm_role_assignment" "laasercontributor" {
  scope                = azurerm_kubernetes_cluster.main.id
  role_definition_name = "Contributor"
  principal_id         = local.user_object_id
}
