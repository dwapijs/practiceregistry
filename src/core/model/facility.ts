import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { AggregateRoot } from "../../../../sharedkernel/src";
import { Partner } from "./partner";
import { FacilityUploadHistory } from "./facility-upload-history";

@Entity()
export class Facility extends AggregateRoot {
    @Column()
    code: number;
    @Column()
    name: string;
    @ManyToMany(type => Partner, p => p.facilites)
    partners: Partner[];
    @OneToMany(type => FacilityUploadHistory, f => f.facility, {cascade: true, eager: true})
    uploads: FacilityUploadHistory[];

    constructor(code: number, name: string) {
        super();
        this.code = code;
        this.name = name;
    }

    updateUploadHistory(uploadHistory: FacilityUploadHistory) {
        if (!this.uploads) {
            this.uploads = [];
        }
        this.uploads.push(uploadHistory);
    }

    toString(): string {
        return `${this.name} [${this.code}]`;
    }
}