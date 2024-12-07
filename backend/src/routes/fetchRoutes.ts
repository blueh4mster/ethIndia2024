import { Router } from "express";
import { runExample } from "../controller/fetchController"

const router = Router();

router.route("/executeFetch").post(runExample);

export default router;