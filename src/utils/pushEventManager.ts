import { Request, Response } from "express"

export const getManager = () => {
    const arrManager = new Map();
    const pushEventManager = (user_id: number, res: Response, req: Request) => {
        if (arrManager.has(user_id)) {
            const listRes = arrManager.get(user_id);
            listRes.push(res);
            arrManager.set(user_id, listRes);
        } else {
            arrManager.set(user_id, [res])
        }
        req.on('close', () => {
            console.log(`Connection closed`);
            const listRes = arrManager.get(user_id)
            const filterRes = listRes.filter((_res: Response) => _res != res)
            arrManager.set(user_id, filterRes)
        })
    }

    const sendEventManager = (user_id: number, data: any) => {
        const listRes = arrManager.get(user_id);
        if (listRes) {
            listRes.forEach((res: Response) => {
                console.log("Send successful")
                res.write(`data: ${data.message}\n\n`);
            })
        }
    }

    return {
        add: pushEventManager,
        send: sendEventManager
    }
}

export default getManager();
