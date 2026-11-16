import type React from 'react';

export const PDF_ASSET_PATH =
  '/assets/aistudio/7_Days_to_a_Renewed_Mind_Sacred_Steps_Starter_Kit_PRINT__1__4dd3d445.pdf';

export const PDF_DOWNLOAD_FILENAME =
  '7_Days_to_a_Renewed_Mind_Sacred_Steps_Starter_Kit.pdf';

export const CORE_PREVIEW_PDF_PATH =
  '/assets/aistudio/Sacred_Steps_to_Redemption_KDP_Preview_Sample_7c521492.pdf';

export const CORE_PREVIEW_PDF_FILENAME =
  'Sacred_Steps_to_Redemption_365_Biblical_Affirmations_Sample_Preview.pdf';

export async function downloadPdfAsset(
  assetPath: string,
  downloadFilename: string,
  e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
): Promise<void> {
  if (e) {
    e.preventDefault();
  }

  try {
    const response = await fetch(assetPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  } catch {
    const link = document.createElement('a');
    link.href = assetPath;
    link.download = downloadFilename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export async function downloadOfficialStarterKitPdf(
  e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
): Promise<void> {
  return downloadPdfAsset(PDF_ASSET_PATH, PDF_DOWNLOAD_FILENAME, e);
}

export async function downloadCorePreviewPdf(
  e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
): Promise<void> {
  return downloadPdfAsset(CORE_PREVIEW_PDF_PATH, CORE_PREVIEW_PDF_FILENAME, e);
}
