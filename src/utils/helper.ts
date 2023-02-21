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


