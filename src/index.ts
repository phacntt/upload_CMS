import 'reflect-metadata';
import App from "./app";
import UserRoute from "./routes/user.route";
import AuthRoute from './routes/auth.route';
import CategoryRoute from './routes/category.route';
import ProductRoute from './routes/product.route';
import AffiliateAccessTradeRoute from './routes/affiliateAccessTrade.route';
import BannerRoute from './routes/banner.route';
import ShopRoute from './routes/shop.route';

const app = new App([
    new UserRoute(),
    new AuthRoute(),
    new CategoryRoute(),
    new ProductRoute(),
    new AffiliateAccessTradeRoute(),
    new BannerRoute(),
    new ShopRoute()
]);

app.listen();