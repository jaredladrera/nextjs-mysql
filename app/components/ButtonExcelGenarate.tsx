"use client";

import { useGenerateUserExcel } from "@/app/_features/exel-generation/exel-generation.hooks";

export default function UserExportButton() {
  const { generateExcel, isGenerating, error } =
    useGenerateUserExcel();

  return (
    <div>
      <button onClick={generateExcel} disabled={isGenerating}>
        {isGenerating ? "Exporting..." : "Export Excel"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}