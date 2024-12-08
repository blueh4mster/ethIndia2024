import { Router } from "express";
import { sendTxn, signAndCombineAndSendTx } from "../controller/txnController";

const router = Router();

router.route("/sendTxn").post(sendTxn);

export default router;
