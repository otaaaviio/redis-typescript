import {LengthSpecifiedTypes, SimpleTypes} from "../enums/firstByteCmdEnum";

export class Parser {
    public static encode(commands: string[]): string {
        let encoded = `*${commands.length}\r\n`;

        commands.forEach(command => {
            encoded += `$${Buffer.byteLength(command, 'utf8')}\r\n${command}\r\n`;
        });

        return encoded;
    }

    public static decode(respStr: string): string[] {
        const decodedCommands = [];
        const respParts = respStr.trim().split('\r\n');
        const match = respStr.match(/\*([0-9]+)/);
        const commandsCount = match ? parseInt(match[1], 10) : null;

        for(let i = 1; i <= commandsCount; i++) {
            const command = respParts[i * 2];
            if (command) {
                decodedCommands.push(command.toLowerCase());
            }
        }

        return decodedCommands;
    }

    public static toSimpleRESP(arg: string, firstByte: SimpleTypes): string {
        return `${firstByte}${arg}\r\n`;
    }

    public static toLengthRESP(arg: string, firstByte: LengthSpecifiedTypes): string {
        return `${firstByte}${arg.length}\r\n${arg}\r\n`;
    }
}