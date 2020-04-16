# deploy funcitons and api gateway
echo "Deploying api and function"
cd api
rm -rf .serverless/
env NODE_ENV=production serverless deploy --debug --region eu-central-1 --env production

# build and deploy frontend
echo "Building and deploying frontend"
cd ../frontend
rm -rf .serverless/
serverless --debug --region eu-central-1 --bucketName gemeinde-im-netz-frontend-prod
cd ..
