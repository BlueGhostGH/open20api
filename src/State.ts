import WebSocket from "ws"

export type Code = number
export type ID = number
export interface Meme {
    id: ID
    title: string
    username: string
    url: string
}
export interface User {
    id: ID
    username: string
}
export interface Classroom {
    name: string
    host: Pick<User, "id">
    guests: User[]
    memes: Meme[]
    locked: boolean
}

export type State = {
    codes: Record<Code, Classroom>
} & {
    lastId: ID
    freeCodes: Code[]
    sockets: Map<ID, WebSocket>
}

const freeCodes = Array(1000000)
    .fill(undefined)
    .map((_, i) => i)
const socketsMap = new Map<ID, WebSocket>()

export const state: State = {
    codes: {},
    lastId: 0,
    freeCodes,
    sockets: socketsMap
}
