## Prerequisites

Ensure the following are installed on your machine:

1. Node.js (v14 or later): [Download Node.js](https://www.educative.io/edpresso/what-is-mern-stack)

2. npm (bundled with Node.js) or yarn (optional): [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

3. MongoDB: Install MongoDB Community Edition or use a cloud solution like MongoDB Atlas.

4. Git: [Install Git](https://git-scm.com/downloads)

5. A Code Editor (e.g., VSCode): [Download VSCode](https://code.visualstudio.com/download)

### Step 1: Clone the Repository

Open a terminal and run the following command to clone the project:

`git clone https://github.com/Kshitijsawant17/VideoManagementSystem.git`

`cd VideoManagementSystem`

### Step 2: Install Dependencies

Install server-side dependencies:

`cd server`
`npm install`

Install client-side dependencies:

`cd client`
`npm install`

### Step 3: Configure Environment Variables

Create a .env file in both the server and client folders based on the provided .env.example (if available).

Example .env for the Server:

`PORT=5000`

`DB_HOST=localhost`
`DB_PORT=27017`
`DB_NAME=video-dataset`
`DB_USER=http`
`DB_PASS=`

`JWT_SECRET=1234567890`

`NODE_ENV=development`


Example .env for the Client:

`REACT_APP_CLIENT_HOST_DEV=http://localhost:3000`
`REACT_APP_API_HOST_DEV=http://localhost:5000`

Note: Replace placeholders like your_jwt_secret and mern_database with actual values.

### Step 4: Start MongoDB

Start your MongoDB server:

If using a local MongoDB installation, run:

`mongod`

If using MongoDB Atlas, ensure your database is accessible and correctly configured in the MONGO_URI.

### Step 5: Run the Project

Start the Server:

Navigate to the server directory and run:

`npm run dev`

Start the Client:

Navigate to the client directory and run:

`npm start`

### Step 6: Access the Application

1. Open your browser and go to:

Frontend: (http://localhost:3000)

Backend API: (http://localhost:5000/api)

2. Verify that both the client and server are running correctly.

#### Common Issues and Solutions

1. Dependency Issues:

Delete node_modules and package-lock.json or yarn.lock, then reinstall dependencies:

`rm -rf node_modules package-lock.json`
`npm install`

2. MongoDB Connection Errors:

Ensure MongoDB is running.

Check your MONGO_URI value in .env.

3. Port Conflicts:

Modify the PORT in the .env file if another process is using the default ports.

4. CORS Errors:

Ensure your server has CORS enabled:

`const cors = require('cors');`
`app.use(cors());`
