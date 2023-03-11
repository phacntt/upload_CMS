import 'reflect-metadata';
import App from "./app";
import UserRoute from "./routes/user.route";
import AuthRoute from './routes/auth.route';
import CategoryRoute from './routes/category.route';
import ProductRoute from './routes/product.route';
import AffiliateAccessTradeRoute from './routes/affiliateAccessTrade.route';
import BannerRoute from './routes/banner.route';
import ShopRoute from './routes/shop.route';
import ContentRoute from './routes/content.route';
import PageRoute from './routes/page.route';
import AiLeyBotDocument from './routes/aiLeyBotDocument.route';
import TransactionShopeeRoute from './routes/transactionShopee.route';
import Constant from './routes/constant.route';
import ConstantRoute from './routes/constant.route';
import NotificationRoute from './routes/notification.route';

const app = new App([
    new UserRoute(),
    new AuthRoute(),
    new CategoryRoute(),
    new ProductRoute(),
    new AffiliateAccessTradeRoute(),
    new BannerRoute(),
    new ShopRoute(),
    new ContentRoute(),
    new PageRoute(),
    new AiLeyBotDocument(),
    new TransactionShopeeRoute(),
    new ConstantRoute(),
    new NotificationRoute()
]);

app.listen();