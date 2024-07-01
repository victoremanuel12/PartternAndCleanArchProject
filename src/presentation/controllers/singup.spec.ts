import { AccountModel } from "../../domain/models/account";
import { AddAccount, AddAccountModel } from '../../domain/useCases/add-account';
import { MissingParamError, ServerError, InvalidParamError } from "../erros";
import { EmailValidator } from "../protocols";
import SignUpController from "./singup";
interface SutTypes {
    sut: SignUpController
    emailValidatorStub: EmailValidator
    addAccountStub: AddAccount
}
const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const addAccountStub = makeAddAccount();
    const sut = new SignUpController(emailValidatorStub, addAccountStub);
    return {
        sut,
        emailValidatorStub,
        addAccountStub
    };
}
const makeEmailValidator = (): EmailValidator => {
    class EmailVlalidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }

    }
    return new EmailVlalidatorStub();
}
const makeEmailValidatorWithError = (): EmailValidator => {
    class EmailVlalidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            throw new Error()
        }

    }
    return new EmailVlalidatorStub();
}
const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        add(account: AddAccountModel) : AccountModel {
            const fakeAccount = { 
                id:'valid_id',
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                password_confirmation: 'any_password_confirmation'
            }
            return fakeAccount
        }
    }
    return new AddAccountStub();
}


describe('SingUp Controller', () => {
    test('Should return 400 if no name is provider', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password',
                password_confirmation: 'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })
    test('Should return 400 if no email is provider', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                password_confirmation: 'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })
    test('Should return 400 if no password is provider', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password_confirmation: 'any_password_confirmation'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })
    test('Should return 400 if no invalid email is provider', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password'
            }
        }
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password_confirmation'))
    })
    test('Should return 400 if password confirmation fails', () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                password_confirmation: 'invalid_password',
            },
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('password_confirmation'));
    });
    test('Should call email  validator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@gmail.com',
                password: 'any_password',
                password_confirmation: 'any_password_confirmation'
            }
        }
        sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })
    test('Should return 500 if EmailValidator throws', () => {
        // const emailValidatorStub = makeEmailValidatorWithError();
        // const sut = new SignUpController(emailValidatorStub);
        // temos um metodo factory para criar uma classe e lançar um error
        // porem com jest podemos usar o metodo fabrica anterior e usar o mockImplementationOnce e mudar o retornod o metodo inicial
        // seria assim: 
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub,'isValid').mockImplementationOnce(() =>{ 
            throw new Error()
        })
        const httpRequest = {
            body: {
                name: "any_name",
                email: "any_email",
                password: "any_password",
                password_confirmation: "any_password_confirmation",
            },
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError())
    })
    test('Should call addAccount with correct values', () => {
        const { sut, addAccountStub } = makeSut();
        const addSpy = jest.spyOn(addAccountStub, 'add');
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                password_confirmation: 'any_password'
            }
        };
        sut.handle(httpRequest);
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
        });
    });
})