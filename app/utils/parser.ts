import {LengthSpecifiedTypes, OtherTypes, SimpleTypes} from "../enums/firstByteCmdEnum";

export class Parser {
    public static encode(commands: string[]): string {
        let encoded = `*${commands.length}\r\n`;

        commands.forEach(command => {
            encoded += `$${Buffer.byteLength(command, 'utf8')}\r\n${command}\r\n`;
        });

        return encoded;
    }

    public static decode(respStr: string): string[] {
        const decodedValues = [];
        const respParts = respStr.trim().split('\r\n');
        const match = respStr.match(/\*([0-9]+)/);
        const valuesCount = match ? parseInt(match[1], 10) : null;

        for(let i = 1; i <= valuesCount; i++) {
            const value = respParts[i * 2];
            if (value) {
                let valueFormatted = value;
                if(i === 1)
                    valueFormatted = value.toLowerCase();
                decodedValues.push(valueFormatted);
            }
        }

        return decodedValues;
    }

    public static toSimpleRESP(arg: string, firstByte: SimpleTypes): string {
        return `${firstByte}${arg}\r\n`;
    }

    public static toLengthRESP(arg: string, firstByte: LengthSpecifiedTypes): string {
        return `${firstByte}${Buffer.byteLength(arg, 'utf8')}\r\n${arg}\r\n`;
    }

    public static toArrayRESP(messages: string[]) {
        let respArray = `*${messages.length}\r\n`;
        messages.forEach(msg => {
            respArray += `$${Buffer.byteLength(msg, 'utf8')}\r\n${msg}\r\n`;
        });
        return respArray;
    }
}