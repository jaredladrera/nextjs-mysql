import puppeteer from "puppeteer";

export interface PdfOptions {
  format?: "A4" | "Letter";
  margin?: { top: string; right: string; bottom: string; left: string };
}

const DEFAULT_OPTIONS: PdfOptions = {
  format: "A4",
  margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
};

export async function renderHtmlToPdf(
  html: string,
  options: PdfOptions = {}
): Promise<Buffer> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: opts.format,
      printBackground: true,
      margin: opts.margin,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}