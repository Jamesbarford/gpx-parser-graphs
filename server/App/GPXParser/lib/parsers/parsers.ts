import { isValid, parseISO } from "date-fns";

export function parseAsNumberOrThrow(maybeNumber: any): number {
    const parsed = +maybeNumber;
    if (isNaN(maybeNumber) || !isFinite(maybeNumber)) {
        throw new Error(`Value: ${maybeNumber} is not a number`);
    }

    return parsed;
}

export function parseAsDateOrThrow(maybeDate: any): Date {
    const parsed = parseISO(maybeDate);
    if (!isValid(parsed)) {
        throw new Error(`Value: ${maybeDate} is not a date`);
    }

    return parsed;
}
