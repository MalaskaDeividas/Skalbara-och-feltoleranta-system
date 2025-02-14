provider "azurerm" {
  features {}
  
  subscription_id = "b05d73a2-6d14-4c20-8197-d5be19f0c03f"
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
}
