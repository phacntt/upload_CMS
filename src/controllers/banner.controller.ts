import { Banner, BannerType } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import BannerService, { BannerDataCreate } from "../services/banner.service";
import { HttpException } from "../exception/HttpException";
import { uploadFile } from "../utils/uploadS3";
import { CreateBannerDto } from "../dto/banner.dto";
import moment from "moment";

class BannerController {
    public bannerService = new BannerService();
    public GMT_VN = 7;
    // GET
    public getAllBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const queryParams = req.query;
            if (!queryParams.bannerPage || !queryParams.bannerType) throw new HttpException(404, "Must have banner page and banner type")
            const banners = await this.bannerService.getAllBanners(queryParams);

            res.status(201).json({ data: banners, message: 'Get all banners successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getBannerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get id banner to show
            const { id } = req.params;
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
            const bannerData: CreateBannerDto = req.body;
            if (!bannerData) throw new HttpException(400, "You must fill data create banner before send to server")

            // Check position
            if (bannerData.bannerType === "HomeBanner" && (Number(bannerData.bannerPosition) < 1 || Number(bannerData.bannerPosition) > 12)) 
                throw new HttpException(400, "Invalid position at type Home")
            if (bannerData.bannerType == "MiddleBanner" && (Number(bannerData.bannerPosition) < 1 || Number(bannerData.bannerPosition) > 2))
                throw new HttpException(400, "Invalid position at type Middle")
            if (bannerData.bannerType == "TopPick" && (Number(bannerData.bannerPosition) < 1 || Number(bannerData.bannerPosition) > 9))
                throw new HttpException(400, "Invalid position at type Top pick")

            const currentTime = moment().add(this.GMT_VN, "hours").toDate()
            const airCreate = new Date(moment(bannerData.airTimeCreate).format("YYYY-MM-DD"));
            const airEnd = new Date(moment(bannerData.airTimeEnd).format("YYYY-MM-DD"));

            if (currentTime > airCreate || currentTime > airEnd)
                throw new HttpException(400, "You can't set the display time before the current time or the end time before the current time")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")
            const checkPositionExistsWithAirCreate = await this.bannerService.checkBannerCamping(bannerData.bannerPage, bannerData.bannerType, bannerData.bannerPosition, airCreate)
            if (checkPositionExistsWithAirCreate) throw new HttpException(400, "Banner at this location and the display time already exists, please change the position or change the display timeframe!!");

            const dataCreate: BannerDataCreate = {
                image: bannerData.image,
                landingPageUrl: bannerData.landingPageUrl,
                airTimeCreate: airCreate,
                airTimeEnd: airEnd,
                bannerPage: bannerData.bannerPage,
                bannerPosition: bannerData.bannerPosition,
                bannerType: bannerData.bannerType,
            }

            // Create banner
            const newBanner = await this.bannerService.createBanner(dataCreate);

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

            const { id } = req.params
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
            const { id } = req.params;
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