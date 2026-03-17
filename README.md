# Dynamic Web Portfolio - Backend Server

A Node.js/Express backend server for a dynamic web portfolio application with user authentication, portfolio management, skills tracking, and contact form functionality.

## Features

- **User Authentication**: Registration, login, JWT-based authentication
- **Portfolio Management**: Create, read, update, delete portfolio projects
- **Skills Management**: Manage technical skills with categories and proficiency levels
- **Contact Form**: Handle contact form submissions with email notifications
- **Public API**: Public endpoints for viewing portfolio and skills
- **Database**: MongoDB integration with Mongoose ODM

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Validation**: express-validator
- **File Upload**: multer (configured)
- **Environment**: dotenv

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher) installed
2. **MongoDB** installed and running locally, or a MongoDB Atlas account
3. **Git** installed (optional, for cloning)

## Installation & Setup

### 1. Clone or Navigate to the Project
```bash
# If cloning from repository
git clone <repository-url>
cd dynamic-web-portfolio

# Or navigate to the existing project directory
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configurations
nano .env  # or use your preferred editor
```

Configure the following environment variables in `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (choose one)
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration (generate a secure secret)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex

# Email Configuration (for contact form notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password-or-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in `.env` file

### 5. Email Configuration (Optional)
For contact form email notifications:

#### Gmail Setup:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

## Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - User logout

### Portfolio Routes (`/api/portfolio`)
- `GET /api/portfolio/public` - Get all public portfolio items
- `POST /api/portfolio` - Create portfolio item (protected)
- `GET /api/portfolio` - Get user's portfolio items (protected)
- `GET /api/portfolio/:id` - Get single portfolio item (protected)
- `PUT /api/portfolio/:id` - Update portfolio item (protected)
- `DELETE /api/portfolio/:id` - Delete portfolio item (protected)

### Skills Routes (`/api/skills`)
- `GET /api/skills/public` - Get all public skills
- `POST /api/skills` - Add skill (protected)
- `GET /api/skills` - Get user's skills (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Contact Routes (`/api/contact`)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (protected)
- `PUT /api/contact/:id/read` - Mark contact as read (protected)
- `DELETE /api/contact/:id` - Delete contact (protected)

### Health Check
- `GET /api/health` - Server health check

## Testing the API

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Create Portfolio Item (use token from login)
```bash
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My Awesome Project",
    "description": "This is a description of my awesome project that demonstrates my skills.",
    "imageUrl": "https://example.com/project-image.jpg",
    "liveDemoUrl": "https://example.com/demo",
    "repositoryUrl": "https://github.com/username/project",
    "technologies": ["React", "Node.js", "MongoDB"],
    "featured": true
  }'
```

## Project Structure

```
server/
├── config/
│   ├── database.js         # MongoDB connection
│   └── email.js           # Email configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── portfolioController.js # Portfolio CRUD operations
│   ├── skillsController.js # Skills management
│   └── contactController.js # Contact form handling
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User schema
│   ├── Portfolio.js       # Portfolio schema
│   ├── Skills.js          # Skills schema
│   └── Contact.js         # Contact schema
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── portfolio.js       # Portfolio routes
│   ├── skills.js          # Skills routes
│   └── contact.js         # Contact routes
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
└── server.js              # Main application file
```

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for Atlas

2. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token format: `Bearer <token>`

3. **Email Not Sending**
   - Verify email credentials
   - Check Gmail app password setup
   - Ensure SMTP settings are correct

4. **CORS Issues**
   - Update `FRONTEND_URL` in `.env`
   - Check CORS configuration in `server.js`

### Development Tips:

1. **View Database**
   ```bash
   # Connect to MongoDB shell
   mongo
   
   # Use database
   use portfolio
   
   # View collections
   show collections
   
   # View users
   db.users.find()
   ```

2. **Reset Database**
   ```bash
   # In MongoDB shell
   db.users.deleteMany({})
   db.portfolios.deleteMany({})
   db.skills.deleteMany({})
   db.contacts.deleteMany({})
   ```

3. **Check Logs**
   - Server logs appear in terminal
   - Check MongoDB logs for connection issues

## Security Notes

- Always use strong JWT secrets in production
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for production
- Regularly update dependencies

## Next Steps

This backend is ready to be connected to a frontend application. You can:

1. Build a React/Vue/Angular frontend
2. Connect to the API endpoints
3. Implement authentication flow
4. Create portfolio and skills management interfaces
5. Add a contact form

## Support

If you encounter issues:
1. Check the console logs
2. Verify environment variables
3. Test API endpoints individually
4. Check database connections

The server should now be running successfully and ready to handle requests from your frontend application!