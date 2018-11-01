import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import * as fs from "fs";
import { IPartnerRepository } from "../../src/core/interfaces/ipartner-repository";
import { PartnerRepository } from "../../src/infrastructure/partner-repository";
import { Partner } from "../../src/core/model/partner";
import { Facility } from "../../src/core/model/facility";
import { IFacilityRepository } from "../../src/core/interfaces/ifacility-repository";
import { FacilityRepository } from "../../src/infrastructure/facility-repository";
import { FacilityUploadHistory } from "../../src/core/model/facility-upload-history";
import Container from "typedi";
import { clearDb, initDbConnection } from "../test-initializer";


describe("Facility Repository Base", () => {
    let partnerRepository: IPartnerRepository;
    let facilityRepository: IFacilityRepository;
    const dbPath: string = "test/dwapitest.sqlite3";

    const partners = [
        new Partner("UMB", "UMB"),
        new Partner("DFID", "DFID"),
    ];

    const facilties = [
        new Facility(20001, "KDH")
    ];

    partners[0].assignFacility(facilties[0]);

    beforeAll(async () => {
        await clearDb();
        useContainer(Container);
        await initDbConnection(["./src/core/model/*.ts"]);
        partnerRepository = Container.get(PartnerRepository);
        facilityRepository = Container.get(FacilityRepository);

        await facilityRepository.createBatch(facilties);
        await partnerRepository.createBatch(partners);
    });

    it("should save facility with Uploads", async () => {
        const newFacility = new Facility(22, "New Facility");
        newFacility.updateUploadHistory(new FacilityUploadHistory(new Date(2018, 0, 1), 200, newFacility));
        newFacility.updateUploadHistory(new FacilityUploadHistory(new Date(2018, 1, 1), 206, newFacility));

        await facilityRepository.create(newFacility);
        const facility = await facilityRepository.get(newFacility.id);
        expect(facility.uploads.length > 0);
        console.log(`${facility}`);
        facility.uploads.forEach((p) => console.log(`> ${p}`));
    });

    it("should load facility with partner", async () => {
        const facility = await facilityRepository.get(facilties[0].id);
        expect(facility.partners.length > 0);
        console.log(`${facility}`);
        facility.partners.forEach((p) => console.log(`> ${p}`));
    });

    it("should load all facilities with partner", async () => {
        const facilities = await facilityRepository.getAll();
        facilities.forEach(f => expect(f.partners.length > 0));
        facilities.forEach((f) => {
            console.log(`${f}`);
            f.partners.forEach(p => console.log(`> ${p}`));
        });
    });
    afterAll(async () => {
        await clearDb();
    });
});