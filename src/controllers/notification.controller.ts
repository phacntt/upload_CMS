import { ActionNotification, Content } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/HttpException";
import ContentService from "../services/content.service";
import { CreateContentDto } from "../dto/content.dto";
import verify from "../utils/jwt";
import defaultPushEventManager from "../utils/pushEventManager"
import NotificationService from "../services/notification.service";
import { CreateNotificationDto } from "../dto/notification.dto";
import { callAPIUserEearning } from "../utils/helper";
import { redisPub } from "../utils/initRedis";


export type DataSend = {
    id?: number,
    title: string,
    message: string,
    image?: string,
    action: string,
    reward?: string

}

class NotificationController {
    public notificationService = new NotificationService();

    public listNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const listNotifications = await this.notificationService.listNotifications();
            res.status(200).json({ data: listNotifications, message: 'Get all notifications' });

        } catch (error) {
            throw new HttpException(400, error as string);
        }
    };

    public notificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.query;
            if (!id) throw new HttpException(400, "id required");

            const notificationById = await this.notificationService.notificationById(Number(id));
            if (!notificationById) throw new HttpException(400, "Not found notification");

            res.status(200).json({ data: notificationById, message: 'Get notification successfully' });
        } catch (error) {
            throw new HttpException(400, error as string);
        }
    };

    public createNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreate: CreateNotificationDto = req.body;

            if (dataCreate.action === ActionNotification.Reward) {
                if (!dataCreate.reward) {
                    res.json({code: 400, message: `Action "Reward" required field reward`});
                    return;
                }
            } else {
                if (dataCreate.reward) {
                    res.json({code: 400, message: `Action "Notice" not required field reward`});
                    return;
                }
            }
            
            const newNotification = await this.notificationService.createNotification(dataCreate);

            const payload: DataSend = {
                title: newNotification.title,
                message: newNotification.message,
                action: newNotification.action,
            };
            newNotification.image ? payload.image = newNotification.image : "";
            newNotification.reward ? payload.reward = newNotification.reward : "";

            const cUrl = { "query": "query {\r\n  getAllIdUser\r\n}", "variables": {} };
            const dataResponse = await callAPIUserEearning(cUrl);
            
            const listIds = dataResponse.data.getAllIdUser as number[];
            
            if (listIds.length != 0) {
                for (let i = 0; i < listIds.length; i++) {
                    payload.id = listIds[i];
                    await redisPub.publish("uploadCMS:user:sendNotification", JSON.stringify(payload));
                }
            }

            res.status(200).json({ message: "Create notification and send all user is successfully" });
        } catch (error: any) {
            throw new HttpException(400, error);
        }
    };
}

export default NotificationController