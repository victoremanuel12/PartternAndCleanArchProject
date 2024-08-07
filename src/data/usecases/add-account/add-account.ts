import { AccountModel, AddAccountModel, Encrypter, IAddAccount } from "../db-add-account-protocols";
export class DbAddAccount implements IAddAccount {
    private readonly encrypter: Encrypter;
    constructor(encrypter: Encrypter) {
        this.encrypter = encrypter;
    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encrypter.encrypt(account.password)
        return new Promise(resolve => resolve(null))
    }

}