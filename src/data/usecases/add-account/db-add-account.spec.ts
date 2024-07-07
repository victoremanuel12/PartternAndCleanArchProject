describe("DbAddAccount useCase",() => { 
    class EncrypterStub {
        async encrypt(password: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'));
        }
    }
    test("Should call encrypter with correct password", async () => {
        const encryptStub = new EncrypterStub();
        const sut = new DbAddAccount(encryptStub)
        const encryptSpy = jest.spyOn(encryptStub,'encrypt')
        const accountData = { name: "valid name", email: "valid_email@example.com", password: "valid_password" }
        sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith("valid_password")
})});