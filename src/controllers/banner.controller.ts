import { Banner } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import BannerService from "../services/banner.service";
import { HttpException } from "../exception/HttpException";
import { uploadFile } from "../utils/uploadS3";

class BannerController {
    public bannerService = new BannerService();

    // GET
    public getAllBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const banners = await this.bannerService.getAllBanners();

            res.status(201).json({ data: banners, message: 'Get all banners successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getBannerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get id banner to show
            const { id } = req.query;
            if (!id) throw new HttpException(400, "Not found banner!! Please check again....")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            const bannerById = await this.bannerService.getBannerById(Number(id));

            res.status(200).json({ data: bannerById, message: 'Get banner successfully' });
        } catch (error) {
            next(error);
        }
    };

    // POST
    public createBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {            
            // Get data from client
            const bannerData: Banner = req.body;
            if (!bannerData) throw new HttpException(400, "You must fill data create banner before send to server")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            // Create banner
            const newBanner = await this.bannerService.createBanner(bannerData);

            res.status(200).json({ data: newBanner, message: 'Create banner was successfully' });
        } catch (error) {
            next(error);
        }
    };

    public createFileInS3 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    // PUT
    public updateBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get data from client
            const bannerData: Banner = req.body;
            if (!bannerData) throw new HttpException(400, "You must fill data create banner before send to server")  

            const { id } = req.query
            if (!id) throw new HttpException(400, "Not found banner!! Please check again....")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            const bannerUpdate = await this.bannerService.updateBanner(bannerData, Number(id));

            res.status(200).json({ data: bannerUpdate, message: 'Update banner was successfully' });
        } catch (error) {
            next(error);
        }
    };

    // DELETE
    public deleteBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get id need delete banner from client
            const { id } = req.query;
            if (!id) throw new HttpException(400, "Not found banner!! Please check again....")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")
            
            await this.bannerService.deleteBanner(Number(id));

            res.status(200).json({ message: 'Delete banner was successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default BannerController