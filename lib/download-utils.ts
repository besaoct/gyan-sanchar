import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadHtmlContent = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const htmlContent = element.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export const downloadHtmlContentAsPdf = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    });
  }
};