export const validateCreatePostData = (req, res, next) => {
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

// ข้อมูลที่จะถูกส่งเข้ามาจาก Client มีดังนี้:
// title: ชื่อของบทความ
// image: URL ของภาพประกอบบทความ
// category_id: หมวดหมู่ของบทความ
// description: คำอธิบายของบทความ
// content: เนื้อหาของบทความ
// status_id: สถานะของบทความ

// Validation Rules
// 1 title ต้องถูกส่งเข้ามา และต้องมี Type เป็น String done
// 2 image ต้องถูกส่งเข้ามา และต้องมี Type เป็น String done
// 3 category_id ต้องถูกส่งเข้ามา และต้องมี Type เป็น Number done
// 4 description ต้องถูกส่งเข้ามา และต้องมี Type เป็น String done
// 5 content ต้องถูกส่งเข้ามา และต้องมี Type เป็น String done
// 6 status_id ต้องถูกส่งเข้ามา และต้องมี Type เป็น Number done

// ถ้าขาด title: "Title is required"
// ถ้าประเภทข้อมูลไม่ตรงกับที่กำหนด: "Title must be a string" เป็นต้น
