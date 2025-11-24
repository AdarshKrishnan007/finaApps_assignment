import { trackProductView, trackModalClose, getAnalyticsData } from "./data";

export async function GET() {
  return new Response(JSON.stringify(getAnalyticsData()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();

  if (body.action === "open") {
    trackProductView(body.product);
  } else if (body.action === "close") {
    trackModalClose(body.product);
  }

  return new Response(JSON.stringify(getAnalyticsData()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
