import { Schema } from "ajv";
import { ajv } from "./helper";

const schema: Schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    cpf: { type: "string" },
    email: { type: "string", format: "email" }
  },
  required: ["name", "cpf", "email"],
  additionalProperties: false
}

export default ajv.compile(schema);