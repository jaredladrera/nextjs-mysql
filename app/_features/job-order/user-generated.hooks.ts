"use client";

import { useState } from "react";
import { JobOrderData } from "@/app/_types/job-order.types";
import api from "@/app/_lib/axios";

interface UseGenerateJOPdf {
  generatePdf: (data: JobOrderData) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
  reset: () => void;
}
 
export function useGenerateJOPdf(): UseGenerateJOPdf {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError]               = useState<string | null>(null);
 
  const reset = () => setError(null);
 
  const generatePdf = async (data: JobOrderData) => {
    setIsGenerating(true);
    setError(null);
 
    try {
      const res = await api.post("/pdf-generation", data, {
        responseType: "blob",
      });
 
      const blob = res.data as Blob;
      const url  = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href     = url;
      link.download = `JO-${data.jobOrderNo}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : (err as any)?.response?.data?.error ?? "Unexpected error";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };
 
  return { generatePdf, isGenerating, error, reset };
}