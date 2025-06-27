import { app } from "./app";
import { env } from "./env";

const port = env.PORT || 3333;

app.listen({ 
    host: '0.0.0.0',
    port: port }).then(() => {
  console.log(`🚀 HTTP server running on http://localhost${port} 🌎`);
}).catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
})