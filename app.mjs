import express from "express";
import cors from "cors";
import connectionPool from "./utils/db.mjs";
import "dotenv/config";
import { validateCreatePostData } from "./middlewares/post.validation.mjs";
import { validateEditPostData } from "./middlewares/put.validation.mjs";
import postRouter from "./routes/posts.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);

app.get("/profiles", (req, res) => {
  return res.json({
    data: {
      name: "john",
      age: 20,
    },
  });
});
app.get("/", (req, res) => {
  return res.send("Hello TechUp!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
