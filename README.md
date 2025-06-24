# Data Visualization Platform

A modern, responsive data visualization dashboard built with React 18, TypeScript, Redux Toolkit, and Tailwind CSS. This application provides interactive charts, variable management, and real-time data insights for charging station analytics.

## 🚀 Features

### Core Functionality
- **Interactive Dashboard**: Real-time data visualization with hover tooltips and animations
- **Variable Management**: Slide-over panel for editing and selecting visualization variables
- **Context Windows**: Hover-triggered information panels with 1.5-second delay
- **Responsive Design**: Desktop-first approach with tablet and mobile adaptations
- **Smooth Animations**: Slide-in, fade-in, and hover effects throughout the interface

### Key Interactions Implemented

#### 1. Slide-Over Variable Editing Panel
- Triggered by clicking "Edit Variables" button
- Smooth slide-in animation from the right
- Variable selection with checkboxes
- Search and autofill functionality
- Expandable sections for primary/secondary variables

#### 2. Data Point Hover Tooltips
- Interactive chart with custom hover effects
- Animated tooltips showing detailed information
- Target line indicators for performance metrics
- Smooth fade-in animations

#### 3. Variable Context Windows
- 1.5-second hover delay before showing context
- Detailed variable descriptions and metadata
- Positioned relative to hovered element
- Quick action buttons for variable management

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Recharts for data visualization
- **Icons**: React Icons (Heroicons)
- **Authentication**: Firebase Authentication (configured)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-viz-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (Optional)
   ```bash
   cp env.example .env
   # Edit .env with your Firebase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Chart/           # Chart components
│   │   └── InteractiveChart.tsx
│   ├── Dashboard/       # Dashboard-specific components
│   │   ├── KPICards.tsx
│   │   └── VariablesPanel.tsx
│   ├── Layout/          # Layout components
│   │   └── Navigation.tsx
│   └── UI/              # Generic UI components
│       └── SlideOver.tsx
├── hooks/               # Custom React hooks
│   └── redux.ts         # Typed Redux hooks
├── pages/               # Page components
│   └── Dashboard.tsx
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup
│   └── slices/          # Redux slices
│       ├── authSlice.ts
│       ├── dashboardSlice.ts
│       └── uiSlice.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── firebase/            # Firebase configuration
│   └── config.ts
└── utils/               # Utility functions
```

## 🎨 Component Architecture

### Reusable Components
- **Navigation**: Sidebar and top navigation with tab switching
- **InteractiveChart**: Chart with hover interactions and tooltips
- **KPICards**: Key performance indicator display cards
- **VariablesPanel**: Variable selection with context windows
- **SlideOver**: Reusable slide-over panel component

### State Management
- **Auth Slice**: User authentication state
- **Dashboard Slice**: Chart data, variables, and KPIs
- **UI Slice**: Modal states, tooltips, and slide-over panels

## 🎯 Key Features Implemented

### 1. Dashboard Screen
- Primary data visualization with interactive line chart
- Variables panel with active variable display
- KPI cards showing key metrics
- Best scenario results with highlighted configurations

### 2. Variable Editing Slide-Over
- Smooth slide-in animation from right
- Variable categorization and selection
- Search functionality with autofill
- Expandable sections for variable details
- Real-time variable toggling

### 3. Interactive Data Points
- Hover tooltips with fade-in animation
- Target line indicators
- Performance metrics display
- Custom dot styling for highlighted data points

### 4. Context Window System
- 1.5-second hover delay implementation
- Dynamic positioning relative to trigger element
- Detailed variable information display
- Action buttons for variable management

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `env.example`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Tailwind CSS Configuration
Custom animations and colors are configured in `tailwind.config.js`:

- Slide-in animations for panels
- Fade-in animations for tooltips
- Custom color palette for dark theme
- Responsive breakpoints for mobile/tablet

## 📱 Responsive Design

- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Adapted layout with collapsible elements
- **Mobile**: Optimized for touch interactions

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive components
- **Redux Toolkit**: Optimized state updates with Immer
- **Tailwind CSS**: Purged unused styles in production

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in appropriate directories
2. Add TypeScript types in `src/types/`
3. Create Redux slices for state management
4. Implement responsive design with Tailwind CSS

## 🔮 Future Enhancements

- **Authentication**: Complete Firebase auth integration
- **Data Persistence**: Save user preferences and configurations
- **Real-time Updates**: WebSocket integration for live data
- **Export Features**: PDF/CSV export functionality
- **Advanced Filtering**: Date range and category filters
- **Themes**: Light/dark mode toggle
- **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 📄 License

This project is built as a take-home assignment for a Senior Frontend Engineer position.

## 🤝 Contributing

This is a demonstration project. For questions or suggestions, please reach out to the development team.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
