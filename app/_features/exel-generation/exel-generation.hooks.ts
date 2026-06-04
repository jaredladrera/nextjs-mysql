"use client";

import { useState } from "react";
import api from "@/app/_lib/axios";

interface UseGenerateUserExcel {
  generateExcel: () => Promise<void>;
  isGenerating: boolean;
  error: string | null;
  reset: () => void;
}

export function useGenerateUserExcel(): UseGenerateUserExcel {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  const generateExcel = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await api.get("/exel-generation", {
        responseType: "blob",
      });

      const blob = res.data as Blob;

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `user_list.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

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

  return {
    generateExcel,
    isGenerating,
    error,
    reset,
  };
}