import * as fs from "fs";
import * as debug from "debug";
import { makeExecutableSchema } from "graphql-tools";

import { GRAPHQL_SCHEAM_FILE } from "../config";
import * as graphqlHTTP from "express-graphql";
import { initResovers } from "./resolvers";

const log = debug("pc:GQL");

const gqlInit = (): graphqlHTTP.Middleware => {

    log(`GraphQL schema from ${GRAPHQL_SCHEAM_FILE}`);
    const typeDefs = fs.readFileSync(GRAPHQL_SCHEAM_FILE, "utf-8");

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: initResovers()
    });

    return graphqlHTTP({
        schema,
        graphiql: true
    });
};

export {
    gqlInit
};
