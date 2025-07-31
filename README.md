# 📖 Personal Diary Application

A full-stack personal diary application built with React frontend and Node.js/Express backend with MongoDB database.

## Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Secure password hashing with bcrypt
- User roles (free, premium, pro)

### 📝 Diary Management
- Create, read, update, and delete diary entries
- Real-time editing with inline edit functionality
- Timestamp tracking for all entries
- Responsive design for mobile and desktop

### 🤖 AI Features (Pro Users)
- AI-generated diary entries (placeholder implementation)
- Role-based access control

### 🎨 Modern UI/UX
- Beautiful gradient design
- Smooth animations and transitions
- Responsive layout
- Clean and intuitive interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Project Structure

```
diary/
├── server/                 # Backend code
│   ├── models/            # Database models
│   │   ├── User.js        # User model
│   │   └── Note.js        # Note model
│   ├── routes/            # API routes
│   │   ├── auth.js        # Authentication routes
│   │   └── notes.js       # Notes routes
│   ├── middlewares/       # Middleware functions
│   │   └── auth.js        # JWT authentication middleware
│   └── server.js          # Main server file
├── my-diary/              # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Navbar.js
│   │   │   └── *.css      # Component styles
│   │   ├── App.js         # Main app component
│   │   └── App.css        # Global styles
│   └── package.json       # Frontend dependencies
├── package.json           # Backend dependencies
└── README.md             # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd diary
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd my-diary
npm install
cd ..
```

### 4. Configure MongoDB
The application is currently configured to use a MongoDB Atlas cluster. If you want to use a local MongoDB instance or your own cluster, update the connection string in `server/server.js`:

```javascript
mongoose.connect("your-mongodb-connection-string");
```

### 5. Start the backend server
```bash
npm start
# or for development with auto-restart
npm run dev
```

The backend will start on `http://localhost:5000`

### 6. Start the frontend development server
```bash
cd my-diary
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes/my` - Get user's notes (requires auth)
- `POST /api/notes/create` - Create a new note (requires auth)
- `PUT /api/notes/:id` - Update a note (requires auth)
- `DELETE /api/notes/:id` - Delete a note (requires auth)
- `POST /api/notes/ai-generate` - Generate AI note (requires pro role)

### Health Check
- `GET /api/health` - Server health status

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Write Entries**: Use the text area to write your diary entries
3. **Manage Entries**: Edit or delete your entries using the action buttons
4. **AI Generation**: Pro users can generate AI-assisted entries (placeholder feature)

## Environment Variables

For production, consider setting up environment variables:

```bash
# Create a .env file in the root directory
JWT_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Error handling middleware

## Future Enhancements

- [ ] Real AI integration for diary generation
- [ ] Rich text editor with formatting
- [ ] Image upload support
- [ ] Diary entry categories/tags
- [ ] Search functionality
- [ ] Export diary entries
- [ ] Email notifications
- [ ] Dark mode theme
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on the repository. 