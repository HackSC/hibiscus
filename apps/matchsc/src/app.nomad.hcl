
job "matchsc" {
    datacenters = ["dc1"]
    type = "service"
    group "app-boot" {
        network {
            port "http" {}

            port "https" {
                static = 443
            }
        }

        service {
            name = "matchsc"
            port = "http"

            check {
                type     = "http"
                path     = "/health"
                interval = "10s"
                timeout  = "2s"
            }
        }

        task "pull-provision" {
            driver = "docker"

            config {
                image = "public.ecr.aws/hacksc/matchsc:latest"
                ports = ["http", "https"]
            }

            env {
                HOST = "0.0.0.0"
                PORT = "3333"
            }

            resources {
                cpu    = 500 # MHz
                memory = 128 # MB
            }
        }
    }
}
