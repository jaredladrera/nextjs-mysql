"use client";

import { useState, useCallback, useEffect } from "react";
import { JobOrderData } from "@/app/_types/job-order.types";
import api from "@/app/_lib/axios";

interface UsePreviewJOPdf {
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  openPreview: (data: JobOrderData) => Promise<void>;
  closePreview: () => void;
}

export function usePreviewJOPdf(): UsePreviewJOPdf {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState<string | null>(null);

  // Revoke blob URL on unmount to free memory
  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const closePreview = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setError(null);
  }, [previewUrl]);

  const openPreview = useCallback(async (data: JobOrderData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Same route as download — ?preview switches Content-Disposition to inline
      const res = await api.post("/pdf-generation?preview", data, {
        responseType: "blob",
      });

      const blob = res.data as Blob;
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : (err as any)?.response?.data?.error ?? "Unexpected error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { previewUrl, isLoading, error, openPreview, closePreview };
}