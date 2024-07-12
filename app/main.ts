import * as net from "net";
import {Commands} from "./commands/commands";
import {Parser} from "./utils/parser";
import {SimpleTypes} from "./enums/firstByteCmdEnum";
import {NullBulkStringError} from "./exceptions/NullBulkStringError";

const port = 6379;

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
                    commands.set(dataDecoded[1], dataDecoded[2]);
                    break;
                case 'get':
                    commands.get(dataDecoded[1]);
                    break;
                default:
                    this.connection.write(Parser.toSimpleRESP('Command not exist', SimpleTypes.SIMPLE_ERROR));
            }
        } catch (err) {
            if (err instanceof NullBulkStringError) {
                connection.write('$-1\r\n');
            } else if (err instanceof Error) {
                connection.write(Parser.toSimpleRESP(err.message, SimpleTypes.SIMPLE_ERROR));
            }
            console.log(err);
        }
        connection.end();
    });
});

server.listen(port, "127.0.0.1");

console.log(`Server connected in port ${port}`);
