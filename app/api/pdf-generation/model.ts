import { JobOrderData, JobOrderTotals } from "@/app/api/pdf-generation/types";

// ─── Default special instructions ────────────────────────────────────────────
const DEFAULT_SPECIAL_INSTRUCTIONS = `Please ACKNOWLEDGE receipt of this Job Order and EMAIL confirmation within 3 days from receipt.
IMPORTANT: Please deliver the services on time and as agreed on the principal contract.
Strictly NO Job Order NO execution, otherwise services will not be paid by YMPH.
Kindly submit the billing immediately after the completion of services.
Copy of Job Order, Certificate of Completion (COC) must be attached together with the billing invoice.`;

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateJobOrder(data: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const d = data as Partial<JobOrderData>;

  if (!d.jobOrderNo?.trim()) errors.push("jobOrderNo is required");
  if (!d.mainContractNo?.trim()) errors.push("mainContractNo is required");
  if (!d.vendorName?.trim()) errors.push("vendorName is required");
  if (!d.contactPerson?.trim()) errors.push("contactPerson is required");
  if (!d.billToName?.trim()) errors.push("billToName is required");
  if (!Array.isArray(d.items) || d.items.length === 0)
    errors.push("items must be a non-empty array");
  if (typeof d.vatRate !== "number" || d.vatRate < 0 || d.vatRate > 1)
    errors.push("vatRate must be a decimal between 0 and 1 (e.g. 0.12)");

  return { valid: errors.length === 0, errors };
}

// ─── Computed totals ──────────────────────────────────────────────────────────
export function computeTotals(data: JobOrderData): JobOrderTotals {
  const subTotal = data.items.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subTotal * data.vatRate;
  const joTotal = subTotal + vatAmount;
  const vatPercent = Math.round(data.vatRate * 100);

  return { subTotal, vatAmount, joTotal, vatPercent };
}

// ─── Apply defaults ───────────────────────────────────────────────────────────
export function applyDefaults(data: JobOrderData): JobOrderData {
  return {
    ...data,
    date: data.date || new Date().toLocaleDateString("en-PH"),
    specialInstructions:
      data.specialInstructions?.trim() || DEFAULT_SPECIAL_INSTRUCTIONS,
    vendorNo: data.vendorNo ?? "",
    approvedBy2: data.approvedBy2 ?? { name: "", title: "" },
  };
}

// ─── Format currency ──────────────────────────────────────────────────────────
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}