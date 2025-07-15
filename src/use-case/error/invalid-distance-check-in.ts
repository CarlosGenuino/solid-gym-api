export class InvalidDistanceCheckInError extends Error {
    constructor() {
        super('Invalid check-in: max distance reached.');
        this.name = 'InvalidDistanceCheckInError';
    }
}   