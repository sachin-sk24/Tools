window.jsPDF = window.jspdf.jsPDF;

document.getElementById('convertBtn').addEventListener('click', async () => {
  const files = document.getElementById('imageInput').files;
  const compressionLevel = parseFloat(document.getElementById('compression').value);

  if (files.length === 0) {
    alert('Please select at least one image.');
    return;
  }

  const pdf = new jsPDF();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const compressedImage = await compressImage(file, compressionLevel);
    const img = await loadImage(compressedImage);

    if (i > 0) pdf.addPage();
    pdf.addImage(img, 'JPEG', 10, 10, 190, 0);
  }

  const pdfBlob = pdf.output('blob');
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.download = 'converted.pdf';
  downloadLink.style.display = 'block';
});

async function compressImage(file, compressionLevel) {
  const options = {
    maxSizeMB: compressionLevel,
    useWebWorker: true,
  };
  return await imageCompression(file, options);
}

function loadImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => resolve(img);
    };
    reader.readAsDataURL(file);
  });
}
