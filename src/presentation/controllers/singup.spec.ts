import { InvalidParamError } from "../erros/invalid-param-error";
import { MissingParamError } from "../erros/missing-param-error";
import { EmailValidator } from "../protocols/email-validator";
import SignUpController from "./singup";
interface SutTypes {
    sut : SignUpController
    emailValidatorStub : EmailValidator
}
const makeSut = () : SutTypes =>{
     class EmailValidatorMock implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    const emailValidatorStub  = new EmailValidatorMock();
    const sut = new SignUpController(emailValidatorStub);
    return {
        sut,
        emailValidatorStub,
    };
}
describe('SingUp Controller', () => {
    test('Should return 400 if no name is provider',() => {
        const  {sut} = makeSut();
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
        const  {sut} = makeSut();
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
        const  {sut} =  makeSut();
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
    test('Should return 400 if no invalid email is provider',() => {
        const  {sut} =  makeSut();
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
    test('Should return 400 if an invalid email is provider',() => {
        const  {sut, emailValidatorStub} =  makeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpRequest = {
            body:{
                name:'any_name',
                email:'invalid_email',
                password:'any_password',
                password_confirmation:'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })
})