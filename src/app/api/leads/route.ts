import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // TWENTY CRM INTEGRATION
    // ---------------------------------------------------------
    // Set these in your .env.local file:
    // TWENTY_API_URL="https://your-twenty-instance.com"
    // TWENTY_API_KEY="your_api_key_here"
    
    const TWENTY_API_URL = process.env.TWENTY_API_URL;
    const TWENTY_API_KEY = process.env.TWENTY_API_KEY;

    if (TWENTY_API_URL && TWENTY_API_KEY) {
      // Typically Twenty CRM uses /rest/people to create a person/lead
      const response = await fetch(`${TWENTY_API_URL}/rest/people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TWENTY_API_KEY}`,
        },
        body: JSON.stringify({
          name: {
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ").slice(1).join(" ") || "",
          },
          emails: [{ email: data.email, type: "Work" }],
          phones: [{ number: data.phone, type: "Work" }],
          intro: `Bottlenecks: ${data.bottleneck.join(", ")} | Revenue: ${data.revenue} | Timeline: ${data.timeline} | Preference: ${data.preference}`,
          // Map other custom fields here based on your Twenty CRM schema
        }),
      });

      if (!response.ok) {
        console.error("Failed to push to Twenty CRM:", await response.text());
      } else {
        console.log("Successfully pushed lead to Twenty CRM!");
      }
    } else {
      console.log("Twenty CRM credentials missing, skipping CRM push. Lead Data:", data);
    }

    // RESEND EMAIL NOTIFICATION
    // ---------------------------------------------------------
    // Sends an instant alert to your registered Resend email address
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "Acquisition System <onboarding@resend.dev>",
          to: "hht.automation@gmail.com", // Make sure this matches your Resend login email
          subject: `🚨 New Lead: ${data.name} (${data.preference.includes("Google Meet") ? "Wants to Book" : "Call Back Requested"})`,
          html: `
            <h2>New Audit Request Captured</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <hr />
            <h3>Diagnostic Data</h3>
            <p><strong>Bottlenecks:</strong> ${data.bottleneck.join(", ")}</p>
            <p><strong>Revenue:</strong> ${data.revenue}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
            <hr />
            <p><strong>Preference:</strong> ${data.preference}</p>
          `,
        });
        console.log("Lead notification email sent successfully via Resend.");
      } catch (emailError) {
        console.error("Failed to send Resend email:", emailError);
      }
    } else {
      console.log("RESEND_API_KEY missing, skipping email notification.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
