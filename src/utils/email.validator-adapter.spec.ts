import { EmailValidatorAdapter } from "./email-validator"
import validator = require("validator");
jest.mock('validator', () => ({
    isEmail() : boolean {
        return true
    }
}))
describe("EmailValidator Adpter", () => {
    test("Should return false if validator returns false", () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid("invalid_email@gmail.com")
        expect(isValid).toBe(false) 
    })
    test("Should return true if validator returns true", () => {
        const emailValidator = new EmailValidatorAdapter()
        const isValid = emailValidator.isValid("valid_email@gmail.com")
        expect(isValid).toBe(true)
    })
    test("Should call  validator with correct email", () => {
        const sut = new EmailValidatorAdapter();
        const isEmailSpy = jest.spyOn(validator, 'isEmail');
        sut.isValid("valid_email@gmail.com")
        expect(isEmailSpy).toHaveBeenCalledWith("valid_email@gmail.com")
    })
})