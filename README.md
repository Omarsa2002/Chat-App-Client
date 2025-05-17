# Chat-App-Client

This is the frontend for a real-time chat application built using **React** and **Vite**. It provides users with a clean and responsive interface to chat with others instantly.

## 🔧 Tech Stack

- React
- Vite
- JavaScript
- CSS

## 📦 Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```

Open `http://localhost:5173` in your browser to view the app.

## 🔗 API Integration

This client connects to a Node.js backend server. Make sure the backend is running and the API base URL is correctly set in the project.

## ⚙️ Build for Production

```bash
npm run build
```

Then serve the app using any static file server (e.g., `vite preview` or `serve`).

## 📁 Project Structure

```
├── public/         # Static assets
├── src/
│   ├── App.jsx     # Main application file
│   ├── App.css     # Styles
│   └── ...         # Other components
├── package.json
├── vite.config.js
└── index.html
```

## 📄 License

This project is licensed under the MIT License.