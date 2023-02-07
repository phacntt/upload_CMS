import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/HttpException";
import { uploadFile } from "./S3";

export const createFileInS3 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {            
        // Check role
        const auth = req.user
        if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

        // Get file image
        const fileData = req.files
        if (!fileData) throw new HttpException(400, "You must add at least one image!!!")

        // Upload to S3 aws
        const objectURL = await uploadFile(fileData)
        if (!objectURL) throw new HttpException(400, "Upload failed!")

        res.status(200).json({ data: objectURL.Location, message: 'Upload image to S3 was successfully' });
    } catch (error) {
        next(error);
    }
}