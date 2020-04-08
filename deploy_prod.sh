# deploy funcitons and api gateway
echo "Deploying api and function"
cd api
env NODE_ENV=production serverless deploy --debug --region eu-central-1 --env production

# build and deploy frontend
echo "Building and deploying frontend"
cd ../frontend
serverless --debug --region eu-central-1 --bucketName gemeinde-im-netz-frontend-prod --env production
cd ..
