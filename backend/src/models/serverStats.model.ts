import { model, pluralize, Schema, set } from "mongoose";

export const definition = {
  timestamp: Schema.Types.Date,
  cpu: {
    model: Schema.Types.String,
    qty: Schema.Types.Number,
  },
  mem: {
    total: Schema.Types.Number,
    free: Schema.Types.Number,
    used: Schema.Types.Number,
    cache: Schema.Types.Number,
  },
  system: {
    name: Schema.Types.String,
    uptime: Schema.Types.Number,
  },
  networks: Schema.Types.Array,
};

pluralize(null);

set('strictQuery', false);

export const schema = new Schema(definition, {
  _id: true,
  versionKey: false,
  validateBeforeSave: false,
  strict: false,
});

export const server_stats_model = model("server_stats", schema);
