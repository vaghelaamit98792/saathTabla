import { Updatemembershipplan } from "../constant";

export async function updateMembershipPlan(apiKey, userId, membershipId, expiryDate, paymentMode, orderAmount) {
    // Create a new FormData object
    const formData = new FormData();
    formData.append('api_key', 'nK<uJ@Tk8&$B#-xq-?#}');
    formData.append('user_id', userId);
    formData.append('membership_id', membershipId);
    formData.append('expiry_date', expiryDate); 
    formData.append('payment_mode', paymentMode); 
    formData.append('order_amount', orderAmount);

    const response = await fetch(Updatemembershipplan, {
        method: 'POST',
        body: formData, 
    });

    const data = await response.json();
    return data;
}
