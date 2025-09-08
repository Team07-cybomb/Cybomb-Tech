require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const connectDB = require("./config/db");

 
// Create Express app
const app = express();
 
// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://cybomb.com',
  'https://www.cybomb.com',
   'https://api.cybomb.com', 
  'http://147.93.111.96:5000'
];
 
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
 
    const isAllowed = allowedOrigins.includes(origin) ||
                      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
                      /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin);
 
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
 
 
// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 


// Import routes
const sendMailRoutes = require("./routes/sendMailRoute");
const popupMailRoute = require("./routes/popupMailRoute");
const bannerMailRoute = require("./routes/bannerMail");
const careerMailRoute = require("./routes/careerMailRoute");
const footerMailRoute = require("./routes/footermail")
const adminRoutes = require("./routes/adminRoutes");
const adminRegisterRoute = require("./routes/adminRegister");
const blogRoute = require("./routes/blogRoute");

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});
 
connectDB();

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/send-mail", sendMailRoutes);
app.use("/api/popup-mail", popupMailRoute);
app.use("/api/banner-mail", bannerMailRoute);
app.use("/api/career", careerMailRoute);
app.use("/api/footer-mail",footerMailRoute);
app.use("/admin", adminRegisterRoute);
app.use("/uploads", express.static("public/uploads"));
app.use("/uploads/blog", express.static(path.join(__dirname, "public/uploads/blog")));
app.use("/api/blogs", blogRoute);


 
// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
 
// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Global error handler:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
 
// Get local IP for logs
const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};
 
// Start server on internal port (nginx will proxy to this)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`➡️  Local:   http://localhost:${PORT}`);
  console.log(`➡️  Network: http://${getLocalIp()}:${PORT}`);
});
 