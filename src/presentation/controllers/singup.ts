import { MissingParamError } from "../erros/missing-params-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export default class SignUpController {
    handle(httpRequest: HttpRequest) : HttpResponse {
        if(!httpRequest.body.name)
            return badRequest(new MissingParamError('name'))
        if(!httpRequest.body.email)
            return  badRequest(new MissingParamError('email'))
    }
}