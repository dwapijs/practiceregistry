import { Column, Entity, ManyToMany } from "typeorm";
import { AggregateRoot } from "../../../../sharedkernel/src";
import { Partner } from "./partner";


@Entity()
export class Facility extends AggregateRoot {
    @Column()
    code: number;
    @Column()
    name: string;
    @ManyToMany(type => Partner, p => p.facilites)
    partners: Partner[];

    constructor(code: number, name: string) {
        super();
        this.code = code;
        this.name = name;
    }

    toString(): string {
        return `${this.name} [${this.code}]`;
    }
}