export default class SignUpController {
    handle(httpRequest: any) : any {
        if(!httpRequest.headers.body.name)
            return {
                statusCode:400, 
                body: new Error('Missing param : name')
                }
        if(!httpRequest.headers.body.email)
        return {
            statusCode:400, 
            body: new Error('Missing param : email')
            }

    }
}