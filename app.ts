import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
