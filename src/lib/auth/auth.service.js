import bcrypt from "bcrypt";

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // cost factor 12 (good security)
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};
