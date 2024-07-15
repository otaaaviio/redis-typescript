import net from "net";
import {Parser} from "../utils/parser";
import {Config} from "../types/config";

export class ReplicationServer {
    private readonly config: Config;
    private masterSocket: net.Socket;

    constructor(config: Config) {
        this.config = config;
    }

    public init() {
        this.masterSocket = net.createConnection({
                host: this.config.masterHost,
                port: this.config.masterPort
            },
            () => {
                this.masterSocket.write(Parser.encode(['PING']));

                console.log(`Connected to the master at ${this.config.masterHost}:${this.config.masterPort}`);
            });

        this.masterSocket.on("data", (data: Buffer) => {
            console.log(`Response received from master: ${data.toString()}`)
            if (data.toString() === '+PONG\r\n') {
                this.masterSocket.write(Parser.encode(['REPLCONF', 'listening-port', String(this.config.masterPort)]));
                this.masterSocket.write(Parser.encode(['REPLCONF', 'capa', 'psync2']));
            }
        });

        this.masterSocket.on("error", (err) => {
            console.error("Error connecting in master:", err);
        });
    }
}