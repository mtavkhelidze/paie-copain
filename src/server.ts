import * as express from "express";
import * as debug from "debug";

import { gqlInit } from "./graphql";

import { SERVER_API_ROOT, SERVER_PORT } from "../config";
import { dbInit } from "./db";

const main = async () => {

    const log = debug("pc:srv");

    try {

        await dbInit();
        const api = gqlInit();
        const app = express();

        app.use(SERVER_API_ROOT, api);
        app.listen(SERVER_PORT);
        log(`Server is running @ http://localhost:${SERVER_PORT}${SERVER_API_ROOT}`);
    } catch (e) {
        /* tslint:disable-next-line */
        console.error(e);
    }
};

(async () => await main())();
