# Bacancy Technology Website Clone - Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Quick Start

### 1. Clone and Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Setup
```bash
# Copy environment file
cp env.example .env

# Edit .env file with your configuration
```

### 3. Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Sign up at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Get your connection string
5. Update `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bacancy-clone?retryWrites=true&w=majority
```

**Important**: Replace `username`, `password`, and `cluster.mongodb.net` with your actual values.

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the default connection string in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/bacancy-clone
```

### 4. Email Configuration (Optional)
For contact form functionality:
1. Use Gmail (recommended)
2. Enable 2-factor authentication
3. Generate an App Password
4. Update `.env`:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Start both backend and frontend
npm run dev
```

#### Production Mode
```bash
# Build frontend
cd client
npm run build
cd ..

# Start backend only
npm start
```

## Troubleshooting

### MongoDB Connection Issues

#### SSL/TLS Errors
If you encounter SSL connection errors with MongoDB Atlas:

1. **Update your connection string** to include SSL parameters:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bacancy-clone?retryWrites=true&w=majority&ssl=true&sslValidate=false
```

2. **Check your MongoDB Atlas settings**:
   - Ensure your IP address is whitelisted in Network Access
   - Verify your database user has correct permissions
   - Check if your cluster is active

3. **Alternative connection string format**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bacancy-clone?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true
```

#### Network Issues
- Ensure your firewall allows MongoDB connections (port 27017 for local, 27017/443 for Atlas)
- Check your internet connection
- Try using a VPN if your network blocks MongoDB

#### Authentication Issues
- Double-check username and password in connection string
- Ensure the database user has the correct roles (readWrite, dbAdmin)
- Try creating a new database user in Atlas

### Port Conflicts
- Backend runs on port 5000
- Frontend runs on port 3001
- If ports are busy, update in `package.json` and `client/package.json`

### Email Issues
- Ensure 2FA is enabled on Gmail
- Use App Password, not regular password
- Check if "Less secure app access" is enabled (if not using App Password)

## File Structure
```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main app component
│   └── package.json
├── config/                # Database configuration
├── models/                # MongoDB models
├── routes/                # API routes
├── server.js              # Express server
├── package.json           # Backend dependencies
└── .env                   # Environment variables
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run test-db` - Test database connection

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Features
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Contact form with email
- ✅ Blog system
- ✅ Team management
- ✅ Testimonials
- ✅ Portfolio showcase
- ✅ Authentication system
- ✅ Admin panel (basic)

## Next Steps
1. Customize content and styling
2. Add more features
3. Deploy to production
4. Set up CI/CD pipeline

## Support
If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check console logs for specific error messages 