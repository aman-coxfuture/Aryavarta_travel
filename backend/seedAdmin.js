require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  if (!email) throw new Error("ADMIN_EMAIL is required");
  if (!password || password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  await mongoose.connect(process.env.MONGO_URI);

  let user = await User.findOne({ email });
  if (user) {
    user.name = user.name || "Aryavarta Admin";
    user.role = "superAdmin";
    user.password = password;
    await user.save();
    console.log(`Updated super admin account: ${email}`);
  } else {
    await User.create({
      name: "Aryavarta Admin",
      email,
      password,
      role: "superAdmin",
    });
    console.log(`Created super admin account: ${email}`);
  }
}

seedAdmin()
  .catch((error) => {
    console.error("Admin seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
