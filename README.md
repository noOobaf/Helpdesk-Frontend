# Helpdesk Frontend

A modern React-based frontend for a helpdesk application with authentication system and dashboard functionality.

## 🚀 Features

- **Authentication System**: Sign In, Sign Up, Forgot Password, and Verify Account pages
- **Modern UI**: Built with Ant Design components and custom styling
- **Responsive Design**: Optimized for desktop and tablet viewing
- **State Management**: React Context for authentication state
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Ant Design** for UI components
- **React Router DOM** for routing
- **Lato Font** for typography
- **CSS-in-JS** for styling

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx        # Two-column layout for auth pages
│   │   └── SignInForm.tsx        # Sign-in form component
│   ├── ui/
│   │   ├── Button.tsx            # Custom styled button component
│   │   └── Input.tsx             # Custom styled input component
│   └── layout/
│       └── Logo.tsx              # We Win logo component
├── pages/
│   └── auth/
│       └── AuthPage.tsx          # Main auth page with state switching
├── types/
│   └── auth.ts                   # TypeScript type definitions
└── assets/
    └── styles/
        └── globals.css           # Global styles and fonts
```

## 🎨 Design System

### Colors
- **Primary**: #4D2EED (Purple)
- **Secondary**: #1D115A (Dark Purple)
- **Text Primary**: #0C1421 (Dark)
- **Text Secondary**: #8897AD (Grey)
- **Background**: #FFF (White)

### Typography
- **Font Family**: Lato
- **Weights**: 300, 400, 500, 600, 700, 800

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/noOobaf/Helpdesk-Frontend.git
cd Helpdesk-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## 📱 Current Pages

### Authentication Pages
- **Sign In** (Default) - Email/password login with Google OAuth option
- **Sign Up** - User registration (Coming Soon)
- **Forgot Password** - Password recovery (Coming Soon)
- **Verify Account** - Email verification (Coming Soon)

## 🔧 Development

### Adding New Components
1. Create component in appropriate directory under `src/components/`
2. Use TypeScript interfaces for props
3. Follow the existing styling patterns
4. Add to exports if needed

### Styling Guidelines
- Use inline styles for component-specific styling
- Follow the established color palette
- Maintain consistent spacing (8px, 12px, 16px, 24px, 40px)
- Use Lato font family throughout

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**noOobaf** - [GitHub Profile](https://github.com/noOobaf)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
