# 🚗 Car Rental Microservice

## 📖 Description
The **Car Rental Microservice** is a backend service built with Node.js and Express that manages car rental operations.  
It provides a RESTful API to perform CRUD (Create, Read, Update, Delete) operations on car records stored in DynamoDB.  
Each car entry includes details such as model name, license plate, rental price, availability, and auto‑managed timestamps (`created_at`, `updated_at`).

---

## 🚀 Getting Started

### 1. Clone the repository and install dependencies if running locally:
```bash
git clone https://github.com/younis-alafoo/MicroserviceApp.git
cd MicroserviceApp
npm install
```

### 2. Configure environment variables
Create a .env file in the project root with the following keys:
PORT=3000
DYNAMODB_REGION=eu-north-1
AWS_ACCESS_KEY_ID=access-key
AWS_SECRET_ACCESS_KEY=secret-key

### 3. Configure AWS CLI (required for Terraform)
Terraform uses AWS CLI credentials by default. Run:
```bash
aws configure
```
insert AWS Access Key ID, AWS Secret Access Key, and Default region name (eu-north-1)

### 4. Infrastructure with Terraform
This project includes Terraform scripts to provision AWS resources. Terraform will use the AWS credentials configured via aws configure.

#### A. Initialize Terraform: 
terraform init
#### B. Preview changes:
terraform plan
#### C. Apply changes: 
terraform apply

### 5. Run the service locally
npm run dev

### 6. 🐳 Running with Docker
#### A. Build the Docker image
docker build -t car-image .

#### B. Run the container
docker run -p 3000:3000 \
 -e NODE_ENV=dev \
 -e PORT=3000 \
 -e AWS_ACCESS_KEY_ID= access-key \
 -e AWS_SECRET_ACCESS_KEY=secret-key \
 --name car_container car_image

#### C. Verify the service
curl http://localhost:3000/cars

---

### 6. 📡 API Endpoints
- GET /cars → Retrieve all cars
- POST /cars → Create a new car
- GET /cars/:id → Retrieve a car by ID
- PUT /cars/:id → Update a car by ID
- DELETE /cars/:id → Delete a car by ID

Example request:
POST http://localhost:3000/cars
  
  '{
    "model_name": "Toyota Corolla",
    "license_plate": "ABC-123",
    "rent_price": 49.99,
    "available": true
  }'

---

### 7. 🛠️ Technologies Used
- Node.js – JavaScript runtime for building scalable backend services
- Express – Web framework for handling routes and middleware
- @aws-sdk/client-dynamodb and @aws-sdk/lib-dynamodb: Toolkits for interacting with DynamoDB.
- Joi – Schema validation for request payloads
- dotenv – Environment variable management
- uuid – Unique ID generation for car records
- Docker – Containerization for reproducible deployments
- Terraform – Infrastructure as Code for AWS resource provisioning