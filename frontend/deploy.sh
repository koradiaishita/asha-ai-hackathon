#!/bin/bash

# Script to deploy the frontend service to Cloud Run

# Exit on error
set -e

# Configuration
PROJECT_ID="your-gcp-project-id"  # Replace with your actual GCP project ID
REGION="us-central1"              # Replace with your preferred region
SERVICE_NAME="asha-ai-frontend"   # Name for your frontend service

# Set project
echo "Setting GCP project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Get backend URL if it exists
BACKEND_URL_FILE="../backend/backend_url.txt"
if [ -f "$BACKEND_URL_FILE" ]; then
  BACKEND_URL=$(cat $BACKEND_URL_FILE)
  echo "Found backend URL: $BACKEND_URL"
  
  # Update the Nginx config to point to the actual backend URL
  sed -i "s|https://backend-service-url/|${BACKEND_URL}/|g" nginx.conf
else
  echo "Warning: Backend URL not found. You'll need to manually update the nginx.conf file."
fi

# Build and push Docker image to Google Container Registry
echo "Building and pushing frontend image..."
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
cd "$(dirname "$0")"  # Navigate to the frontend directory
gcloud builds submit --tag $IMAGE_NAME .

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 256Mi \
  --timeout 300

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')
echo "Frontend deployed successfully to: $SERVICE_URL"

echo "Deployment complete!"