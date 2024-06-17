import { MissingParamError } from "../erros/missing-params-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export default class SignUpController {
    handle(httpRequest: HttpRequest) : HttpResponse {
        const requeredFild = ['name', 'email']
        for (const fild of requeredFild) {
            if(!httpRequest.body[fild])
                return  badRequest(new MissingParamError(fild))
        }
    }

}