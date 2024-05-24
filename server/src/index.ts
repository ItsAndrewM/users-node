import express from "express";
import userRoutes from "./routes/user";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8080;

app.options("*", cors());
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
	res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
