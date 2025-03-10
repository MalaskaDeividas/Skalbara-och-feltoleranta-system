provider "azurerm" {
  features {}

  use_oidc = true  # Uses OpenID Connect authentication
}

resource "azurerm_resource_group" "rg" {
  name     = "hotel404ResourceGroup"
  location = "Sweden Central"
}

resource "azurerm_container_registry" "acr" {
  name                = "hotel404ContainerRegistry"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled          = true
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "hotel404AKSCluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "hotel404-aks"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

   depends_on = [azurerm_container_registry.acr]
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}