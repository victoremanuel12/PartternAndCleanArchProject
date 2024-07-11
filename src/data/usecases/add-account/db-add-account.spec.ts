import { Encrypter } from './../../protocols/encrypter';
import { DbAddAccount } from "./add-account";
interface SutTypes {
    sut: DbAddAccount,
    encryptStub: Encrypter;
}
const makeEncrypter = () => {
    class EncrypterStub {
        async encrypt(password: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'));
        }
    }
    return new EncrypterStub();
}
const makeSut = (): SutTypes => {

    const encryptStub = makeEncrypter();
    const sut = new DbAddAccount(encryptStub)
    return { sut, encryptStub };
}
describe("DbAddAccount useCase", () => {

    test("Should call encrypter with correct password", async () => {
        const { sut, encryptStub } = makeSut();
        const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
        const accountData = { name: "valid name", email: "valid_email@example.com", password: "valid_password" }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith("valid_password")
    })
    test("Should throw if Encrypter throws", async () => {
        const { sut, encryptStub } = makeSut();
        jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const accountData = { name: "valid name", email: "valid_email@example.com", password: "valid_password" }
        const promise =  sut.add(accountData)
        expect(promise).rejects.toThrow()
    })
});