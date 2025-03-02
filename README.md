# [XTO10X Backend](https://xto10x.onrender.com/)



## Overview
This is the backend server for the XTO10X social collaboration platform. It provides API endpoints for user authentication, post management, comments, and other features required by the frontend application.
![image](https://github.com/user-attachments/assets/3c7f1441-3077-4a6f-be84-67ff35c5c5c6)


## Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and receive JWT token
- `GET /api/auth/user`: **Helpful to get current active/loggedIn user

### Posts
- `GET /api/posts`: Get all posts
- `GET /api/posts/:id`: Get a specific post by ID
- `POST /api/posts/create`: Create a new post (requires authentication)
- `PUT /api/posts/update/:id`: Update a post (requires authentication)
- `DELETE /api/posts/delete/:id`: Delete a post (requires authentication)

### Comments
- `GET /api/comments`: Get all comments for a post
- `GET /api/posts/getById/:id`: Get all comments for a post
- `GET /api/posts/getByPostId/:id`: Get all comments for a post
- 
- `POST /api/posts/comments/create`: Add a comment to a post (requires authentication)
- `PATCH /api/comments/update/:id`: Update a comment (requires authentication)
- `DELETE /api/comments/delete/:id`: Delete a comment (requires authentication)

![image](https://github.com/user-attachments/assets/07a80519-20c9-4f51-b437-23ce746ced29)

## Database Schema

### User Schema
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" },],
}
```

### Post Schema
```javascript
{
    title: { type: String, },
    description: { type: String, },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
}
```

### Comment Schema
```javascript
{
  commentedInput: { type: String, },
  commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
}
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
JWT_SECRET=your_jwt_secret_key
PORT = 3000
MONGO_URL = mongodb+srv://<username>:<password>@cluster0.mongodb.net/xto10x
```

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/akaash1024/xto10X
cd FExto10X/backend (if needed)
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit the .env file with your MongoDB connection string and JWT secret
```

4. Start the development server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication
#### Register a new user
```
POST /api/auth/register
```
Request body:
```json
{
    "name": "dikhya",
    "email": "dikhya@gmail.com",
    "password": "dikhya"
}
```

#### Login
```
POST /api/auth/login
```
Request body:
```json
{
    
    "email": "adarsh@gmail.com",
    "password": "adarsh"
}
```
Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "user123",
    "email": "user@example.com"
  }
}
```

### Middleware
- `auth.js`: JWT authentication middleware that verifies the token in request headers

## Error Handling
The API uses consistent error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security Measures
- Password hashing with bcrypt
- JWT for secure authentication
- Input validation and sanitization
- Rate limiting for API endpoints
- CORS configuration

## Deployment
This backend is deployed on Render at https://xto10x.onrender.com/

## Author
- **[Akash]**
