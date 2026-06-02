"use client";

import { useGenerateJOPdf } from "@/app/_features/job-order/user-generated.hooks";
import { JobOrderData } from "@/app/_types/job-order.types";
import { usePreviewJOPdf }  from "@/app/_features/job-order/previewpdf.hooks";
import JobOrderPreviewModal  from "@/app/pdf-generation/preview/preview-modal";


interface Props {
  data: JobOrderData;
}

export default function JobOrderPDFButton({ data }: Props) {
  const {
    generatePdf,
    isGenerating,
    error: downloadError,
    reset,
  } = useGenerateJOPdf();

  const {
    previewUrl,
    isLoading: isPreviewing,
    error: previewError,
    openPreview,
    closePreview,
  } = usePreviewJOPdf();

  const error    = downloadError || previewError;
  // const filename = `JO-${data.jobOrderNo}.pdf`;
  const filename = `JO-skfjdsf833u4438943.pdf`;
  const busy     = isGenerating || isPreviewing;

  const sampleData: JobOrderData = {
  "mainContractNo": "25-06-008",
  "jobOrderNo": "CS-JO-2025-001",
  "date": "25-Jun-2025",
  "vendorName": "Carbay Philippines, Inc.",
  "vendorNo": "",
  "contactPerson": "Ms. Leslie Maxilom",
  "telNo": "0917-722-6469",
  "terms": "30-45 days",
  "billToName": "Yamaha Motor Philippines Inc.",
  "billToAddress": "Lot 1 & 2, Lot 17, Phase 1, Lima Technology Center, 4233",
  "items": [
    {
      "ln": 1,
      "description": "Media Coverage - X88 Product Launch\nZigwheels\nShort Format Video - YT & Meta reels",
      "qty": 1,
      "uom": "LOT",
      "deliveryDate": "1-Aug-25",
      "unitPrice": 180000,
      "total": 180000
    }
  ],
  "remarks": "Media Coverage of X88 Product Launch at One Ayala Mall on August 1, 2025",
  "activityProposalNo": "MC-2025-06-002",
  "deptCode": "Y4013",
  "vatRate": 0.12,
  "buyer": { "name": "Manuelito Nemis", "title": "Senior Supervisor" },
  "checkedBy": { "name": "Al Joone Del Rosario", "title": "Section Manager" },
  "approvedBy1": { "name": "Melody Casacop", "title": "Division Head" },
  "approvedBy2": { "name": "", "title": "" }
}

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">

          {/* Preview */}
          <button
            onClick={() => openPreview(sampleData)}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-50 transition-colors"
          >
            {isPreviewing ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Loading…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                Preview
              </>
            )}
          </button>

          {/* Download */}
          <button
            onClick={() => generatePdf(sampleData)}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                Download
              </>
            )}
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <span>⚠ {error}</span>
            <button onClick={reset} className="underline text-xs">dismiss</button>
          </div>
        )}
      </div>

      {/* Preview modal */}
      {previewUrl && (
        <JobOrderPreviewModal
          previewUrl={previewUrl}
          filename={filename}
          onClose={closePreview}
          onDownload={() => generatePdf(sampleData)}
          isDownloading={isGenerating}
        />
      )}
    </>
  );
}