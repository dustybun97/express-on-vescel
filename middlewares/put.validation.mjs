export const validateEditPostData = (req, res, next) => {
  if (!req.body.title || typeof req.body.title !== "string") {
    return res.status(400).json({ message: "Title must be a string" });
  }

  if (!req.body.image || typeof req.body.image !== "string") {
    return res.status(400).json({ message: "Image url must be a string" });
  }

  if (!req.body.category_id || typeof req.body.category_id !== "number") {
    return res.status(400).json({ message: "Category_id must be a number" });
  }

  if (!req.body.description || typeof req.body.description !== "string") {
    return res.status(400).json({ message: "Description must be a string" });
  }

  if (!req.body.content || typeof req.body.content !== "string") {
    return res.status(400).json({ message: "Content must be a string" });
  }

  if (!req.body.status_id || typeof req.body.status_id !== "number") {
    return res.status(400).json({ message: "Status_id must be a number" });
  }
};
