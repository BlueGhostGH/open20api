import WebSocket from "ws"

const wss = new WebSocket.Server({ port: 8080 })

import * as handlers from "./handlers"

export interface Context {
    type: keyof typeof handlers
    data: object
}

wss.on("connection", ws => {
    ws.on("message", message => {
        try {
            const parsed: Context = JSON.parse(message.toString())

            ws.send(handlers[parsed.type](ws, parsed.data))
        } catch {
            console.info("Oops! Something went wrong")
        }
    })

    ws.send("Hello world!")
})
