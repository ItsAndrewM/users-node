import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
	interface Request {
		user?: string | JwtPayload;
		file?: Express.MulterS3.File;
	}
}

declare namespace Express.MulterS3 {
	export interface File extends Express.Multer.File {
		location: string;
	}
}
