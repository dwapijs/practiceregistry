import { RepositoryBase } from "../../../sharedkernel/src";
import { Partner } from "../core/model/partner";
import { IPartnerRepository } from "../core/interfaces/ipartner-repository";

export class PartnerRepository extends RepositoryBase <Partner> implements IPartnerRepository {
}