// src/api/placeOrder.js

import { PlaceUserOrderAndroidApi } from "../constant";

export async function placeOrder( userId, membershipId, orderAmount, orderRemark, paymentMode) {
    const formData = new URLSearchParams();
    formData.append('api_key', 'nK<uJ@Tk8&$B#-xq-?#}');
    formData.append('userid', userId);
    formData.append('membership_id', membershipId);
    formData.append('order_amount', orderAmount);
    formData.append('order_remark', orderRemark);
    formData.append('payment_mode', paymentMode);
  
    const response = await fetch(PlaceUserOrderAndroidApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
  
    const data = await response.json();
    return data;
  }
  