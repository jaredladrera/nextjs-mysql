import { NextRequest, NextResponse } from "next/server";
import { generateJobOrderPdf } from "@/app/api/pdf-generation/controller";

// POST /api/jo/generate         → download (Content-Disposition: attachment)
// POST /api/jo/generate?preview → preview  (Content-Disposition: inline)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = await generateJobOrderPdf(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  const isPreview = req.nextUrl.searchParams.has("preview");
  const pdfData = new Uint8Array(result.pdf);

  return new NextResponse(pdfData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${isPreview ? "inline" : "attachment"}; filename="${result.filename}"`,
    },
  });
}