import * as net from "net";
import {Commands} from "./commands/commands";
import {Parser} from "./utils/parser";

const port = 6379;

const server: net.Server = net.createServer((connection: net.Socket) => {
    const commands = new Commands(connection);

    connection.on("data", (data: Buffer) => {
        const dataStr = data.toString();
        console.log("Received:", JSON.stringify(dataStr));
        const dataDecoded = Parser.decode(dataStr);
        const command = dataDecoded[0];

        switch (command) {
            case 'ping':
                commands.ping();
                break;
            case 'echo':
                commands.echo(dataDecoded[1]);
                break;
            default:
                throw Error('Invalid command');
        }
        connection.end();
    });
});

server.listen(port, "127.0.0.1");

console.log(`Server connected in port ${port}`);
