import { Router } from "express";
import { validateCreatePostData } from "../middlewares/post.validation.mjs";
import { validateEditPostData } from "../middlewares/put.validation.mjs";
import connectionPool from "../utils/db.mjs";
const postRouter = Router();
postRouter.post("/", [validateCreatePostData], async (req, res) => {
  const newPost = req.body;
  try {
    const query = `insert into posts (title, image, category_id, description, content, status_id)
      values ($1, $2, $3, $4, $5, $6)`;
    const values = [
      newPost.title,
      newPost.image,
      newPost.category_id,
      newPost.description,
      newPost.content,
      newPost.status_id,
    ];
    await connectionPool.query(query, values);
  } catch (error) {
    console.error("Error inserting post:", error.message);
    return res.status(500).json({
      message: `Server could not create post because database connection`,
    });
  }
  return res.status(201).json({ message: "Created post successfully" });
});

postRouter.get("/:postId", async (req, res) => {
  const postIdFromClient = req.params.postId;
  try {
    const results = await connectionPool.query(
      `select * from posts where id=$1`,
      [postIdFromClient]
    );
    if (!results.rows[0]) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }
    return res.status(201).json({ data: results.rows[0] });
  } catch (error) {
    console.error("Error inserting post:", error.message);
    return res.status(500).json({
      message: `Server could not find a requested post`,
    });
  }
});

postRouter.put("/:postId", [validateEditPostData], async (req, res) => {
  const postIdFromClient = req.params.postId;
  const updatedPost = { ...req.body };
  console.log("Updating post with ID:", postIdFromClient);
  console.log("Updated post data:", updatedPost);
  try {
    const result = await connectionPool.query(
      `update posts 
        set title = $2,
        image = $3,
        category_id = $4,
        description = $5,
        content = $6,
        status_id = $7
        where id = $1
        `,
      [
        postIdFromClient,
        updatedPost.title,
        updatedPost.image,
        updatedPost.category_id,
        updatedPost.description,
        updatedPost.content,
        updatedPost.status_id,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Server could not find a requested post to update",
      });
    }

    return res.status(200).json({
      message: "Updated post successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Server could not update post because database connection",
    });
  }
});

postRouter.delete("/:postId", async (req, res) => {
  const postIdFromClient = req.params.postId;
  try {
    await connectionPool.query(`delete from posts where id = $1`, [
      postIdFromClient,
    ]);
  } catch {
    return res.status(500).json({
      message: { message: "Server could not find a requested post to delete" },
    });
  }
  return res.status(200).json({
    message: "Deleted post sucessfully",
  });
});

postRouter.get("/", async (req, res) => {
  const { page = 1, limit = 6 } = req.query; // Default values: page 1, limit 6

  const offset = (page - 1) * limit; // Calculate the offset for pagination

  try {
    // Query to count total posts
    const totalResult = await connectionPool.query(
      "SELECT COUNT(*) FROM posts"
    );
    const totalPosts = parseInt(totalResult.rows[0].count, 10);

    // Query to get paginated posts
    const postsResult = await connectionPool.query(
      `SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2`,
      [parseInt(limit), offset]
    );

    const posts = postsResult.rows;

    // Calculate pagination details
    const totalPages = Math.ceil(totalPosts / limit);
    const currentPage = parseInt(page, 10);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    // Send the paginated response
    return res.status(200).json({
      totalPosts,
      totalPages,
      currentPage,
      limit: parseInt(limit, 10),
      posts,
      nextPage,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching posts" });
  }
});

export default postRouter;
