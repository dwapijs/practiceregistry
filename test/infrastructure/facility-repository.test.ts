import "reflect-metadata";
import { createConnection } from "typeorm";
import * as fs from "fs";
import { IPartnerRepository } from "../../src/core/interfaces/ipartner-repository";
import { PartnerRepository } from "../../src/infrastructure/partner-repository";
import { Partner } from "../../src/core/model/partner";
import { Facility } from "../../src/core/model/facility";
import { IFacilityRepository } from "../../src/core/interfaces/ifacility-repository";
import { FacilityRepository } from "../../src/infrastructure/facility-repository";


describe("Facility Repository Base", () => {
    let partnerRepository: IPartnerRepository;
    let facilityRepository: IFacilityRepository;
    const dbPath: string = "test/dwapitest.sqlite3";

    const partners = [
        new Partner("UMB", "UMB"),
    ];

    const facilties = [
        new Facility(20001, "KDH")
    ];

    partners[0].addFacility(facilties[0]);

    beforeAll(async () => {
        fs.unlink(dbPath, (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log("db deleted !");
            }
        );
        const connection = await createConnection({
            logging: true,
            type: "sqlite",
            database: dbPath,
            entities: ["./src/core/model/*.ts"],
            synchronize: true
        });
        partnerRepository = new PartnerRepository(Partner, connection);
        facilityRepository = new FacilityRepository(Facility, connection);

        await facilityRepository.createBatch(facilties);
        await partnerRepository.createBatch(partners);
    });

    test("should load facilities with partner", async () => {
        const facility = await facilityRepository.get(facilties[0].id);
        expect(facility.partners.length > 0);
        console.log(`${facility}`);
        facility.partners.forEach((p) => console.log(`> ${p}`));
    });
});