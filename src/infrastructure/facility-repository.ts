import { IFacilityRepository } from "../core/interfaces/ifacility-repository";
import { RepositoryBase } from "../../../sharedkernel/src";
import { Facility } from "../core/model/facility";

export class FacilityRepository extends RepositoryBase <Facility> implements IFacilityRepository {

    get(id: string): Promise<Facility> {
        return this.connection.manager.findOne(Facility, id, {relations: ["partners"]});
    }

    getAll(): Promise<Array<Facility>> {
        return this.connection.manager.find(Facility, {relations: ["partners"]});
    }
}