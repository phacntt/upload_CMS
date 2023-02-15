import { BannerType, CommissionModelType, CommissionType, Location, Role } from "@prisma/client";
import { context } from "../src/types/context.type";

const clients = context

async function main() {
    const findUser = async (email: string) => {
        return await clients.prisma.user.findFirst({ where: { email } })
    }

    const findPage = async (name: string) => {
        return await clients.prisma.page.findFirst({ where: { name } })
    }

    const findCategory = async (name: string) => {
        return await clients.prisma.category.findFirst({ where: { name } })
    }

    const findBanner = async (bannerPosition: number) => {
        return await clients.prisma.banner.findFirst({ where: { bannerPosition } })
    }

    const findContent = async (name: string) => {
        return await clients.prisma.content.findFirst({ where: { title: name } })
    }

    const arrayUser = [
        {
            email: "Admin@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Admin",
            name: "BotAdmin"
        },
        {
            email: "Guest@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Guest",
            name: "BotGuest"
        },
        {
            email: "Dev@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Dev",
            name: "Pha"
        },
    ]

    const arrayPage = [
        {
            name: 'Home'
        },
        {
            name: 'Pop up'
        },
        {
            name: 'Shop to earn'
        },
        {
            name: 'Learn to earn'
        },
        {
            name: 'Mission to earn'
        },
        {
            name: 'Read to earn'
        },
        {
            name: 'Play to earn'
        },
        {
            name: 'Install to earn'
        },
    ]

    const arrayCategory = [
        // Shop to earn
        {
            name: 'Fashion',
            nameVN: 'Thời trang',
            pageId: 3
        },
        {
            name: 'Home & Living',
            nameVN: 'Nhà cửa đời sống',
            pageId: 3
        },
        {
            name: 'Health & Beauty',
            nameVN: 'Sức khỏe - Làm đẹp',
            pageId: 3
        },
        {
            name: 'Education',
            nameVN: 'Ngoại ngữ',
            pageId: 3
        },
        {
            name: 'Travel & Entertaiment',
            nameVN: 'Tour du lịch',
            pageId: 3
        },
        {
            name: 'Voucher & Service',
            nameVN: 'Vourcher & Dịch vụ',
            pageId: 3
        },
        {
            name: 'Groceries, Mom & Babies',
            nameVN: 'Bách hóa, Mẹ và bé',
            pageId: 3
        },
        // Mission to earn
        {
            name: 'NFT',
            nameVN: '',
            pageId: 5
        },
        {
            name: 'DeFi',
            nameVN: '',
            pageId: 5
        },
        {
            name: 'GameFi',
            nameVN: '',
            pageId: 5
        },
        {
            name: 'SocialFi',
            nameVN: '',
            pageId: 5
        },
        {
            name: 'Web3',
            nameVN: '',
            pageId: 5
        },
        //  Play to earn
        {
            name: 'First Person Shooters',
            nameVN: '',
            pageId: 7
        },
        {
            name: 'Casino Game',
            nameVN: '',
            pageId: 7
        },
        {
            name: 'Massive Multiplayer Online Games',
            nameVN: '',
            pageId: 7
        },
        {
            name: 'Sports Game',
            nameVN: '',
            pageId: 7
        },
        {
            name: 'Arcade Games',
            nameVN: '',
            pageId: 7
        },
    ]

    const arrayBanner = [
        {
            airTimeCreate: "2023-03-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "HomeBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
            airTimeCreate: "2023-03-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 2,
            bannerType: "MiddleBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
            airTimeCreate: "2023-03-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 3,
            bannerType: "TopPick",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
    ]

    const arrayContent = [
        {
            pageId: 1,
            categoryId: 1,
            commissionModel: 'CPI',
            commissionType: "Percent",
            commissionValue: "10",
            description: "Description content 1",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            location: 'vn',
            title: "Content 1",
            url: "https://google.com/"
        },
        {
            pageId: 1,
            categoryId: 1,
            commissionModel: 'CPL',
            commissionType: "Cash",
            commissionValue: "100",
            description: "Description content 2",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            location: 'vn',
            title: "Content 2",
            url: "https://google.com/"
        },
        {
            pageId: 1,
            categoryId: 3,
            commissionModel: 'CPL',
            commissionType: "Percent",
            commissionValue: "20",
            description: "Description content 3",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            location: 'vn',
            title: "Content 3",
            url: "https://google.com/"
        },
        {
            pageId: 1,
            categoryId: 1,
            commissionModel: 'CPS',
            commissionType: "Cash",
            commissionValue: "15000",
            description: "Description content 3",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            location: 'vn',
            title: "Content 4",
            url: "https://google.com/"
        },
    ]

    for (let user of arrayUser) {
        const findUserByEmail = await findUser(user.email);
        if (!findUserByEmail) {
            await clients.prisma.user.create({
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    role: user.role as Role
                }
            })
        }
    }

    for (let page of arrayPage) {
        const findPageByName = await findPage(page.name);
        if (!findPageByName) {
            await clients.prisma.page.create({ data: page })
        }
    }

    for (let category of arrayCategory) {
        const findCategoryByName = await findCategory(category.name);
        if (!findCategoryByName) {
            await clients.prisma.category.create({ data: category })
        }
    }

    for (let banner of arrayBanner) {
        const findBannerByPosition = await findBanner(banner.bannerPosition);
        if (!findBannerByPosition) {
            await clients.prisma.banner.create({
                data: {
                    airTimeCreate: banner.airTimeCreate,
                    airTimeEnd: banner.airTimeEnd,
                    bannerPosition: banner.bannerPosition,
                    bannerType: banner.bannerType as BannerType,
                    image: banner.image,
                    landingPageUrl: banner.landingPageUrl,
                    pageId: banner.pageId
                }
            })
        }
    }

    for (let content of arrayContent) {
        const findContentByTitle = await findContent(content.title);
        if (!findContentByTitle) {
            await clients.prisma.content.create({data: {
                commissionModel: content.commissionModel as CommissionModelType,
                commissionType: content.commissionType as CommissionType,
                commissionValue: content.commissionValue,
                description: content.description,
                image: content.description,
                location: content.location as Location,
                title: content.title,
                url: content.url,
                categoryId: content.categoryId,
                pageId: content.pageId
            }})
        }
    }


}
main()
    .then(async () => {
        await clients.prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await clients.prisma.$disconnect()
        process.exit(1)
    })