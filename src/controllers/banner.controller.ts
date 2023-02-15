import { Banner, BannerType } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import BannerService from "../services/banner.service";
import { HttpException } from "../exception/HttpException";
import { uploadFile } from "../utils/S3";
import { CreateBannerDto } from "../dto/banner.dto";
import moment from "moment";

class BannerController {
    public bannerService = new BannerService();
    public GMT_VN = 7;
    // GET
    public getAllBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const queryParams = req.query;
            if (!queryParams.pageId || !queryParams.bannerType) throw new HttpException(404, "Must have banner page and banner type")
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

            const existsBanner = await this.bannerService.getBannerById(Number(id));
            if (!existsBanner) throw new HttpException(400, "Not found banner!! Please check again....")

            res.status(200).json({ data: existsBanner, message: 'Get banner successfully' });
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
            if (bannerData.airTimeCreate || bannerData.airTimeEnd) {

            }
            bannerData.airTimeCreate = new Date(moment(bannerData.airTimeCreate).format("YYYY-MM-DD"));
            bannerData.airTimeEnd = new Date(moment(bannerData.airTimeEnd).format("YYYY-MM-DD"));

            if (currentTime > bannerData.airTimeCreate || currentTime > bannerData.airTimeEnd || bannerData.airTimeCreate > bannerData.airTimeEnd)
                throw new HttpException(400, "You can't set the display time before the current time or the end time before the current time")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")
            const checkPositionExistsWithAirCreate = await this.bannerService.checkBannerCamping(bannerData.pageId, bannerData.bannerType, bannerData.bannerPosition, bannerData.airTimeCreate, bannerData.airTimeEnd)
            console.log(checkPositionExistsWithAirCreate)
            if (checkPositionExistsWithAirCreate.length != 0) throw new HttpException(400, "Banner at this location and the display time already exists, please change the position or change the display timeframe!!");

            // Create banner
            const newBanner = await this.bannerService.createBanner(bannerData);

            res.status(200).json({ data: newBanner, message: 'Create banner was successfully' });
        } catch (error) {
            next(error);
        }
    };

    // PUT
    public updateBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get data from client
            const bannerData: Banner = req.body;
            if (!bannerData) throw new HttpException(400, "You must fill data create banner before send to server");

            const { id } = req.params
            const existsBanner = await this.bannerService.getBannerById(Number(id));
            if (!existsBanner) throw new HttpException(400, "Not found banner!! Please check again....");


            const currentTime = moment().add(this.GMT_VN, "hours").toDate();
            console.log(bannerData)
            if (bannerData.airTimeCreate) {
                bannerData.airTimeCreate = new Date(moment(bannerData.airTimeCreate).format("YYYY-MM-DD"))
            }

            if (bannerData.airTimeEnd) {
                bannerData.airTimeEnd = new Date(moment(bannerData.airTimeEnd).format("YYYY-MM-DD"))
            }

            if (currentTime > (bannerData.airTimeCreate ? bannerData.airTimeCreate : existsBanner.airTimeCreate) ||
                currentTime > (bannerData.airTimeEnd ? bannerData.airTimeEnd : existsBanner.airTimeEnd) ||
                (bannerData.airTimeCreate ? bannerData.airTimeCreate : existsBanner.airTimeCreate) > (bannerData.airTimeEnd ? bannerData.airTimeEnd : existsBanner.airTimeEnd))
                throw new HttpException(400, "You can't set the display time before the current time or the end time before the current time or air create time exceed air end time")

            const bannerPage = bannerData.pageId ? bannerData.pageId : existsBanner.pageId;
            const bannerType = bannerData.bannerType ? bannerData.bannerType : existsBanner.bannerType;
            const bannerPosition = bannerData.bannerPosition ? bannerData.bannerPosition : existsBanner.bannerPosition;
            const bannerAirTimeCreate = bannerData.airTimeCreate ? bannerData.airTimeCreate : existsBanner.airTimeCreate;
            const bannerAirTimeEnd = bannerData.airTimeEnd ? bannerData.airTimeEnd : existsBanner.airTimeEnd;

            const checkPositionExistsWithAirCreate = await this.bannerService.checkBannerCamping(bannerPage, bannerType, bannerPosition, bannerAirTimeCreate, bannerAirTimeEnd, Number(id)) as Banner[]
            console.log(checkPositionExistsWithAirCreate)

            if (checkPositionExistsWithAirCreate.length != 0) throw new HttpException(400, "Banner at this location and the display time already exists, please change the position or change the display timeframe!!");
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
            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            // Get id need delete banner from client
            const { id } = req.params;
            const existsBanner = await this.bannerService.getBannerById(Number(id))
            if (!existsBanner) throw new HttpException(400, "Not found banner!! Please check again....")

            // Get key image
            const keyImage = existsBanner.image?.substring(existsBanner.image.lastIndexOf('/') + 1)

            await this.bannerService.deleteBanner(Number(id), keyImage);

            res.status(200).json({ message: 'Delete banner was successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default BannerController