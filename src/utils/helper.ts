import fetch from "node-fetch";
import { BodySendToOpenAI } from "../controllers/aiLeyBotDocument.controller";
import { interactOpenAI } from "./interactOpenAI";
import { HttpException } from "../exception/HttpException";

export const getDifference = (array1: any[], array2: any[]) => {
    return array1.filter(
        object1 => !array2.some(
            object2 => object1 === object2
        ),
    );
}

export const callOpenAIHelper = async (maxTokenByTime: number, promptCustom: string) => {

    const dataSendToOpenAI: BodySendToOpenAI = {
        max_tokens: maxTokenByTime,
        model: `text-davinci-003`,
        prompt: promptCustom
    }

    const textResponse = await interactOpenAI(dataSendToOpenAI);
    console.log("TEXT: ", textResponse)
    return textResponse as string
}

export const convertScriptOpenAi = (payload: any, textResponse: string) => {
    const documnetHavekeyWord = `You also easily earn money via referrals of various products to your friends or your community on DCash. Additionally, you will receive cashback per order if you buy these products via DCash. By joining DCash Affiliate Program, your earning will be increased quickly based on the active activities of your referral-ers`

    const documnetNoHavekeyWord = `Participate in affiliate marketing: This is earning commission on sales by promoting products. To join an affiliate easily, you can share products on DCash with your friends or your community, the commission will be paid on successful orders. Additionally, you will receive cashback per order if you buy these products via DCash. By joining DCash Affiliate Program, your earning will be increased quickly based on the active activities of your referral-ers.`

    const listArrayKeyWordOtherVietNam = [
        {
            key: `Freelance`,
            link: `https://www.freelancer.com/`
        },
        {
            key: `Upwork`,
            link: `https://www.upwork.com/`
        },
        {
            key: `Fiverr`,
            link: `http://www.fiverr.com/s2/c82bd6a12d`
        },
        {
            key: `Lazada`,
            link: `https://shorten.asia/EYNx5dx2`
        },
        {
            key: `Shopee`,
            link: `https://shorten.asia/M4zs6z7j`
        },
        {
            key: `Skillshare`,
            link: `https://skillshare.eqcm.net/c/3860957/1265193/4650`
        },
        {
            key: `Tiki`,
            link: `https://shorten.asia/75fT3Gkg`
        },
        {
            key: `Tiktok`,
            link: `https://seller.tiktok.com/`

        },
        {
            key: `Shopify`,
            link: `https://open.spotify.com/artist/4HI6sWozpcPUjdkn2nbAQx`
        }
    ]

    const listArrayKeywordVN = [
        {
            key: `Freelancer`,
            link: `https://www.vn.freelancer.com/`
        },
        {
            key: `Upwork`,
            link: `https://www.upwork.com/`
        },
        {
            key: `VLance`,
            link: `https://www.vlance.vn/`
        },
        {
            key: `Fiverr`,
            link: `https://fiverrvietnam.com/`
        },
        {
            key: `Lazada`,
            link: `https://shorten.asia/EYNx5dx2`
        },
        {
            key: `Shopee`,
            link: `https://shorten.asia/M4zs6z7j`
        },
        {
            key: `Skillshare`,
            link: `https://skillshare.eqcm.net/c/3860957/1265193/4650`
        },
        {
            key: `Tiki`,
            link: `https://shorten.asia/75fT3Gkg`
        },
    ]

    const keyWord = ['affiliate', 'affiliates', 'e-commerce']
    const keyWordNeedReplace = ["Amazon", "Ebay", "Shopify", "WooCommerce"]

    const keyWordReplace = [
        {
            key: `Lazada`,
            link: `https://sellercenter.lazada.vn/apps/register/index`
        },
        {
            key: `Shopee`,
            link: `https://banhang.shopee.vn/`
        },
        {
            key: `Tiki`,
            link: `https://sellercenter.tiki.vn/`
        },
        {
            key: `Tiktok`,
            link: `https://seller.tiktok.com/`
        },
        {
            key: `Shopify`,
            link: `https://open.spotify.com/artist/4HI6sWozpcPUjdkn2nbAQx`
        },
    ]
    const addLinkTag = (link: string, keyWord: string) => `<a href="${link}">${keyWord}</a>`;

    const x = keyWordReplace.map(key => addLinkTag(key.link, key.key)).join(", ")
    let newRecord = ''
    let arrayText = textResponse.split(`\n`)
    let count = 0;
    let z = 0;
    if (payload.location == "Vietnam" || payload.location == "Việt Nam") {
        for (let i = 0; i < arrayText.length; i++) {
            if (payload.topic || payload.promptQuestion || payload.topicLv2) {
                for (let j = 0; j < listArrayKeywordVN.length; j++) {
                    if (arrayText[i].toLowerCase().includes(listArrayKeywordVN[j].key.toLowerCase())) {
                        arrayText[i] = arrayText[i].toLowerCase().replace(listArrayKeywordVN[j].key.toLowerCase(), addLinkTag(listArrayKeywordVN[j].link, listArrayKeywordVN[j].key.concat("VN")))
                    }
                }
            }
            if (payload.act) {
                for (let key = 0; key < keyWord.length; key++) {
                    if (arrayText[i].toLowerCase().includes(keyWord[key])) {
                        if (count < 1) {
                            arrayText[i] += " " + documnetHavekeyWord
                            count++
                        }
                    }
                }
            }

            for (let n = 0; n < keyWordNeedReplace.length; n++) {
                if (arrayText[i].toLowerCase().includes(keyWordNeedReplace[n].toLowerCase())) {
                    if (z < 1) {
                        arrayText[i] = arrayText[i].substring(0, arrayText[i].toLowerCase().indexOf(keyWordNeedReplace[n].toLowerCase())) + arrayText[i].toLowerCase().replace(keyWordNeedReplace[n].toLowerCase(), x);
                        z++;
                    } else {
                        arrayText[i].toLowerCase().replace(keyWordNeedReplace[n].toLowerCase() + " ", "")
                    }
                }
            }
            arrayText[i] = arrayText[i].toString().replace(/([:\?.\?]\s+)(.)/g, (match: any, separator: any, char: any) => {
                return separator + char.toUpperCase();
            })
            if (i != arrayText.length - 1) {
                arrayText[i] += `\n`
            }
        }
    } else {
        for (let i = 0; i < arrayText.length; i++) {
            for (let j = 0; j < listArrayKeyWordOtherVietNam.length; j++) {
                if (arrayText[i].toLowerCase().includes(listArrayKeyWordOtherVietNam[j].key.toLowerCase())) {
                    arrayText[i] = arrayText[i].toLowerCase().replace(listArrayKeyWordOtherVietNam[j].key.toLowerCase(), addLinkTag(listArrayKeyWordOtherVietNam[j].link, listArrayKeyWordOtherVietNam[j].key))
                }
            }
            for (let key = 0; key < keyWord.length; key++) {
                if (arrayText[i].toLowerCase().includes(keyWord[key])) {
                    if (count < 1) {
                        arrayText[i] += " " + documnetHavekeyWord
                        count++
                    }
                }
            }
            arrayText[i] = arrayText[i].toString().replace(/([:\?.\?]\s+)(.)/g, (match: any, separator: any, char: any) => {
                return separator + char.toUpperCase();
            })
            if (i != arrayText.length - 1) {
                arrayText[i] += `\n`
            }
        }
    }


    if (count == 0 && payload.act) {
        newRecord = arrayText.join("").concat(`\n\n`, `More: ${documnetNoHavekeyWord}`)
    } else {
        newRecord = arrayText.join("")
    }
    return newRecord
}

