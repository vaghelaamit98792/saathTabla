import { Updateorder } from "../constant";

export async function updateOrder(apiKey, orderId, paymentStatus, paymentRefNo, coupon) {
  // Create a new FormData object
  const formData = new FormData();
  formData.append('api_key', 'nK<uJ@Tk8&$B#-xq-?#}');
  formData.append('order_id', orderId);
  formData.append('payment_status', paymentStatus);
  formData.append('payment_ref_no', paymentRefNo);
  // formData.append('coupon', coupon);

  const response = await fetch(Updateorder, {
      method: 'POST',
      body: formData, 
  });

  const data = await response.json();
  return data;
}
