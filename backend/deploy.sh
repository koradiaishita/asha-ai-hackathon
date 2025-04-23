#!/bin/bash

# Script to deploy the backend service to Cloud Run

# Exit on error
set -e

# Configuration
PROJECT_ID="your-gcp-project-id"  # Replace with your actual GCP project ID
REGION="us-central1"              # Replace with your preferred region
SERVICE_NAME="asha-ai-backend"    # Name for your backend service

# Set project
echo "Setting GCP project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Build and push Docker image to Google Container Registry
echo "Building and pushing backend image..."
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
cd "$(dirname "$0")"  # Navigate to the backend directory
gcloud builds submit --tag $IMAGE_NAME .

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 300 \
  --set-env-vars="GITHUB_TOKEN=${GITHUB_TOKEN}"

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')
echo "Backend deployed successfully to: $SERVICE_URL"
echo $SERVICE_URL > backend_url.txt

echo "Deployment complete!"