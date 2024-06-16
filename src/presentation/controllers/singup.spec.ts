import SignUpController from "./singup";

describe('SingUp Controller', () => {
    test('Should return 400 if noname is provider',() => {
        const  sut = new SignUpController();
        const httpRequest = {
            body:{
                email:'any_email',
                password:'any_password',
                password_confirmation:'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
    })
})