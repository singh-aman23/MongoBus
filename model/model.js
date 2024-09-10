import mongoose, { Schema } from "mongoose";

const busSchema = new Schema(
  {
    bus_number: String,
    starting_location: String,
    ending_location: String,
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.models.Bus || mongoose.model("Bus", busSchema);

export default Bus;
