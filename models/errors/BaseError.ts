export class BaseError extends Error {
    constructor (public name: any, public statusCode: any, description: any) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}