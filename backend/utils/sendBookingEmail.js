export async function sendBookingEmail(to, subject, html) {
  try {
    const response = await fetch(process.env.SENDGRID_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.EMAIL_FROM },
        subject,
        content: [{ type: "text/html", value: html }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid error:", errorText);
    } else {
      console.log("Email sent successfully");
    }
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
}
