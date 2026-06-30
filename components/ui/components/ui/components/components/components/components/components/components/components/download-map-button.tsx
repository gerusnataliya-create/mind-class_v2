"use client";

import { useCallback, useRef, useState } from "react";
import { Download } from "lucide-react";
import { computeBounds, computeLayout } from "@/components/mind-map-viewer";
import type { MindMapData } from "@/lib/data";

interface DownloadMapButtonProps {
  data: MindMapData;
  cardTitle: string;
}

const FORMATS = ["PNG", "PDF"] as const;

export function DownloadMapButton({ data, cardTitle }: DownloadMapButtonProps) {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (
      !btnRef.current?.contains(e.relatedTarget as Node) &&
      !dropdownRef.current?.contains(e.relatedTarget as Node)
    ) {
      setOpen(false);
    }
  }, []);

  const handleDownload = useCallback(
    async (format: string) => {
      setOpen(false);
      setExporting(true);

      try {
        if (format === "PNG") {
          await downloadPNG(data, cardTitle);
        } else if (format === "PDF") {
          await downloadPDF(data, cardTitle);
        }
      } finally {
        setExporting(false);
      }
    },
    [data, cardTitle]
  );

  return (
    <div className="relative" onBlur={handleBlur}>
      <button
        ref={btnRef}
        type="button"
        disabled={exporting}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50"
      >
        <Download className="h-3.5 w-3.5" />
        {exporting ? "Скачивание…" : "Скачать"}
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-md border bg-popover p-1 shadow-md"
        >
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => handleDownload(fmt)}
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-popover-foreground hover:bg-accent"
            >
              {fmt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function layoutToSVGString(data: MindMapData): string {
  const layout = computeLayout(data);
  const bounds = computeBounds(layout);
  const centerNode = layout.find((n) => n.isCenter);
  const childNodes = layout.filter((n) => !n.isCenter);
  const edgeColor = "#6b7280";
  const nodeColor = "#6b7280";

  const toNode = (id: string) => layout.find((n) => n.id === id);

  const tw = (text: string) => text.length * (14 * 0.6);

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}" width="${bounds.width}" height="${bounds.height}">
    <defs>
      <marker id="a" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="${edgeColor}" opacity="0.5"/>
      </marker>
    </defs>
    <rect x="${bounds.x}" y="${bounds.y}" width="${bounds.width}" height="${bounds.height}" fill="white"/>`;

  for (const edge of data.edges) {
    const from = toNode(edge.from);
    const to = toNode(edge.to);
    if (!from || !to) continue;
    svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${edgeColor}" stroke-width="2" opacity="0.4" marker-end="url(#a)"/>`;
  }

  for (const node of childNodes) {
    const rx = node.x - tw(node.label) / 2 - 14;
    const ry = node.y - 18;
    const rw = tw(node.label) + 28;
    svg += `<g>
      <rect x="${rx}" y="${ry}" width="${rw}" height="36" rx="18" ry="18" fill="white" stroke="${nodeColor}" stroke-width="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <text x="${node.x}" y="${node.y + 5}" text-anchor="middle" font-size="14" fill="${nodeColor}" font-weight="500">${escapeXml(node.label)}</text>
    </g>`;
  }

  if (centerNode) {
    svg += `<g>
      <circle cx="${centerNode.x}" cy="${centerNode.y}" r="40" fill="${nodeColor}" opacity="0.15"/>
      <circle cx="${centerNode.x}" cy="${centerNode.y}" r="32" fill="${nodeColor}" stroke="white" stroke-width="3" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.2))"/>
      <text x="${centerNode.x}" y="${centerNode.y}" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white" font-weight="700">${escapeXml(centerNode.label.length > 14 ? centerNode.label.slice(0, 13) + "…" : centerNode.label)}</text>
    </g>`;
  }

  svg += "</svg>";
  return svg;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function downloadPNG(data: MindMapData, title: string): Promise<void> {
  const svgString = layoutToSVGString(data);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

  const bounds = computeBounds(computeLayout(data));
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = bounds.width * scale;
  canvas.height = bounds.height * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);

  URL.revokeObjectURL(url);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("Failed to create PNG blob"));
    }, "image/png");
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.replace(/\s+/g, "_")}.png`;
  a.click();
  URL.revokeObjectURL(a.href);
}

const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
const A4_DPI = 150;
const A4_WIDTH_PX = Math.round((A4_WIDTH_PT / 72) * A4_DPI);
const A4_HEIGHT_PX = Math.round((A4_HEIGHT_PT / 72) * A4_DPI);
const PDF_MARGIN_PX = 60;

async function downloadPDF(data: MindMapData, title: string): Promise<void> {
  const svgString = layoutToSVGString(data);
  const layout = computeLayout(data);
  const bounds = computeBounds(layout);

  const canvas = document.createElement("canvas");
  canvas.width = A4_WIDTH_PX;
  canvas.height = A4_HEIGHT_PX;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);

  const usableW = A4_WIDTH_PX - 2 * PDF_MARGIN_PX;
  const usableH = A4_HEIGHT_PX - 2 * PDF_MARGIN_PX;
  const mapScale = Math.min(usableW / bounds.width, usableH / bounds.height);
  const mapW = bounds.width * mapScale;
  const mapH = bounds.height * mapScale;
  const offsetX = (A4_WIDTH_PX - mapW) / 2;
  const offsetY = (A4_HEIGHT_PX - mapH) / 2;

  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load SVG for PDF"));
    image.src = url;
  });

  ctx.drawImage(img, offsetX, offsetY, mapW, mapH);
  URL.revokeObjectURL(url);

  const jpegBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to create JPEG for PDF"));
      },
      "image/jpeg",
      0.92
    );
  });

  const pdfBytes = await buildMinimalPDF(jpegBlob, A4_WIDTH_PX, A4_HEIGHT_PX);

  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" })
  );
  a.download = `${title.replace(/\s+/g, "_")}.pdf`;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function buildMinimalPDF(
  jpegBlob: Blob,
  imgW: number,
  imgH: number
): Promise<Uint8Array> {
  const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

  const header = "%PDF-1.4\n";
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4_WIDTH_PT} ${A4_HEIGHT_PT}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n`;
  const streamData = `q\n${A4_WIDTH_PT} 0 0 ${A4_HEIGHT_PT} 0 0 cm\n/Im0 Do\nQ\n`;
  const obj4 = `4 0 obj\n<< /Length ${streamData.length} >>\nstream\n${streamData}\nendstream\nendobj\n`;
  const imgDict = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
  const imgEnd = "\nendstream\nendobj\n";

  const enc = new TextEncoder();
  const headerB = enc.encode(header);
  const o1b = enc.encode(obj1);
  const o2b = enc.encode(obj2);
  const o3b = enc.encode(obj3);
  const o4b = enc.encode(obj4);
  const idB = enc.encode(imgDict);
  const ieB = enc.encode(imgEnd);

  const offsets: number[] = [0, 0, 0, 0, 0, 0];
  let pos = headerB.length;
  offsets[1] = pos;
  pos += o1b.length;
  offsets[2] = pos;
  pos += o2b.length;
  offsets[3] = pos;
  pos += o3b.length;
  offsets[4] = pos;
  pos += o4b.length;
  offsets[5] = pos;
  pos += idB.length;
  pos += jpegBytes.length;
  pos += ieB.length;

  const xref = `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((o) => `${String(o).padStart(10, "0")} 00000 n `)
    .join("\n")}\n`;
  const xrefB = enc.encode(xref);
  const xrefOff = pos;
  pos += xrefB.length;

  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOff}\n%%EOF\n`;
  const trailerB = enc.encode(trailer);

  const total = new Uint8Array(pos + trailerB.length);
  let off = 0;
  total.set(headerB, off); off += headerB.length;
  total.set(o1b, off); off += o1b.length;
  total.set(o2b, off); off += o2b.length;
  total.set(o3b, off); off += o3b.length;
  total.set(o4b, off); off += o4b.length;
  total.set(idB, off); off += idB.length;
  total.set(jpegBytes, off); off += jpegBytes.length;
  total.set(ieB, off); off += ieB.length;
  total.set(xrefB, off); off += xrefB.length;
  total.set(trailerB, off);

  return total;
}
