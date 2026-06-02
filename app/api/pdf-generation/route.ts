import { NextRequest, NextResponse } from "next/server";
import { generateJobOrderPdf } from "@/app/api/pdf-generation/controller";

// POST /api/jo/generate
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = await generateJobOrderPdf(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return new NextResponse(result.pdf as Uint8Array, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${result.filename}"`,
    },
  });
}