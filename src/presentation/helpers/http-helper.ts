import { ServerError } from '../erros';
import { HttpResponse } from '../protocols/http';
// () apos a => ({}) o type entende que é um return
export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})
export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})
export const ok = (data : any): HttpResponse => ({
    statusCode: 200,
    body: data
})