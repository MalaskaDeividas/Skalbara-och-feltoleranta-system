import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = 8080;

// Enable CORS
app.use(cors({
  origin: "http://9.223.136.86",
  credentials: true,
}));

// Proxy routes

app.use("/api/user", createProxyMiddleware({
  target: "http://user-service:8079",
  changeOrigin: true,
  pathRewrite: { "^/api/user": "" }
}));

app.use("/api/booking", createProxyMiddleware({
  target: "http://booking-service:8078", // booking, auth and hotel
  changeOrigin: true,
  pathRewrite: { "^/api/booking": "" }
}));

// Start gateway
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running at http://localhost:${PORT}`);
});
