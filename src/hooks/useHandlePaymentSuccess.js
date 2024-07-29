import { updateMembershipPlan } from "../api/updateMembershipPlan";
import { updateOrder } from "../api/updateOrder";


export async function handlePaymentSuccess(apiKey, orderId, paymentStatus, paymentRefNo, coupon, userId, membershipId, expiryDate, paymentMode, orderAmount) {
  try {
    const updateOrderResponse = await updateOrder(apiKey, orderId, paymentStatus, paymentRefNo, coupon);

    if (updateOrderResponse.status === "1") {

      const updateMembershipResponse = await updateMembershipPlan(apiKey, updateOrderResponse.userID, membershipId, expiryDate, paymentMode, orderAmount);
      if (updateMembershipResponse.status === "1") {
        console.log("Membership plan updated successfully");
      } else {
        console.error("Failed to update membership plan", );
      }
    } else {
      console.error("Failed to update order:", updateOrderResponse);
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
  }
}
