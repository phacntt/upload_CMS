import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/HttpException";
import pageService from "../services/page.service";
import PageService from "../services/page.service";
import { Page } from "@prisma/client";
import { CreatePageDto } from "../dto/page.dto";

class PageController {
    public pageService = new PageService();

    public getPages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // const queryParams = req.query; 
            const pagesData: Page[] = await this.pageService.getPages();

            res.status(200).json({ data: pagesData, message: 'Get all pages' });
        } catch (error) {
            next(error);
        }
    };

    public getPageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params
            if (!id) throw new HttpException(400, "Not found page!! Please check again....")

            const pageById: Page = await this.pageService.getPageById(Number(id)) as Page;

            res.status(200).json({ data: pageById, message: `Get page ${pageById.name} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public createPage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dataCreatepage: CreatePageDto = req.body
            // const existsPageName = await this.pageService.getPageByName(dataCreatepage.name)
            // const existspage = await this.pageService.getpageByTitle(dataCreatepage.title)
            // if (existspage) throw new HttpException(400, "Title page already existed please change title!!!")

            const newpage = await this.pageService.createPage(dataCreatepage)
            
            res.status(200).json({ data: newpage, message: 'Create page successfully' });
        } catch (error) {
            next(error);
        }
    };

    // PUT
    public updatePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")

            // Get data from client
            const pageData: Page = req.body;
            if (!pageData) throw new HttpException(400, "You must fill data create page before send to server")  

            const { id } = req.params
            const existspage = await this.pageService.getPageById(Number(id))
            if (!existspage) throw new HttpException(400, "Not found page!! Please check again....")

            const pageUpdate = await this.pageService.updatePage(pageData, Number(id));

            res.status(200).json({ data: pageUpdate, message: 'Update page was successfully' });
        } catch (error) {
            next(error);
        }
    };

    // DELETE
    public deletePage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // Check role
            const auth = req.user
            if (auth.role !== 'Admin') throw new HttpException(400, "You're not permission to do it!!!")
            
            // Get id need delete page from client
            const { id } = req.params;
            const existspage = await this.pageService.getPageById(Number(id))
            if (!existspage) throw new HttpException(400, "Not found page!! Please check again....")

            res.status(200).json({ message: 'Delete page was successfully' });
        } catch (error) {
            next(error);
        }
    };



}

export default PageController