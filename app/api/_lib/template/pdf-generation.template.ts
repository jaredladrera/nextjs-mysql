import { JobOrderData, JobOrderTotals } from "@/app/api/pdf-generation/types";
import { formatCurrency } from "@/app/api/pdf-generation/model";

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9pt;
    color: #000;
    background: #fff;
  }

  .page { width: 100%; padding: 6mm; }

  /* Header */
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 6px;
  }
  .company-info { font-size: 8.5pt; line-height: 1.45; }
  .header-right { text-align: right; font-size: 8.5pt; line-height: 1.6; }
  .contract-no  { color: #c00; font-weight: bold; }
  .divider      { border: none; border-top: 2px solid #000; margin: 4px 0 6px; }

  /* Title */
  .doc-title {
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    letter-spacing: 3px;
    margin-bottom: 8px;
  }

  /* Vendor / Bill-to */
  .vendor-bill-section {
    display: flex;
    border: 1px solid #000;
  }
  .vendor-box {
    flex: 1;
    padding: 5px 7px;
    border-right: 1px solid #000;
    font-size: 8.5pt;
    line-height: 1.6;
  }
  .bill-box  { flex: 1; padding: 5px 7px; font-size: 8.5pt; line-height: 1.6; }
  .field-label { font-weight: bold; }

  /* Line items */
  .items-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
    border-top: none;
    font-size: 8.5pt;
  }
  .items-table thead tr { background-color: #000; color: #fff; }
  .items-table thead th {
    padding: 4px 5px;
    text-align: center;
    font-weight: bold;
    font-size: 8pt;
    border-right: 1px solid #555;
  }
  .items-table thead th:last-child { border-right: none; }

  .cell {
    padding: 3px 5px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #ddd;
    vertical-align: top;
  }
  .cell:last-child  { border-right: none; }
  .cell.center      { text-align: center; }
  .cell.right       { text-align: right; }
  .cell.description { white-space: pre-wrap; }

  /* Remarks / totals */
  .remarks-totals { display: flex; border: 1px solid #000; border-top: 1px solid #000; }
  .remarks-section {
    flex: 1.5;
    padding: 5px 7px;
    border-right: 1px solid #000;
    font-size: 8.5pt;
    line-height: 1.5;
  }
  .totals-section { flex: 1; font-size: 8.5pt; }
  .total-row {
    display: flex;
    justify-content: space-between;
    padding: 3px 8px;
    border-bottom: 1px solid #ccc;
  }
  .total-row.bold { font-weight: bold; }
  .total-row span:last-child { text-align: right; min-width: 90px; }

  /* Dept code */
  .dept-row { border: 1px solid #000; border-top: none; padding: 3px 7px; font-size: 8.5pt; }

  /* Special instructions */
  .special-instructions { border: 1px solid #000; border-top: none; }
  .si-header {
    background-color: #000;
    color: #fff;
    font-weight: bold;
    padding: 3px 7px;
    font-size: 8.5pt;
  }
  .si-body { padding: 5px 7px; font-size: 7.5pt; line-height: 1.6; white-space: pre-wrap; }

  /* Signatories */
  .signatories { display: flex; border: 1px solid #000; border-top: none; }
  .sig-box {
    flex: 1;
    border-right: 1px solid #000;
    padding: 5px 7px;
    font-size: 8pt;
    min-height: 55px;
  }
  .sig-box:last-child { border-right: none; }
  .sig-role {
    font-weight: bold;
    background: #eee;
    padding: 2px 0;
    margin-bottom: 16px;
    font-size: 7.5pt;
    text-transform: uppercase;
  }
  .sig-name  { font-weight: bold; font-size: 8.5pt; }
  .sig-title { font-size: 7.5pt; color: #333; }
`;

// ─── Partial builders ─────────────────────────────────────────────────────────
function buildItemRows(data: JobOrderData): string {
  const rows = data.items
    .map(
      (item) => `
      <tr>
        <td class="cell center">${item.ln}</td>
        <td class="cell description">${item.description.replace(/\n/g, "<br/>")}</td>
        <td class="cell center">${item.qty}</td>
        <td class="cell center">${item.uom}</td>
        <td class="cell center">${item.deliveryDate}</td>
        <td class="cell right">${formatCurrency(item.unitPrice)}</td>
        <td class="cell right">${formatCurrency(item.total)}</td>
      </tr>`
    )
    .join("");

  const emptyCount = Math.max(0, 8 - data.items.length);
  const emptyRows = Array.from(
    { length: emptyCount },
    () => `
      <tr style="height:28px">
        <td class="cell"></td><td class="cell"></td><td class="cell"></td>
        <td class="cell"></td><td class="cell"></td><td class="cell"></td>
        <td class="cell"></td>
      </tr>`
  ).join("");

  return rows + emptyRows;
}

function buildTotals(totals: JobOrderTotals): string {
  return `
    <div class="total-row">
      <span>Total:</span>
      <span>${formatCurrency(totals.subTotal)}</span>
    </div>
    <div class="total-row">
      <span>VAT ${totals.vatPercent}%</span>
      <span>${formatCurrency(totals.vatAmount)}</span>
    </div>
    <div class="total-row bold" style="border-top:2px solid #000;">
      <span>JO Total</span>
      <span>${formatCurrency(totals.joTotal)}</span>
    </div>`;
}

// ─── Main template function ───────────────────────────────────────────────────
export function renderJobOrderHtml(
  data: JobOrderData,
  totals: JobOrderTotals
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Job Order - ${data.jobOrderNo}</title>
  <style>${CSS}</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="top-header">
    <div class="company-info">
      <strong>Yamaha Motor Philippines Inc.</strong><br/>
      Lot 1 &amp; 2, Lot 17, Phase 1, Lima Technology Center, 4233<br/>
      Tel No. (043) 455-1902 Fax. (043) 981-2459<br/>
      VAT Reg. TIN: 006-726-461-000<br/>
      Business Style: YZONE
    </div>
    <div class="header-right">
      <div><strong>Date:</strong> ${data.date}</div>
      <div class="contract-no">Main Contract No.: ${data.mainContractNo}</div>
      <div class="contract-no">Job Order No.: ${data.jobOrderNo}</div>
    </div>
  </div>

  <hr class="divider"/>
  <div class="doc-title">JOB ORDER</div>

  <!-- VENDOR + BILL TO -->
  <div class="vendor-bill-section">
    <div class="vendor-box">
      <div><span class="field-label">Vendor:</span> ${data.vendorName}</div>
      <div><span class="field-label">Vendor No.</span> ${data.vendorNo}</div>
      <div><span class="field-label">Contact Person:</span> ${data.contactPerson}</div>
      <div><span class="field-label">Tel No.:</span> ${data.telNo}</div>
      <div><span class="field-label">Terms:</span> ${data.terms}</div>
    </div>
    <div class="bill-box">
      <div><span class="field-label">Bill to:</span> ${data.billToName}</div>
      <div style="margin-top:4px">${data.billToAddress}</div>
    </div>
  </div>

  <!-- LINE ITEMS -->
  <table class="items-table">
    <thead>
      <tr>
        <th style="width:4%">LN</th>
        <th style="width:38%">DESCRIPTION</th>
        <th style="width:6%">QTY</th>
        <th style="width:6%">UOM</th>
        <th style="width:13%">DELIVERY DATE</th>
        <th style="width:14%">UNIT PRICE</th>
        <th style="width:14%">TOTAL</th>
      </tr>
    </thead>
    <tbody>${buildItemRows(data)}</tbody>
  </table>

  <!-- REMARKS + TOTALS -->
  <div class="remarks-totals">
    <div class="remarks-section">
      <div><span class="field-label">REMARKS:</span>&nbsp; ${data.remarks}</div>
      <div style="margin-top:8px">
        <span class="field-label">ACTIVITY PROPOSAL NO.</span>&nbsp; ${data.activityProposalNo}
      </div>
    </div>
    <div class="totals-section">${buildTotals(totals)}</div>
  </div>

  <!-- DEPT CODE -->
  <div class="dept-row">
    <span class="field-label">DEPT CODE:</span>&nbsp; ${data.deptCode}
  </div>

  <!-- SPECIAL INSTRUCTIONS -->
  <div class="special-instructions">
    <div class="si-header">SPECIAL INSTRUCTIONS</div>
    <div class="si-body">${data.specialInstructions}</div>
  </div>

  <!-- SIGNATORIES -->
  <div class="signatories">
    <div class="sig-box">
      <div class="sig-role">Buyer</div>
      <div class="sig-name">${data.buyer.name}</div>
      <div class="sig-title">${data.buyer.title}</div>
    </div>
    <div class="sig-box">
      <div class="sig-role">Checked By</div>
      <div class="sig-name">${data.checkedBy.name}</div>
      <div class="sig-title">${data.checkedBy.title}</div>
    </div>
    <div class="sig-box">
      <div class="sig-role">Approved By</div>
      <div class="sig-name">${data.approvedBy1.name}</div>
      <div class="sig-title">${data.approvedBy1.title}</div>
    </div>
    <div class="sig-box">
      <div class="sig-role">Approved By</div>
      <div class="sig-name">${data.approvedBy2.name}</div>
      <div class="sig-title">${data.approvedBy2.title}</div>
    </div>
  </div>

</div>
</body>
</html>`;
}