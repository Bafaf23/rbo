import express from "express";
import { create, getInfoUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/", getInfoUser);

export default router;
