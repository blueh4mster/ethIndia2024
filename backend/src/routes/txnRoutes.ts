import { Router } from "express";
import { signAndCombineAndSendTx } from "../controller/txnController"

const router = Router();

router.get("/sendTxn",signAndCombineAndSendTx);

export default router;