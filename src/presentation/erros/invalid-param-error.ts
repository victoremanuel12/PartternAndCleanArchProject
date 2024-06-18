export class InvalidParamError extends Error {
    constructor(ParamName: string){
        super(`Missing param: ${ParamName}`)
        this.name = 'MissingParamError'
    }
}