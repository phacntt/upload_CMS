import { context } from "../src/types/context.type";

const clients = context

async function main() {
    const createUsers = await clients.prisma.user.createMany({data: [
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
    ], skipDuplicates: true})

    const createPages = await clients.prisma.page.createMany({data: [
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
    ], skipDuplicates: true})
    
    const createCategories = await clients.prisma.category.createMany({data: [
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
    ], skipDuplicates: true})

    const createBanners = await clients.prisma.banner.createMany({ data: [
        {
            airTimeCreate: "2023-02-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "HomeBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
            airTimeCreate: "2023-02-09T00:00:00Z",
            airTimeEnd: "2023-03-10T00:00:00Z",
            bannerPosition: 1,
            bannerType: "MiddleBanner",
            landingPageUrl: "https://google.com/",
            image: "https://dads-cms.s3.ap-southeast-1.amazonaws.com/1675588227923-FeedVideoDesktop.png",
            pageId: 1
        },
        {
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