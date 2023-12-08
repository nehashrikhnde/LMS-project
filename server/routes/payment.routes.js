import { Router } from "express";
import {
  allPayments,
  buySubscription,
  cancelSubscription,
  getRazorpayApikey,
  verifySubscription
} from "../controller/payment.controller.js";
import {
  authorizedroles,
  isLoggedIn,
  authorizeSubscribers,
} from "../middleware/auth.middleware";

const router = Router();



router.route("/subscribe").post(isLoggedIn, buySubscription);

router.route("/verify").post(isLoggedIn, verifySubscription);

router
  .route("/unsubscribe")
  .post(isLoggedIn, cancelSubscription, authorizeSubscribers);
  router.route("/razorpay-key").get(isLoggedIn, getRazorpayApikey);
router.route("/").get(isLoggedIn, authorizedroles('ADMIN'), allPayments);

export default router;
