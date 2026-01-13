# Blog Frontend

A modern, responsive blogging platform frontend built with React and TypeScript. This full-featured application allows users to create, read, comment on, and interact with blog posts with authentication and real-time updates.

## Project Overview

This is a comprehensive blog management system frontend that provides a complete user experience for a blogging platform. The application features user authentication, blog post management, commenting capabilities, and an intuitive UI built with modern web technologies.

### Key Features

- **User Authentication**: Secure sign-in and sign-up functionality with session management
- **Blog Management**: Create, read, and browse blog posts
- **Comments & Interactions**: Add comments to blog posts and view comment sections
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Protected Routes**: Secure access to authenticated user features
- **API Integration**: Seamless communication with backend services
- **Shimmer Loading**: Enhanced user experience with skeleton loaders

## Tech Stack

- **Frontend Framework**: React 19.1 with TypeScript
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1 with Vite plugin
- **Routing**: React Router DOM 7.8
- **HTTP Client**: Axios 1.11
- **Icons**: Lucide React 0.542
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication-related components
│   ├── blog-details/   # Blog detail view and comments
│   ├── home/           # Home page and blog listing
│   ├── nav-bar/        # Navigation components
│   ├── add-blog/       # Blog creation form
│   └── router/         # Route definitions and protection
├── services/           # API and business logic services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── type/               # TypeScript type definitions
├── constants/          # Application constants
└── assets/             # Static assets
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Available Commands

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

### Production Build

Build the application for production:

```bash
npm run build
```

This runs TypeScript type checking and builds the optimized production bundle.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality and TypeScript issues:

```bash
npm run lint
```

## Docker Setup

Build and run the application in Docker:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3001`

**Additional commands:**

- Run in background: `docker-compose up --build -d`
- Stop container: `docker-compose down`
- View logs: `docker-compose logs -f`

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open your browser and navigate to `http://localhost:5173`
4. Sign up for a new account or sign in with existing credentials
5. Browse, create, and comment on blog posts

## Features

### Authentication

- User registration and login
- Session management with secure token storage
- Protected routes for authenticated features
- Automatic logout functionality

### Blog Management

- View all blog posts on the home page
- Create new blog posts
- View detailed blog information
- Like blog posts with modal display

### Interactions

- Add comments to blog posts
- View comment sections on blog details
- Real-time comment updates

### UI/UX

- Responsive design for all screen sizes
- Shimmer loading states during data fetching
- Clean and intuitive navigation
- Icon-based UI elements using Lucide React

## Performance Optimizations

- Code splitting with Vite
- Lazy loading of routes and components
- Shimmer loading states for better perceived performance
- Debounced input handling for efficient API calls

## Browser Support

This application works on all modern browsers supporting ES2020 and above.

---

**Version**: 0.0.0  
**License**: [Add your license information here]  
**Repository**: [Add your repository URL here]
