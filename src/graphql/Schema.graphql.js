import { buildSchema } from "graphql";
import { TypesSchema } from "./Types.graphql.js";
import { QuerySchema, MutationSchema } from "./QueryAndMutation.graphql.js";

export const schema = buildSchema(`
    ${TypesSchema}

    type Query{
      ${QuerySchema}
    }

    type Mutation{
      ${MutationSchema}
    }
`);
