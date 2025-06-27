import { app } from "./app";

app.listen({ 
    host: '0.0.0.0',
    port: 3333 }).then(() => {
  console.log("🚀 HTTP server running on http://localhost:3333 🌎");
}).catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
})