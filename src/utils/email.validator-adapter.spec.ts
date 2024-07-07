import { EmailValidatorAdapter } from "./email-validator"

describe("EmailValidator Adpter", () => {
    test("Should return false if validator returns false", () => {
        const emailValidator = new EmailValidatorAdapter()
        const isValid = emailValidator.isValid("invalid_email@gmail.com")
        expect(isValid).toBe(false)
    })

})