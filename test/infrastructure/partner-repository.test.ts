import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import * as fs from "fs";
import { IPartnerRepository } from "../../src/core/interfaces/ipartner-repository";
import { PartnerRepository } from "../../src/infrastructure/partner-repository";
import { Partner } from "../../src/core/model/partner";
import { Facility } from "../../src/core/model/facility";
import { IFacilityRepository } from "../../src/core/interfaces/ifacility-repository";
import { FacilityRepository } from "../../src/infrastructure/facility-repository";
import { clearDb, initDbConnection } from "../test-initializer";
import Container from "typedi";


describe("Partner Repository Base", () => {
    let partnerRepository: IPartnerRepository;
    let facilityRepository: IFacilityRepository;
    const dbPath: string = "test/dwapitest.sqlite3";

    const partners = [
        new Partner("CDC", "CDC"),
        new Partner("CHS", "CHS")
    ];

    const facilties = [
        new Facility(10001, "KNH"),
        new Facility(10002, "AKUH"),
        new Facility(10003, "AAR")
    ];

    partners[0].assignFacility(facilties[0]);
    partners[1].assignFacility(facilties[1]);
    partners[1].assignFacility(facilties[2]);

    beforeAll(async () => {
        await clearDb();
        useContainer(Container);
        await initDbConnection(["./src/core/model/*.ts"]);
        partnerRepository = Container.get(PartnerRepository);
        facilityRepository = Container.get(FacilityRepository);

        await facilityRepository.createBatch(facilties);
    });

    test("should create partner with facilities", async () => {
        await partnerRepository.createBatch(partners);
        const partner = await partnerRepository.get(partners[0].id);
        expect(partner.facilites.length > 0);
        console.log(`${partner}`);
        partner.facilites.forEach((f) => console.log(`> ${f}`));
    });
    afterAll(async () => {
        await clearDb();
    });
});