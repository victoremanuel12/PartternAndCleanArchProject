import { AccountModel } from "../../../domain/models/account";
import { AddAccountModel, IAddAccount } from "../../../domain/useCases/IAdd-account";
import { Encrypter } from "../../protocols/encrypter";
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