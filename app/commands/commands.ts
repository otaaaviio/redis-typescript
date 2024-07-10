import {Parser} from "../utils/parser";
import {LengthSpecifiedTypes, SimpleTypes} from "../enums/firstByteCmdEnum";

export class Commands {
    private readonly connection;

    constructor(connection: Socket) {
        this.connection = connection;
    }

    public echo(arg: string) {
        const res = typeof arg === 'undefined'
            ? Parser.toSimpleRESP('Missing args to echo request', SimpleTypes.SIMPLE_ERROR)
            : Parser.toLengthRESP(arg, LengthSpecifiedTypes.BULK_STRING);

        this.connection.write(res);
    }

    public ping() {
        this.connection.write(
            Parser.toSimpleRESP('PONG', SimpleTypes.SIMPLE_STRING)
        );
    }
}