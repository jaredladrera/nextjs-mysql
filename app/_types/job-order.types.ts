export interface JobOrderItem {
  ln: number;
  description: string;
  qty: number;
  uom: string;
  deliveryDate: string;
  unitPrice: number;
  total: number;
}

export interface Signatory {
  name: string;
  title: string;
}

export interface JobOrderData {
  // Header
  mainContractNo: string;
  jobOrderNo: string;
  date: string;

  // Vendor
  vendorName: string;
  vendorNo?: string;
  contactPerson: string;
  telNo: string;
  terms: string;

  // Bill To
  billToName: string;
  billToAddress: string;

  // Line Items
  items: JobOrderItem[];

  // Footer
  remarks: string;
  activityProposalNo: string;
  deptCode: string;

  // Financials
  vatRate: number; // e.g. 0.12 = 12%

  // Special Instructions (optional — falls back to default)
  specialInstructions?: string;

  // Signatories
  buyer: Signatory;
  checkedBy: Signatory;
  approvedBy1: Signatory;
  approvedBy2: Signatory;
}

export interface JobOrderTotals {
  subTotal: number;
  vatAmount: number;
  joTotal: number;
  vatPercent: number;
}