import { Request, Response, NextFunction } from "express";
import AffiliateAccessTradeService from "../services/affiliateAccessTrade.service";
import { context } from "../types/context.type";
import { API_KEY_SHOPEE_APP_ID } from "../config";
import { google } from 'googleapis'

class AffiliateAccessTradeController {
    public affiliateAccessTradeService = new AffiliateAccessTradeService();

    public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productsData = await this.affiliateAccessTradeService.getProducts();

            res.status(200).json({ data: productsData, message: 'Get all products' });
        } catch (error) {
            next(error);
        }
    };

    public getShops = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const param = req.query
            const productsData = await this.affiliateAccessTradeService.getShops();

            res.status(200).json({ data: productsData, message: 'Get all shops' });
        } catch (error) {
            next(error);
        }
    };

    public createShop = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body = req.body
            const productsData = await context.prisma.shop.create({ data: body });

            res.status(200).json({ data: productsData, message: 'Get all shops' });
        } catch (error) {
            next(error);
        }
    };

    public redirectProductURL = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { originUrl, utmContent } = req.query;
            if (!originUrl) {
                res.status(400).json({ code: 400, message: "originUrl required" })
            }
            if (!utmContent) {
                res.status(400).json({ code: 400, message: "utmContent required" })
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
            res.redirect((utmContent && originUrl) ? `https://shope.ee/an_redir?origin_link=${originUrl}&affiliate_id=${API_KEY_SHOPEE_APP_ID}&sub_id=${utmContent}` : originUrl as string)
        } catch (error) {
            next(error);
        }
    };

    public convertLinkShortShopee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { originUrl, subIds } = req.body;

            if (!originUrl) {
                res.status(400).json({ code: 400, message: "originUrl required" });
            }

            if (!subIds) {
                res.status(400).json({ code: 400, message: "subIds required" });
            }

            const shortLink = await this.affiliateAccessTradeService.convertLinkShortShopee(originUrl, subIds);
            if (!shortLink) {
                res.status(400).json({ code: 400, message: "Server shopee something went wrong" })
            }

            res.status(200).json({ data: shortLink, message: 'Convert short link successfully' });

        } catch (error) {
            next(error);
        }
    };

    // public addEmailContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { email } = req.body;
            
    //         const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //         console.log("OK");
            
    //         if (!emailRegexp.test(email)) {
    //             res.status(400).json({ message: 'Email invalidate', status: 400 });
    //         } else {
    //             const auth = new google.auth.GoogleAuth({
    //                 keyFile: "keys.json", //the key file
    //                 //url to spreadsheets API
    //                 scopes: "https://www.googleapis.com/auth/spreadsheets",
    //             });
    
    //             const authClientObject = await auth.getClient();
    
    //             const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    
    //             const spreadsheetId = "1lY3ot4nbQ9yrXxhJfe0kGbAAQCOIf_dDZ7j3JDxrgIA";
    
    //             await googleSheetsInstance.spreadsheets.values.append({
    //                 auth, //auth object
    //                 spreadsheetId, //spreadsheet id
    //                 range: "A:A", //sheet name and range of cells
    //                 valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
    //                 requestBody: {
    //                     values: [
    //                         [email]
    //                     ]
    //                 }
    //             });
    
    //             res.status(200).json({ message: 'Add email contact successfully' });
    //         }
            
    //     } catch (error) {
    //         next(error);
    //     }
    // };

}

export default AffiliateAccessTradeController