import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { AggregateRoot } from "../../../../sharedkernel/src";
import { Facility } from "./facility";

@Entity()
export class Partner extends AggregateRoot {
    @Column()
    shortName: string;

    @Column()
    name: string;

    @ManyToMany(type => Facility, f => f.partners, {cascade: true, eager: true})
    @JoinTable({name: "partner_facilities"})
    facilites: Facility[];

    constructor(shortName: string, name: string) {
        super();
        this.shortName = shortName;
        this.name = name;
    }

    addFacility(facility: Facility) {
        if (!this.facilites) {
            this.facilites = [];
        }
        this.facilites.push(facility);
    }

    toString(): string {
        return `${this.shortName}-${this.name}`;
    }
}

