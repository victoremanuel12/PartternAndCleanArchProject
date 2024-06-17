import { HttpResponse } from '../protocols/http';
// () apos a => ({}) o type entende que é um return
export const badRequest = (error : Error) :  HttpResponse => ({ 
    statusCode:400, 
    body: error
})