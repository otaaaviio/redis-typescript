export type Config = {
    port: number;
    host: string;
    masterPort: number;
    masterHost: string;
    isReplication: boolean
}

export const DefaultConfig: Config = {
    port: 6379,
    host: "127.0.0.1",
    masterPort: 6379,
    masterHost: '',
    isReplication: false
}