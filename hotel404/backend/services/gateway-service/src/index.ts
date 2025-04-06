import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors({
  origin: "*", // Adjust this in production
  credentials: true,
}));

// Proxy routes
app.use("/api/auth", createProxyMiddleware({
  target: "http://auth-service:8080", // Docker service name
  changeOrigin: true,
  pathRewrite: { "^/api/auth": "" }
}));

app.use("/api/user", createProxyMiddleware({
  target: "http://user-service:8080",
  changeOrigin: true,
  pathRewrite: { "^/api/user": "" }
}));

app.use("/api/booking", createProxyMiddleware({
  target: "http://booking-service:8080",
  changeOrigin: true,
  pathRewrite: { "^/api/booking": "" }
}));

app.use("/api/hotels", createProxyMiddleware({
  target: "http://hotel-service:8080",
  changeOrigin: true,
  pathRewrite: { "^/api/hotels": "" }
}));

// Start gateway
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running at http://localhost:${PORT}`);
});
