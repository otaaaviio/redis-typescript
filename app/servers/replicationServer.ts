import net from "net";
import {Parser} from "../utils/parser";
import {Config} from "../types/config";

export class ReplicationServer {
    private readonly config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public init() {
        const masterConnection = net.createConnection({
                host: this.config.masterHost,
                port: this.config.masterPort
            },
            () => {
            console.log(`Connected in master on ${this.config.masterHost}:${this.config.masterPort}`);
        });

        masterConnection.on("error", (err) => {
            console.error("Error connecting in master:", err);
        });

        masterConnection.write(Parser.toArrayRESP(['PING']));
    }
}