import express from "express";
import {
  create,
  balance,
  metric,
} from "../controller/transaction.controller.js";

const router = express.Router();

router.post("/", create);

router.get("/balance", balance);

router.get("/trans", metric);

export default router;
