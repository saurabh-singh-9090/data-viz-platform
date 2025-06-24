# Data Visualization Platform

A modern, responsive data visualization platform built with React, TypeScript, and Firebase authentication. Features an interactive dashboard for charging station analytics with real-time data visualization and user management.

## 🌐 Live Demo

**[View Live Application](https://saurabh-singh-9090.github.io/data-viz-platform/)**

## Snapshots

<img width="1466" alt="image" src="https://github.com/user-attachments/assets/681d5b3c-8fb1-4549-8857-a83ba03c651c" />
<img width="1461" alt="image" src="https://github.com/user-attachments/assets/1c06aeb4-453b-4dbf-88c8-9b94f6e1af82" />
<img width="752" alt="image" src="https://github.com/user-attachments/assets/79a6cf3b-a07e-42cb-baa8-5d678ce3adaf" />



## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Technical Decisions](#technical-decisions)
- [Known Limitations](#known-limitations)
- [Time Spent](#time-spent)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

## ✨ Features

### 🔐 Authentication System
- **Email/Password Authentication** - Complete sign up and sign in flow
- **Google OAuth Integration** - One-click authentication with Google
- **Password Reset** - Email-based password recovery
- **Email Verification** - Automatic email verification for new accounts
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Persistent Sessions** - User sessions maintained across browser refreshes

### 📊 Dashboard & Visualization
- **Interactive Charts** - Dynamic data visualization using Recharts
- **KPI Cards** - Key performance indicators with trend analysis
- **Multi-tab Navigation** - Charging Stations, Fleet Sizing, and Parking modules
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 User Interface
- **Modern Dark Theme** - Professional dark UI with green accent colors
- **Responsive Navigation** - Adaptive sidebar and mobile-friendly hamburger menu
- **User Profile Management** - Avatar display with user information and sign-out
- **Loading States** - Smooth loading indicators and transitions
- **Error Handling** - User-friendly error messages and error boundaries

### 📱 Mobile Experience
- **Touch-friendly Interface** - Optimized for mobile interactions
- **Horizontal Scrollable Navigation** - Mobile-optimized tab navigation
- **Overlay Sidebar** - Full-screen mobile menu with backdrop
- **Responsive Typography** - Scalable text and proper spacing

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and concurrent features
- **TypeScript** - Type-safe development with strong typing
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### State Management
- **Redux Toolkit** - Modern Redux with simplified store setup
- **React Redux** - React bindings for Redux state management
- **Async Thunks** - Handling asynchronous authentication operations

### Authentication & Backend
- **Firebase Authentication** - Secure user authentication service
- **Firebase Analytics** - User behavior tracking and analytics
- **Environment Variables** - Secure configuration management

### Data Visualization
- **Recharts** - Composable charting library built on React and D3
- **React Icons** - Comprehensive icon library including Google icons

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Autoprefixer** - Automatic CSS vendor prefixing
- **PostCSS** - CSS processing and optimization

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**
- **Firebase Account** (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/saurabh-singh-9090/data-viz-platform.git
cd data-viz-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider (optional)
4. Get your Firebase configuration from Project Settings

### 4. Environment Configuration
Create a `.env` file in the project root:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 5. Configure Firebase Authorized Domains
In Firebase Console → Authentication → Settings → Authorized domains:
- Add `localhost` (for development)
- Add your production domain (for deployment)

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID | No |

**Note:** All variables are prefixed with `VITE_` to make them available in the browser. Fallback values are configured in the Firebase config for development.

## 💻 Local Development

### Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🏗 Technical Decisions

### Architecture Decisions

#### **React + TypeScript**
- **Rationale**: Provides type safety, better developer experience, and catches errors at compile time
- **Trade-off**: Slightly longer development time for type definitions vs. runtime error prevention

#### **Redux Toolkit for State Management**
- **Rationale**: Centralized state management for authentication and UI state
- **Trade-off**: Additional complexity vs. predictable state updates and debugging capabilities

#### **Firebase Authentication**
- **Rationale**: Secure, scalable authentication with minimal backend setup
- **Trade-off**: Vendor lock-in vs. rapid development and enterprise-grade security

#### **Tailwind CSS for Styling**
- **Rationale**: Utility-first approach allows rapid prototyping and consistent design
- **Trade-off**: Larger HTML classes vs. faster development and smaller CSS bundle


### Performance Optimizations

#### **Code Splitting**
- **Implementation**: Dynamic imports for authentication components
- **Benefit**: Reduced initial bundle size

#### **Memoization**
- **Implementation**: React.memo for expensive components
- **Benefit**: Prevents unnecessary re-renders

## ⚠️ Known Limitations

### Technical Limitations
1. **Firebase Dependency**: Requires active Firebase project and internet connection
2. **Browser Compatibility**: Modern browsers only (ES2020+ features)

### Feature Limitations
1. **Data Source**: Currently uses mock data - needs integration with real APIs
2. **Offline Support**: No offline functionality implemented
3. **Real-time Updates**: Charts don't update in real-time (would need WebSocket/Firebase Realtime Database)
4. **Export Functionality**: No data export capabilities (CSV, PDF, etc.)

### UI/UX Limitations
1. **Accessibility**: Could benefit from better ARIA labels and keyboard navigation
2. **Internationalization**: No multi-language support

### Security Considerations
1. **Environment Variables**: Sensitive config exposed in client bundle (normal for Firebase)
2. **Rate Limiting**: No client-side rate limiting for API calls
3. **Input Validation**: Basic validation only (server-side validation recommended)

## ⏱️ Time Spent: approx 7 hours

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthContainer.tsx       # Main auth flow container
│   │   ├── LoginForm.tsx          # Email/password login
│   │   ├── SignUpForm.tsx         # User registration
│   │   ├── ForgotPasswordForm.tsx # Password reset
│   │   └── ProtectedRoute.tsx     # Route protection
│   ├── Chart/
│   │   └── InteractiveChart.tsx   # Main chart component
│   ├── Dashboard/
│   │   ├── KPICards.tsx          # Key performance indicators
│   │   └── VariablesPanel.tsx    # Variable selection panel
│   ├── Layout/
│   │   └── Navigation.tsx        # Responsive navigation
│   └── UI/
│       ├── SlideOver.tsx         # Slide-out panel
│       └── ErrorBoundary.tsx     # Error handling
├── firebase/
│   └── config.ts                 # Firebase configuration
├── hooks/
│   ├── redux.ts                  # Typed Redux hooks
│   └── useAuth.ts               # Authentication hook
├── pages/
│   └── Dashboard.tsx            # Main dashboard page
├── services/
│   └── authService.ts           # Firebase auth service
├── store/
│   ├── index.ts                 # Redux store configuration
│   └── slices/
│       ├── authSlice.ts         # Authentication state
│       ├── dashboardSlice.ts    # Dashboard state
│       └── uiSlice.ts          # UI state
├── types/
│   └── index.ts                 # TypeScript type definitions
└── utils/                       # Utility functions
```

## 🚀 Deployment

The application is deployed on GitHub Pages using GitHub Actions:

### Deployment URL
**https://saurabh-singh-9090.github.io/data-viz-platform/**

### Deployment Process
1. Code is pushed to `main` branch
2. `npm run deploy` builds and pushes to `gh-pages` branch
3. GitHub Pages serves the static files

### Environment Configuration
- Production builds use environment variables with fallbacks
- Firebase is configured for the GitHub Pages domain
- Vite base URL is set for proper asset loading

---





**Developer**: Saurabh Singh  
**GitHub**: [@saurabh-singh-9090](https://github.com/saurabh-singh-9090)  
**Project Link**: [https://github.com/saurabh-singh-9090/data-viz-platform](https://github.com/saurabh-singh-9090/data-viz-platform)
