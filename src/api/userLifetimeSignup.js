// src/api/userLifetimeSignup.js
export async function userLifetimeSignup(apiKey, name, email, otp = null) {
    const formData = new URLSearchParams();
    formData.append('api_key', apiKey);
    formData.append('name', name);
    formData.append('email', email);
    if (otp) {
      formData.append('otp', otp);
    }
  
    const response = await fetch('https://www.gr8masters.com/SaathStudioAPI/api/V2/userLifetimeSignup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
  
    const data = await response.json();
    return data;
  }
  