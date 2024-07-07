import mongoose, { Schema, mongo } from "mongoose";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { StaticImageData } from "next/image";

const WaitlistSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Waitlist =
  mongoose.models.Waitlist || mongoose.model("Waitlist", WaitlistSchema);

export interface WaitlistType {
  email: string;
  name: string;
}

export default Waitlist;
