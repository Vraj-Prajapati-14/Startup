# Bacancy Technology Clone - MERN Stack

A modern, responsive website clone of Bacancy Technology built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX Design** - Beautiful, responsive design with smooth animations
- **Component-Based Architecture** - Reusable components with proper separation of concerns
- **Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Animations** - Framer Motion animations and CSS transitions
- **Routing** - React Router for seamless navigation
- **Form Handling** - React Hook Form with validation
- **State Management** - React hooks for local state management
- **API Integration** - Axios for backend communication

### Backend (Node.js + Express.js)
- **RESTful API** - Complete CRUD operations for all entities
- **Authentication** - JWT-based authentication system
- **Email Integration** - Nodemailer for contact form notifications
- **File Upload** - Multer for image uploads
- **Validation** - Express-validator for input validation
- **Security** - Helmet.js for security headers
- **CORS** - Cross-origin resource sharing enabled
- **Compression** - Response compression for better performance

### Database (MongoDB)
- **Mongoose ODM** - Object Document Mapping for MongoDB
- **Schema Validation** - Comprehensive data validation
- **Relationships** - Proper data relationships and references
- **Indexing** - Optimized database queries

## 📁 Project Structure

```
bacancy-clone-mern/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/    # Layout components
│   │   │   └── sections/  # Page sections
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── models/                # MongoDB schemas
├── routes/                # API routes
├── config/                # Configuration files
├── server.js              # Express server
├── package.json           # Backend dependencies
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **AOS** - Scroll animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Multer** - File uploads
- **Helmet** - Security middleware
- **CORS** - Cross-origin requests
- **Compression** - Response compression

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bacancy-clone-mern
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bacancy-clone
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

5. **Start the development servers**

   **Option 1: Run both servers simultaneously**
   ```bash
   npm run dev
   ```

   **Option 2: Run servers separately**
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📋 Available Scripts

### Backend Scripts
- `npm start` - Start production server
- `npm run server` - Start development server with nodemon
- `npm run build` - Build frontend for production

### Frontend Scripts (in client directory)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🗄️ Database Models

### Contact
- Contact form submissions
- Fields: name, email, phone, company, subject, message, service, budget, timeline

### Project
- Portfolio projects
- Fields: title, description, category, technologies, images, client info, testimonials

### Service
- Company services
- Fields: title, description, features, technologies, process, pricing

### Team
- Team members
- Fields: name, position, bio, image, social links, skills, experience

### Blog
- Blog posts
- Fields: title, content, author, category, tags, comments

### Testimonial
- Client testimonials
- Fields: client info, content, rating, project reference

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `PUT /api/contact/:id` - Update contact status

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Team
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Create team member (admin)
- `PUT /api/team/:id` - Update team member (admin)
- `DELETE /api/team/:id` - Delete team member (admin)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)
- `POST /api/blog/:id/comments` - Add comment to blog post

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get testimonial by ID
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

## 🎨 Pages & Components

### Pages
- **Home** - Landing page with hero, services, portfolio, testimonials
- **About** - Company information and team
- **Services** - Service offerings with detailed descriptions
- **Portfolio** - Project showcase with filtering
- **Team** - Team member profiles
- **Blog** - Blog posts with categories and search
- **Contact** - Contact form and company information

### Components
- **Header** - Navigation with mobile menu
- **Footer** - Company links and social media
- **HeroSection** - Animated hero with CTA
- **ServicesSection** - Service cards with hover effects
- **PortfolioSection** - Project grid with filtering
- **TestimonialsSection** - Client testimonials carousel
- **TeamSection** - Team member cards
- **BlogSection** - Blog post previews
- **ContactSection** - Contact form and map

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Email address for notifications
- `EMAIL_PASS` - Email password or app password
- `NODE_ENV` - Environment (development/production)

### Database Configuration
The application uses MongoDB with Mongoose ODM. Make sure MongoDB is running locally or use MongoDB Atlas for cloud hosting.

### Email Configuration
Configure your email service (Gmail recommended) for contact form notifications. Use app passwords for Gmail 2FA accounts.

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account
2. Install Heroku CLI
3. Create a new Heroku app
4. Set environment variables in Heroku dashboard
5. Deploy using Git

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your preferred hosting service

### Database Deployment (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Update the `MONGODB_URI` environment variable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

This project was created as a clone of the Bacancy Technology website for educational purposes.

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Note**: This is a clone project for educational purposes. All rights belong to their respective owners. 