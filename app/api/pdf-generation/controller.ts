import {
  validateJobOrder,
  applyDefaults,
  computeTotals,
} from "@/app/api/pdf-generation/model";
import { renderJobOrderHtml } from "@/app/api/_lib/template/pdf-generation.template";
import { renderHtmlToPdf } from "@/app/api/_lib/services/pdf-generation.service";
import { JobOrderData } from "@/app/api/pdf-generation/types";


export type GenerateJOResult =
  | { ok: true; pdf: Buffer; filename: string }
  | { ok: false; status: number; message: string };

export async function generateJobOrderPdf(raw: unknown): Promise<GenerateJOResult> {
  // 1. Validate
  const { valid, errors } = validateJobOrder(raw);
  if (!valid) {
    return { ok: false, status: 400, message: `Validation failed: ${errors.join("; ")}` };
  }

  try {
    // 2. Apply defaults
    const data: JobOrderData = applyDefaults(raw as JobOrderData);

    // 3. Compute totals
    const totals = computeTotals(data);

    // 4. Render HTML
    const html = renderJobOrderHtml(data, totals);

    // 5. Generate PDF buffer via Puppeteer
    const pdf = await renderHtmlToPdf(html);

    return { ok: true, pdf, filename: `JO-${data.jobOrderNo}.pdf` };
  } catch (err) {
    console.error("[JobOrderController] PDF generation failed:", err);
    return { ok: false, status: 500, message: "Internal error generating PDF" };
  }
}