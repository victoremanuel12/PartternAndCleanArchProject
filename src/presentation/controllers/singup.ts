import { Controller } from './../protocols/controller';
import { MissingParamError } from "../erros/missing-params-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export default class SignUpController implements Controller {
    handle(httpRequest: HttpRequest) : HttpResponse {
        const requeredFild = ['name', 'email', 'password','password_confirmation']
        for (const fild of requeredFild) {
            if(!httpRequest.body[fild])
                return  badRequest(new MissingParamError(fild))
        }
    }

}