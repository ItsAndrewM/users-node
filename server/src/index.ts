import express from "express";
import userRoutes from "./routes/user";
import postRoutes from "./routes/posts";
import authorRoutes from "./routes/author";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 8080;

app.use(
	cors({
		origin: "http://localhost:5173", // Replace with your frontend origin
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use("/api/authors", authorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
	res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
