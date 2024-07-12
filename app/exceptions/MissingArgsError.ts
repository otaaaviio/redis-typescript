export class MissingArgsError extends Error {
    constructor(args: string[]) {
        super(`Missing arguments: ${args.join(', ')}`);
    }
}