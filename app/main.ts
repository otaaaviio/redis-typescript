import * as net from "net";
import {Commands} from "./commands/commands";
import {Parser} from "./utils/parser";
import {SimpleTypes} from "./enums/firstByteCmdEnum";
import {NullBulkStringError} from "./exceptions/NullBulkStringError";
import { argv } from "node:process";
import {InfoServer} from "./types/infoServer";
import {getRandomReplId, getServerConfig} from "./utils/utils";
import {ReplicationServer} from "./servers/replicationServer";

let config = getServerConfig(argv);

const infoServer: InfoServer = {
    role: !config.isReplication ? 'master' : 'slave',
    master_replid: getRandomReplId(),
    master_repl_offset: 0,
}

const server: net.Server = net.createServer((connection: net.Socket) => {
    const commands = new Commands(connection);

    connection.on("data", (data: Buffer) => {
        const dataStr = data.toString();
        console.log("Received:", JSON.stringify(dataStr));
        const dataDecoded = Parser.decode(dataStr);
        const command = dataDecoded[0];

        try {
            switch (command) {
                case 'ping':
                    commands.ping();
                    break;
                case 'echo':
                    commands.echo(dataDecoded[1]);
                    break;
                case 'set':
                    if(dataDecoded[3]?.toLowerCase() === 'px')
                        commands.set(dataDecoded[1], dataDecoded[2], parseInt(dataDecoded[4]));
                    else
                        commands.set(dataDecoded[1], dataDecoded[2]);
                    break;
                case 'get':
                    commands.get(dataDecoded[1]);
                    break;
                case 'info':
                    commands.info(dataDecoded[1], infoServer);
                    break;
                case 'replconf':
                    commands.replconf(dataDecoded[1], ...dataDecoded.slice(2));
                    break;
                case 'psync':
                    commands.psync(dataDecoded[1], dataDecoded[2], infoServer);
                    break;
                default:
                    connection.write(Parser.toSimpleRESP('Command not exist', SimpleTypes.SIMPLE_ERROR));
            }
        } catch (err) {
            if (err instanceof NullBulkStringError) {
                connection.write('$-1\r\n');
            } else if (err instanceof Error) {
                connection.write(Parser.toSimpleRESP(err.message, SimpleTypes.SIMPLE_ERROR));
            }
            console.log(err);
        }
    });
});

if (config.isReplication) {
    const repServer = new ReplicationServer(config);
    repServer.init();
}

server.listen(config.port, config.host);

console.log(`Server listening on port: ${config.port}`);
