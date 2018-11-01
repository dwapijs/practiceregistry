import * as fs from "fs";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { DatabaseOption } from "./database-option";

export let clearDb = async (dbpath: string = "./test/dwapitest.sqlite3") => {
    fs.unlink(dbpath, () => {
    });
};

export let initDbConnection = async (models: string[] = ["./test/artifacts/*.ts"], dbpath: string = "./test/dwapitest.sqlite3") => {
    await createConnection(DatabaseOption(dbpath, models));
};