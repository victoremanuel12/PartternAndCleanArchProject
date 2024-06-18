import { MissingParamError } from "../erros/missing-params-error";
import SignUpController from "./singup";
const makeSut = () : SignUpController =>{
    return new SignUpController();
}
describe('SingUp Controller', () => {
    test('Should return 400 if no name is provider',() => {
        const  sut = makeSut();
        const httpRequest = {
            body:{
                email:'any_email',
                password:'any_password',
                password_confirmation:'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    test('Should return 400 if no email is provider',() => {
        const  sut = makeSut();
        const httpRequest = {
            body:{
                name:'any_name',
                password:'any_password',
                password_confirmation:'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if no password is provider',() => {
        const  sut =  makeSut();
        const httpRequest = {
            body:{
                name:'any_name',
                email:'any_email',
                password_confirmation:'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should return 400 if no password_confirmation is provider',() => {
        const  sut =  makeSut();
        const httpRequest = {
            body:{
                name:'any_name',
                email:'any_email',
                password:'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password_confirmation'))
    })
})