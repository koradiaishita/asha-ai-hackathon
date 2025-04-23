#!/bin/bash

# Main deployment script for Asha AI Hackathon project

# Exit on error
set -e

echo "==== Deploying Asha AI Hackathon project to Google Cloud Run ===="
echo ""
echo "This script will deploy both backend and frontend services."
echo ""

# Check if Google Cloud SDK is installed
if ! command -v gcloud &> /dev/null; then
  echo "Error: Google Cloud SDK (gcloud) is not installed or not in PATH."
  echo "Please install it from: https://cloud.google.com/sdk/docs/install"
  exit 1
fi

# Check if user is logged in
ACCOUNT=$(gcloud config get-value account 2>/dev/null)
if [ -z "$ACCOUNT" ]; then
  echo "You need to log in to Google Cloud first."
  gcloud auth login
fi

# Prompt for project ID if not set
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT_ID" ]; then
  read -p "Enter your Google Cloud Project ID: " PROJECT_ID
  gcloud config set project $PROJECT_ID
else
  echo "Using Google Cloud Project: $PROJECT_ID"
  read -p "Continue with this project? (y/n): " CONFIRM
  if [ "$CONFIRM" != "y" ]; then
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    gcloud config set project $PROJECT_ID
  fi
fi

# Prompt for region
REGION=$(gcloud config get-value run/region 2>/dev/null)
if [ -z "$REGION" ]; then
  echo "Select deployment region:"
  echo "1) us-central1 (Iowa)"
  echo "2) us-east1 (South Carolina)"
  echo "3) us-west1 (Oregon)"
  echo "4) europe-west1 (Belgium)"
  echo "5) asia-east1 (Taiwan)"
  echo "6) asia-south1 (Mumbai)"
  read -p "Enter selection (1-6): " REGION_CHOICE
  
  case $REGION_CHOICE in
    1) REGION="us-central1" ;;
    2) REGION="us-east1" ;;
    3) REGION="us-west1" ;;
    4) REGION="europe-west1" ;;
    5) REGION="asia-east1" ;;
    6) REGION="asia-south1" ;;
    *) REGION="us-central1"; echo "Invalid choice, using us-central1." ;;
  esac
  
  gcloud config set run/region $REGION
fi

echo "Using region: $REGION"

# Check if services already exist
backend_exists=$(gcloud run services list --platform managed --format="value(metadata.name)" | grep -c "asha-ai-backend" || true)
frontend_exists=$(gcloud run services list --platform managed --format="value(metadata.name)" | grep -c "asha-ai-frontend" || true)

# Update deploy scripts with project ID and region
sed -i "s/PROJECT_ID=\"your-gcp-project-id\"/PROJECT_ID=\"$PROJECT_ID\"/g" backend/deploy.sh
sed -i "s/REGION=\"us-central1\"/REGION=\"$REGION\"/g" backend/deploy.sh

sed -i "s/PROJECT_ID=\"your-gcp-project-id\"/PROJECT_ID=\"$PROJECT_ID\"/g" frontend/deploy.sh
sed -i "s/REGION=\"us-central1\"/REGION=\"$REGION\"/g" frontend/deploy.sh

# Make scripts executable
chmod +x backend/deploy.sh
chmod +x frontend/deploy.sh

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GitHub token is needed for the backend."
  read -p "Enter your GitHub token (or press Enter to skip, you can add it later): " GITHUB_TOKEN
  if [ -n "$GITHUB_TOKEN" ]; then
    export GITHUB_TOKEN
  else
    echo "No GitHub token provided. You'll need to set it in the Cloud Run service later."
  fi
fi

# Deploy backend first
echo ""
echo "==== Deploying Backend Service ===="
./backend/deploy.sh

# Deploy frontend
echo ""
echo "==== Deploying Frontend Service ===="
./frontend/deploy.sh

echo ""
echo "==== Deployment Complete ===="
echo ""
echo "Your application has been deployed to Google Cloud Run!"
echo ""
echo "Backend URL: $(cat backend/backend_url.txt 2>/dev/null || echo "Error getting backend URL")"
echo "Frontend URL: $(gcloud run services describe asha-ai-frontend --platform managed --format 'value(status.url)' 2>/dev/null || echo "Error getting frontend URL")"
echo ""
echo "Note: It may take a few minutes for the services to be fully available."