import { IAddAccount } from "../../domain/useCases/IAdd-account"
import { MissingParamError, InvalidParamError } from "../erros"
import { badRequest, ok, serverError } from "../helpers/http-helper"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { EmailValidator } from "./singup/singup-protocols"

export default class SignUpController implements IController {
    private readonly emailValidator: EmailValidator
    private readonly addAccount: IAddAccount
    constructor(emailValidator: EmailValidator, addAccount: IAddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requeredFild = ['name', 'email', 'password', 'password_confirmation']
            for (const fild of requeredFild) {
                if (!httpRequest.body[fild])
                    return badRequest(new MissingParamError(fild))
            }
            const { name, email, password, password_confirmation } = httpRequest.body
            const isValidEmail = this.emailValidator.isValid(email)
            if (!isValidEmail) return badRequest(new InvalidParamError('email'))
            if (password !== password_confirmation) {
                return badRequest(new InvalidParamError('password_confirmation'))
            }
            const account = await this.addAccount.add({ name, email, password })
            return ok(account)
        } catch (error) {
            return serverError()
        }
    }
}