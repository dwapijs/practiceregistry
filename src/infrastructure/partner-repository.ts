import { RepositoryBase } from "../../../sharedkernel/src";
import { Partner } from "../core/model/partner";
import { IPartnerRepository } from "../core/interfaces/ipartner-repository";
import { InjectConnection } from "typeorm-typedi-extensions";
import { Connection } from "typeorm";
import { Service } from "typedi";

@Service()
export class PartnerRepository extends RepositoryBase <Partner> implements IPartnerRepository {
    constructor(@InjectConnection() connection: Connection) {
        super(Partner, connection);
    }

}