import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Fala aí galera" });
})

app.listen(3333, () => {
  console.log("🚀 Server is running!");
  console.log("💻 Access: http://localhost:3333")
});