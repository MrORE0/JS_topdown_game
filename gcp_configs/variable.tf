variable "project_id" {
  description = "Your GCP project ID"
  type        = string
}

variable "region" {
  description = "Region to deploy the Cloud Run service"
  type        = string
  default     = "europe-west2"
}

variable "container_image" {
  description = "Full container image URL (e.g., Artifact Registry or GCR)"
  type        = string
}
