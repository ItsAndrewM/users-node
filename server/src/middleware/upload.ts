import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/awsConfig";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const upload = multer({
	storage: multerS3({
		s3: s3 as unknown as S3Client, // Cast to S3Client to satisfy TypeScript
		bucket: process.env.AWS_BUCKET_NAME as string,
		metadata: (req, file, cb) => {
			cb(null, { fieldName: file.fieldname });
		},
		key: (req, file, cb) => {
			cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
		},
	}),
});

export default upload;
