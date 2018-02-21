import * as fs from "fs";
import * as debug from "debug";
import { makeExecutableSchema } from "graphql-tools";

import { GRAPHQL_SCHEAM_FILE } from "../config";
import { initResovers } from "./resolvers";
import { GraphQLSchema } from "graphql";

const log = debug("pc:GQL");

const gqlInit = (): GraphQLSchema => {

    log(`GraphQL schema from ${GRAPHQL_SCHEAM_FILE}`);
    const typeDefs = fs.readFileSync(GRAPHQL_SCHEAM_FILE, "utf-8");

    return makeExecutableSchema({
        typeDefs,
        resolvers: initResovers()
    });
};

export {
    gqlInit
};
