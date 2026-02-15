import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  comparePasswords(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
