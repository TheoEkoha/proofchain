// src/pdf-worker.ts
import { pdfjs } from 'react-pdf';

// Configure le worker avec le chemin correct
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();
