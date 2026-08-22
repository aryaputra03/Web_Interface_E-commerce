"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import type { Product } from "../types/product.types";

interface ProductJsonEditorProps {
  value: Partial<Product>;
  onChange: (value: Partial<Product>) => void;
}

// Editor metadata mentah produk (Monaco) — alternatif ProductForm untuk admin
// yang ingin mengedit langsung dalam bentuk JSON. Menyertakan validasi ringan
// bahwa field `barcode` tidak boleh hilang dari metadata, sesuai dokumen
// kebutuhan Bab 8.
export function ProductJsonEditor({ value, onChange }: ProductJsonEditorProps) {
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (next: string | undefined) => {
    const nextText = next ?? "";
    setText(nextText);

    try {
      const parsed = JSON.parse(nextText);
      if (!parsed.barcode) {
        setError('Field "barcode" wajib ada di metadata produk.');
        return;
      }
      setError(null);
      onChange(parsed);
    } catch {
      setError("JSON tidak valid.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Editor
        height="360px"
        defaultLanguage="json"
        value={text}
        onChange={handleChange}
        options={{ minimap: { enabled: false }, fontSize: 13 }}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
