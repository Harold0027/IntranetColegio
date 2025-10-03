// middleware/error.middleware.js
export function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: err.message,
  });
}
