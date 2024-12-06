import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../services/s3.js';

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now()}_${file.originalname}`);
        },
    }),
});

export default upload;
