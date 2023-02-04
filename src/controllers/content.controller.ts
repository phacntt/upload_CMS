import { Content } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/HttpException";
import ContentService from "../services/content.service";
import { CreateContentDto } from "../dto/content.dto";

class ContentController {
    public contentService = new ContentService();

    public getContents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const queryParams = req.query; 
            const contentsData: Content[] = await this.contentService.getContents(queryParams);

            res.status(200).json({ data: contentsData, message: 'Get all contents' });
        } catch (error) {
            next(error);
        }
    };

    public getContentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            if (!id) throw new HttpException(400, "Not found content!! Please check again....")

            const contentById: Content = await this.contentService.getContentById(Number(id)) as Content;

            res.status(200).json({ data: contentById, message: `Get content ${contentById.title} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public createContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreateContent: CreateContentDto = req.body

            const existsContent = await this.contentService.getContentByTitle(dataCreateContent.title)
            if (existsContent) throw new HttpException(400, "Title content already existed please change title!!!")

            const newContent = await this.contentService.createContent(dataCreateContent)
            
            res.status(200).json({ data: newContent, message: 'Create content successfully' });
        } catch (error) {
            next(error);
        }
    };

    // PUT
    public updateContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get data from client
            const contentData: Content = req.body;
            if (!contentData) throw new HttpException(400, "You must fill data create content before send to server")  

            const { id } = req.params
            if (!id) throw new HttpException(400, "Not found content!! Please check again....")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            const contentUpdate = await this.contentService.updateContent(contentData, Number(id));

            res.status(200).json({ data: contentUpdate, message: 'Update content was successfully' });
        } catch (error) {
            next(error);
        }
    };

    // DELETE
    public deleteContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Get id need delete content from client
            const { id } = req.params;
            if (!id) throw new HttpException(400, "Not found content!! Please check again....")

            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")
            
            await this.contentService.deleteContent(Number(id));

            res.status(200).json({ message: 'Delete content was successfully' });
        } catch (error) {
            next(error);
        }
    };



}

export default ContentController