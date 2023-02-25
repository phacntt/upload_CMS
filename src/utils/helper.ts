import { BodySendToOpenAI } from "../controllers/aiLeyBotDocument.controller";
import { interactOpenAI } from "./interactOpenAI";

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
    return textResponse
}

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

export const convertScriptOpenAi = (payload: any, textResponse: string) => {
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
    if (topicLv2.toString().toLowerCase() === "affiliate marketing") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of Affiliate Marketing. Suggest for me supporting tools such as Afifliate network, Marketing tools, Research tools, Content , banner and videos creation tools, management tools, analystics tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "freelancing") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of Freelancing. Suggest for me supporting tools such as portfolio ideas and creation tools, Marketing tools, Research tools, Management tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "sell products online") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of Sell products online. Suggest for me supporting tools such as Afifliate network, Marketing tools, Research tools, Content , banner and videos creation tools, management tools, analystics tools, e-commerce platform, sourcing tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "games") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of Games. Suggest for me supporting tools such as Games network, Research tools, management tools, upgrade gaming skills tools, streaming creation tools, content creation tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "start a business") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of Start a business. Suggest for me supporting tools such as Research tools, management tools, marketing & sale tools, outsourcing tools, content creation tools, production tools, tracking performance tools, operation tools, financial tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "negotiate salary") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of  Negotiate salary. Suggest for me supporting tools such as upgrade skill tools, salary comparison tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "career advancement") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of  Career Advancement. Suggest for me supporting tools such as upgrade skill tools, career tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "improve education and skills") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of  Improve Education and Skills. Suggest for me supporting tools such as upgrade skill tools, education tools"
        }
        return promptAddTopicLv2
    } else if (topicLv2.toString().toLowerCase() === "financial control") {
        let promptAddTopicLv2 = {
            title: "Prompt Add",
            prompt: "I want you design a journey that help me increase my extra income in terms of  Financial control. Suggest for me supporting tools"
        }
        return promptAddTopicLv2
    }
}


