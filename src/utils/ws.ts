import { CLOSED, WebSocket, WebSocketServer } from "ws"

export const initalizeWebSocket = () => {
    const wss = new WebSocketServer({port: 9000})
    wss.on('connection', (ws) => {
        console.log('A new client connected')
        ws.send("Welcome Client")

        ws.on("message", (message) => {
            console.log("Recevied: ", message);
            ws.send("I got message: " + message)
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState == WebSocket.OPEN) {
                    client.send(message)
                }
            })
        })

        ws.on('close', function close() {
            console.log('disconnected');
        });

    })

}