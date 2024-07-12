import {Parser} from "../utils/parser";
import {LengthSpecifiedTypes, SimpleTypes} from "../enums/firstByteCmdEnum";
import {MissingArgsError} from "../exceptions/MissingArgsError";
import {NullBulkStringError} from "../exceptions/NullBulkStringError";

const memStorage = new Map<string, string>();

export class Commands {
    private readonly connection;

    constructor(connection: Socket) {
        this.connection = connection;
    }

    public echo(arg: string) {
        if (typeof arg === 'undefined')
            throw new MissingArgsError(['value']);

        this.connection.write(Parser.toLengthRESP(arg, LengthSpecifiedTypes.BULK_STRING))
    }

    public ping() {
        this.connection.write(
            Parser.toSimpleRESP('PONG', SimpleTypes.SIMPLE_STRING)
        );
    }

    public set(key: string, value: string, expiryTime?: number) {
        let res = Parser.toSimpleRESP('OK', SimpleTypes.SIMPLE_STRING);

        if (!key || !value) {
            let missingArgs = [];
            if (!key) missingArgs.push('key');
            if (!value) missingArgs.push('value');
            throw new MissingArgsError(missingArgs)
        }

        if(expiryTime)
            setTimeout(() => {
                memStorage.delete(key);
            }, expiryTime)

        memStorage.set(key, value);
        this.connection.write(res);
    }

    public get(key: string) {
        const value = memStorage.get(key);

        if (!value)
            throw new NullBulkStringError();

        this.connection.write(Parser.toLengthRESP(value, LengthSpecifiedTypes.BULK_STRING));
    }
}