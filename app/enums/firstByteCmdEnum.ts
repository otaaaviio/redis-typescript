export enum SimpleTypes {
    SIMPLE_STRING = '+',
    SIMPLE_ERROR = '-',
    BOOLEAN = '#',
}

export enum PrefixedTypes {
    INTEGER = ':',
    DOUBLE = ',',
    BIG_NUMBER = '(',
}

export enum LengthSpecifiedTypes {
    BULK_STRING = '$',
    BULK_ERROR = '!',
}

export enum OtherTypes {
    ARRAY = '*',
    NULL = '_',
    VERBATIM_STRING = '=',
    MAP = '%',
    SET = '~',
    PUSHES = '>'
}