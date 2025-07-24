## 📌 Overview

EasySplit is a modern web application designed to revolutionize how groups manage and split expenses. Built with React and Vite, it offers an intuitive interface for managing shared expenses, group budgets, and financial tracking. Whether you're planning a trip, sharing household expenses, or managing group events, EasySplit makes it effortless to keep track of who owes what.

## ✨ Features

### 👥 Group Management
- Create and manage multiple expense groups
- Add members easily with email invitations
- Set group-specific expense categories and budgets
- Track group-wise balances and settlements

### 💰 Expense Tracking
- Add expenses with detailed categorization
- Upload receipt images for reference
- Split expenses equally or custom ratios
- Track pending settlements and balances

### ⚡ Quick Actions
- Add expenses on the go
- Settle balances with one click
- Quick expense templates
- Instant notifications for new expenses

### 📊 Smart Dashboard
- Real-time balance overview
- Expense analytics and insights
- Monthly spending trends
- Category-wise expense breakdown

### 🎨 User Experience
- Intuitive and clean interface
- Dark/Light theme support
- Fully responsive design
- Offline support

## 🛠️ Tech Stack

### Frontend
- **React** - A JavaScript library for building user interfaces
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - A utility-first CSS framework
- **React Router** - For seamless navigation
- **React Icons** - Beautiful icon components

### State Management & Storage
- **React Context** - For global state management
- **LocalStorage** - For persistent data storage
- **Custom Hooks** - For reusable stateful logic

### Development Tools
- **ESLint** - For code quality
- **Prettier** - For code formatting
- **Git** - For version control
- **npm** - Package management

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Qaswar-01/EasySplit.git
   ```

2. Navigate to the client directory
   ```bash
   cd EasySplit/client
   ```

3. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/     # Layout components
│   │   └── ui/         # UI components
│   ├── features/       # Feature-specific components
│   │   ├── auth/       # Authentication
│   │   ├── dashboard/  # Dashboard
│   │   ├── expenses/   # Expense management
│   │   └── groups/     # Group management
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   └── utils/          # Utility functions
├── public/             # Static assets
└── ...config files     # Configuration files
```

## 💡 Key Features in Development

- [ ] Receipt scanning with OCR
- [ ] Export expenses to PDF/Excel
- [ ] Integration with payment gateways
- [ ] Push notifications
- [ ] Multi-currency support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/Qaswar-01/EasySplit](https://github.com/Qaswar-01/EasySplit)
