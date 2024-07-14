import {Config, DefaultConfig} from "../types/config";
import {argv} from "node:process";

export function getRandomReplId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomReplId = '';
    for (let i = 0; i < 40; i++) {
        randomReplId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomReplId;
}

export function getServerConfig(args: string[]): Config {
    let config = DefaultConfig;

    if(argv[3] && !isNaN(parseInt(argv[3])))
        config.port = parseInt(argv[3]);

    const replicaIndex = argv.indexOf('--replicaof');
    config.isReplication = replicaIndex !== -1;
    if (config.isReplication) {
        const connectionStr = argv[replicaIndex + 1].split(' ');
        config.masterHost = connectionStr[0];
        config.masterPort = parseInt(connectionStr[1]);
    }

    return config;
}