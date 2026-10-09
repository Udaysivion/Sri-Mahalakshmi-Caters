/**
 * Professional POS & Kitchen Receipt Printing Service
 * 
 * Provides rock-solid printing across thermal receipt printers (80mm, 58mm)
 * and standard office printers (A4) by rendering the target slip in an
 * isolated print iframe without modal backdrop clipping or DOM interference.
 */

export const printThermalReceipt = (elementId, options = {}) => {
  const {
    paperWidth = '80mm',
    title = 'Sri Mahalakshmi Caters - Tax Invoice'
  } = options;

  const targetEl = document.getElementById(elementId);
  if (!targetEl) {
    console.warn(`Print element #${elementId} not found, falling back to window.print()`);
    window.print();
    return;
  }

  // Remove existing print iframe if any
  const existingIframe = document.getElementById('pos-thermal-print-frame');
  if (existingIframe) {
    existingIframe.remove();
  }

  // Create isolated print iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'pos-thermal-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.top = '-9999px';
  iframe.style.left = '-9999px';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  document.body.appendChild(iframe);

  const widthCss = paperWidth === '58mm' ? '56mm' : paperWidth === '80mm' ? '78mm' : '100%';
  const pageMargin = paperWidth === 'full' ? '8mm' : '0mm';
  const pageSize = paperWidth === '58mm' 
    ? '58mm auto' 
    : paperWidth === '80mm' 
    ? '80mm auto' 
    : 'A4 portrait';

  // Extract all existing style sheets so Tailwind classes & custom styles are preserved
  let styleSheetsHtml = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(node => {
    styleSheetsHtml += node.outerHTML;
  });

  const printDocumentHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        ${styleSheetsHtml}
        <style>
          @page {
            size: ${pageSize};
            margin: ${pageMargin};
          }
          *, *::before, *::after {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #FFFFFF !important;
            color: #000000 !important;
            font-family: 'Courier New', Courier, monospace, -apple-system, sans-serif !important;
            font-size: 12px;
            line-height: 1.35;
          }
          .isolated-pos-container {
            width: ${widthCss} !important;
            max-width: ${widthCss} !important;
            min-width: ${widthCss} !important;
            margin: 0 auto !important;
            padding: ${paperWidth === 'full' ? '8mm' : '2mm 1.5mm'} !important;
            background: #FFFFFF !important;
            color: #000000 !important;
            overflow: visible !important;
            box-shadow: none !important;
            border: none !important;
          }
          .isolated-pos-container * {
            color: #000000 !important;
            visibility: visible !important;
          }
          .isolated-pos-container .bg-stone-900,
          .isolated-pos-container .bg-black {
            background-color: #000000 !important;
            color: #FFFFFF !important;
          }
          .isolated-pos-container .text-white {
            color: #FFFFFF !important;
          }
          .isolated-pos-container .bg-stone-100,
          .isolated-pos-container .bg-stone-50 {
            background-color: #F5F5F4 !important;
          }
          .isolated-pos-container .border-stone-900,
          .isolated-pos-container .border-stone-800 {
            border-color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          img {
            max-height: 44px;
            margin: 0 auto 4px auto;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="isolated-pos-container">
          ${targetEl.innerHTML}
        </div>
      </body>
    </html>
  `;

  const iframeDoc = iframe.contentWindow?.document || iframe.contentDocument;
  if (!iframeDoc) {
    window.print();
    return;
  }

  iframeDoc.open();
  iframeDoc.write(printDocumentHtml);
  iframeDoc.close();

  // Allow fonts & images to render cleanly before calling native print
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      console.warn('Direct iframe print warning, falling back to window.print():', err);
      window.print();
    } finally {
      // Clean up iframe after print dialog completes
      setTimeout(() => {
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 3000);
    }
  }, 250);
};

export default printThermalReceipt;
