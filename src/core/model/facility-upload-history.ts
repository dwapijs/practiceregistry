import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "../../../../sharedkernel/src";
import { Facility } from "./facility";
import moment from "moment";

@Entity()
export class FacilityUploadHistory extends EntityBase {
    @Column()
    uploadDate: Date;
    @Column()
    totalPatients: number;
    @ManyToOne(type => Facility, f => f.uploads)
    facility: Facility;

    constructor(uploadDate: Date, totalPatients: number, faciltiy: Facility) {
        super();
        this.uploadDate = uploadDate;
        this.totalPatients = totalPatients;
        this.facility = faciltiy;
    }

    toString(): string {
        return `${moment(this.uploadDate).format("DD MMM YYYY")} [${this.totalPatients}]`;
    }
}