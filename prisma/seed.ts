import { context } from "../src/types/context.type";

const clients = context

async function main() {
    const createUsers = await clients.prisma.user.createMany({data: [
        {
            id: 1,
            email: "Admin@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Admin",
            name: "BotAdmin"
        },
        {
            id: 2,
            email: "Guest@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Guest",
            name: "BotGuest"
        },
        {
            id: 3,
            email: "Dev@gmail.com",
            password: "$2b$10$ejVnZ125sBbtJhvXSKMgKuZdkGP10f1RQGR6EYtAWXyDUKJSehA3C",
            role: "Dev",
            name: "Pha"
        },
    ], skipDuplicates: true})

    const createPages = await clients.prisma.page.createMany({data: [
        {
            id: 1,
            name: 'Home'
        },
        {
            id: 2,
            name: 'Pop up'
        },
        {
            id: 3,
            name: 'Shop to earn'
        },
        {
            id: 4,
            name: 'Learn to earn'
        },
        {
            id: 5,
            name: 'Mission to earn'
        },
        {
            id: 6,
            name: 'Read to earn'
        },
        {
            id: 7,
            name: 'Play to earn'
        },
        {
            id: 8,
            name: 'Install to earn'
        },
    ], skipDuplicates: true})
    
    const createCategories = await clients.prisma.category.createMany({data: [
        // Shop to earn
        {
            id: 1,
            name: 'Fashion',
            nameVN: 'Thời trang',
            pageId: 3
        },
        {
            id: 2,
            name: 'Home & Living',
            nameVN: 'Nhà cửa đời sống',
            pageId: 3
        },
        {
            id: 3,
            name: 'Health & Beauty',
            nameVN: 'Sức khỏe - Làm đẹp',
            pageId: 3
        },
        {
            id: 4,
            name: 'Education',
            nameVN: 'Ngoại ngữ',
            pageId: 3
        },
        {
            id: 5,
            name: 'Travel & Entertaiment',
            nameVN: 'Tour du lịch',
            pageId: 3
        },
        {
            id: 6,
            name: 'Voucher & Service',
            nameVN: 'Vourcher & Dịch vụ',
            pageId: 3
        },
        {
            id: 7,
            name: 'Groceries, Mom & Babies',
            nameVN: 'Bách hóa, Mẹ và bé',
            pageId: 3
        },
        // Mission to earn
        {
            id: 8,
            name: 'NFT',
            nameVN: '',
            pageId: 5
        },
        {
            id: 9,
            name: 'DeFi',
            nameVN: '',
            pageId: 5
        },
        {
            id: 10,
            name: 'GameFi',
            nameVN: '',
            pageId: 5
        },
        {
            id: 11,
            name: 'SocialFi',
            nameVN: '',
            pageId: 5
        },
        {
            id: 12,
            name: 'Web3',
            nameVN: '',
            pageId: 5
        },
        //  Play to earn
        {
            id: 13,
            name: 'First Person Shooters',
            nameVN: '',
            pageId: 7
        },
        {
            id: 14,
            name: 'Casino Game',
            nameVN: '',
            pageId: 7
        },
        {
            id: 15,
            name: 'Massive Multiplayer Online Games',
            nameVN: '',
            pageId: 7
        },
        {
            id: 16,
            name: 'Sports Game',
            nameVN: '',
            pageId: 7
        },
        {
            id: 17,
            name: 'Arcade Games',
            nameVN: '',
            pageId: 7
        },
    ], skipDuplicates: true})

    const createBanners = await clients.prisma.banner.createMany({ data: [
        {
            id: 1,
            airTimeCreate: "2023-02-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "HomeBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
            id: 2,
            airTimeCreate: "2023-02-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "MiddleBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
            id: 3,
            airTimeCreate: "2023-02-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "TopPick",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
    ], skipDuplicates: true})

    const createContents = await clients.prisma.content.createMany({data: [
        {
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
            pageId: 1,
            categoryId: 1,
            commissionModel: 'CPS',
            commissionType: "Cash",
            commissionValue: "15000",
            description: "Description content 3",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            location: 'vn',
            title: "Content 3",
            url: "https://google.com/"
        },
    ], skipDuplicates: true})

    
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