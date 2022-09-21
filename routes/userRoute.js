const express = require("express");
const router = express.Router();
const { signUpSchema } = require("../schemas/allSchemas");

router.post("/signup", validateBody(signUpSchema));
