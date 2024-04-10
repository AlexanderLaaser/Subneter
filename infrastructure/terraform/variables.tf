variable "stage" {
  type    = string
  default = "dev"
}

variable "location" {
  type    = string
  default = "West Europe"
}

variable "clientid" {
  type = string
}

variable "http_application_routing_enabled" {
  default = true
}
