export class RequestError {
    public constructor(
        public readonly code: number,
        public readonly error?: any
    ) {
    }
}
