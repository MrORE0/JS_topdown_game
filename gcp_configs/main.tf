provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_service" "my_service" {
  name     = "my-js-game-service"
  location = var.region
  project  = var.project_id

  template {
    spec {
      # containers {
      #   image = var.container_image
      # }

      # Adjust this so the gcp can wait longer for response from the container
      # before it throws an error
      timeout_seconds = 3600
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "invoker" {
  location = google_cloud_run_service.my_service.location
  project  = var.project_id
  service  = google_cloud_run_service.my_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
