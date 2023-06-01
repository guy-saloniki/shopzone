import path from 'path';
import express from 'express';
import multer, { diskStorage } from 'multer';
const router = express.Router();

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeype = fileTypes.test(file.mimeype);

  if (extname && mimeype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image uploaded!',
    image: `/${req.file.path}`,
  });
});

export default router;
