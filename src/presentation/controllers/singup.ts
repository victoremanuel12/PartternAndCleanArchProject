import { MissingParamError, InvalidParamError } from "../erros"
import { badRequest, serverError } from "../helpers/http-helper"
import { HttpRequest, HttpResponse, Controller, EmailValidator } from "../protocols"

export default class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }
    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requeredFild = ['name', 'email', 'password', 'password_confirmation']
            for (const fild of requeredFild) {
                if (!httpRequest.body[fild])
                    return badRequest(new MissingParamError(fild))
            }
            const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
            if (!isValidEmail) return badRequest(new InvalidParamError('email'))
            if (httpRequest.body.password !== httpRequest.body.password_confirmation) {
                return badRequest(new InvalidParamError('password_confirmation'))
            }

        } catch (error) {
            return serverError()
        }

    }
}