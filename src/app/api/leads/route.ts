import { NextResponse } from "next/server";

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
