# deploy funcitons and api gateway
echo "Deploying api and function"
cd api
serverless --debug --region eu-central-1 deploy

# build and deploy frontend
echo "Builinf and deploying frontend"
cd ../frontend
serverless --debug --region eu-central-1 --bucketName gemeinde-im-netz-frontend
cd ..