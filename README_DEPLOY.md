# Deploy to Google Cloud Run

This project includes a Node backend and static site files.

## Steps to publish on Google Cloud

1. Install the Google Cloud SDK:
   - https://cloud.google.com/sdk/docs/install

2. Authenticate and set your project:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. Enable required services:
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com
   ```

4. Build and deploy to Cloud Run:
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/hariom-student-portal
   gcloud run deploy hariom-student-portal \
     --image gcr.io/YOUR_PROJECT_ID/hariom-student-portal \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

5. After deployment, Cloud Run will provide a public URL.

## Notes

- `Dockerfile` is already included and configures the app to run on Cloud Run.
- Your site will be hosted with the Node backend available at the same address.
- If you want a static-only deployment instead, I can also help set up Firebase Hosting.
