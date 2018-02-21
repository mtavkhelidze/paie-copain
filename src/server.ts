import * as express from "express";
import * as debug from "debug";
import * as graphqlHTTP from "express-graphql";

import { gqlInit } from "./graphql";

import { SERVER_API_ROOT, SERVER_PORT } from "../config";
import { dbInit } from "./db";

const main = async () => {

    const log = debug("pc:srv");

    try {

        await dbInit();
        const schema = gqlInit();
        const app = express();

        app.use(`${SERVER_API_ROOT}graphiql`, graphqlHTTP({
            schema,
            graphiql: true
        }));
        log(`GraphQL Interactive @ http://localhost:${SERVER_PORT}${SERVER_API_ROOT}graphiql`);

        app.use(SERVER_API_ROOT, graphqlHTTP({
            schema
        }));
        log(`API @ http://localhost:${SERVER_PORT}${SERVER_API_ROOT}`);

        app.listen(SERVER_PORT);
    } catch (e) {
        /* tslint:disable-next-line */
        console.error(e);
    }
};

(async () => await main())();
