import express from "express";
import bcrypt from "bcrypt";
import userRoutes from "./routes/user";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
	res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
