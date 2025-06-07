# Celebal Technologies Signup Form

A modern, responsive signup form built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI Design**: Clean and professional interface with Celebal Technologies branding
- **Form Validation**: Real-time validation for all form fields
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 📋 Form Fields

- First Name & Last Name
- Email Address
- Password (with strength requirements)
- Confirm Password
- Phone Number
- Terms and Conditions Agreement

## 🛠️ Technologies Used

- **React** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
celebal-signup-form/
├── public/
├── src/
│   ├── components/
│   │   └── SignupForm.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── signup_form_component.ts
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your computer:
- [Download Node.js](https://nodejs.org/) (version 16 or higher)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   git clone <your-repo-url>
   cd celebal-signup-form
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - The app will open at `http://localhost:5173`
   - You should see the Celebal Technologies signup form

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Changing Colors
Edit the `tailwind.config.js` file to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Adding New Fields
1. Update the `FormData` interface in `signup_form_component.ts`
2. Add validation logic in the `validateForm` function
3. Add the new field to the form in `SignupForm.tsx`

## 🔧 Form Validation Rules

- **Name**: Minimum 2 characters, letters only
- **Email**: Valid email format required
- **Password**: Minimum 8 characters with uppercase, lowercase, and number
- **Phone**: Valid phone number format
- **Terms**: Must be accepted to proceed

## 📤 Deploying to GitHub

1. **Create a new repository on GitHub**

2. **Initialize git in your project** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/celebal-signup-form.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy with GitHub Pages** (optional):
   - Go to repository Settings > Pages
   - Select source: GitHub Actions
   - The site will be available at: `https://yourusername.github.io/celebal-signup-form`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**:
   - Try running on a different port: `npm run dev -- --port 3000`

2. **Dependencies not installing**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Build errors**:
   - Check that all imports are correct
   - Ensure TypeScript types are properly defined

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Look for similar issues in the GitHub repository
3. Create a new issue with detailed description

---

**Happy Coding!** 🎉