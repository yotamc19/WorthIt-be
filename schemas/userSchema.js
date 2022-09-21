const signUpSchema = {
  type: "object",
  properties: {
    fullname: { type: "string" },
    email: { type: "string" },
    password: { type: "string", minLength: 2 },
    repassword: { type: "string", minLength: 2 },
    isAdmin: { type: "boolean", nullable: true },
  },
  required: ["email", "password", "repassword", "fullname"],
  additionalProperties: false,
};

module.exports = { signUpSchema };