export const promptAddByTopicLv2 = (topicLv2: any) => {
    let promptAddTopicLv2 = {}

    switch (topicLv2.toString().toLowerCase()) {
        case "affiliate marketing":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Affiliate Marketing. Suggest for me supporting tools such as Afifliate network, Marketing tools, Research tools, Content , banner and videos creation tools, management tools, analystics tools?"
            }
            break;
        case "freelancing":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Freelancing. Suggest for me supporting tools such as portfolio ideas and creation tools, Marketing tools, Research tools, Management tools?"
            }
            break;
        case "affiliate marketing":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Affiliate Marketing. Suggest for me supporting tools such as Afifliate network, Marketing tools, Research tools, Content , banner and videos creation tools, management tools, analystics tools?"
            }
            break;
        case "sell products online":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Sell products online. Suggest for me supporting tools such as Afifliate network, Marketing tools, Research tools, Content , banner and videos creation tools, management tools, analystics tools, e-commerce platform, sourcing tools?"
            }
            break;
        case "games":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Games. Suggest for me supporting tools such as Games network, Research tools, management tools, upgrade gaming skills tools, streaming creation tools, content creation tools?"
            }
            break;
        case "start a business":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Start a business. Suggest for me supporting tools such as Research tools, management tools, marketing & sale tools, outsourcing tools, content creation tools, production tools, tracking performance tools, operation tools, financial tools"
            }
            break;
        case "negotiate salary":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Negotiate salary. Suggest for me supporting tools such as upgrade skill tools, salary comparison tools"
            }
            break;
        case "career advancement":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Career Advancement. Suggest for me supporting tools such as upgrade skill tools, career tools"
            }
            break;
        case "improve education and skills":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of Improve Education and Skills. Suggest for me supporting tools such as upgrade skill tools, education tools"
            }
            break;
        case "financial control":
            promptAddTopicLv2 = {
                title: "Prompt Add",
                prompt: "I want you design a journey that help me increase my extra income in terms of  Financial control. Suggest for me supporting tools"
            }
            break;
        default:
            break;
    }

    return promptAddTopicLv2

}

export const callAPIUserEearning = async (cUrl: any) => {
    try {
        const payload = JSON.stringify(cUrl)
        
        const apiUser = process.env.NODE_ENV === "development" ? "http://localhost:3003/gql/v1" : process.env.API_USER_EARNING as string

        const fetchAPI = await fetch(apiUser, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
        });

        
        const data = await fetchAPI.json()

        return data;
    } catch (error: any) {
        throw new HttpException(400, error)
    }
}


