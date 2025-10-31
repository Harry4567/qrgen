        const qrCanvas = document.getElementById('qrcode-canvas');
        const logoOverlay = document.getElementById('logo-overlay');
        const dataInput = document.getElementById('data-input');
        const logoInput = document.getElementById('logo-input');
        const downloadBtn = document.getElementById('download-btn');

        function generateCustomQRCode() {
            const data = dataInput.value.trim();
            if (!data) {
                alert("Veuillez entrer une URL ou un texte.");
                return;
            }

            new QRious({
                element: qrCanvas,
                value: data,
                size: 300,
                level: 'H'
            });

            downloadBtn.style.display = 'block';

            if (logoInput.files.length > 0) {
                const file = logoInput.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    logoOverlay.src = e.target.result;
                    logoOverlay.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                logoOverlay.style.display = 'none';
                logoOverlay.src = '';
            }
        }

        function downloadQRCode() {
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = qrCanvas.width;
            finalCanvas.height = qrCanvas.height;
            const ctx = finalCanvas.getContext('2d');

            ctx.drawImage(qrCanvas, 0, 0);

            if (logoOverlay.style.display !== 'none' && logoOverlay.src) {
                if (logoOverlay.complete) {
                    const qrSize = qrCanvas.width;
                    const logoRatio = 0.20; 
                    const logoSize = qrSize * logoRatio;
                    const logoX = (qrSize - logoSize) / 2;
                    const logoY = (qrSize - logoSize) / 2;
                    
                    ctx.drawImage(logoOverlay, logoX, logoY, logoSize, logoSize);
                }
            }

            const link = document.createElement('a');
            link.download = 'votre-qr-code.png';
            link.href = finalCanvas.toDataURL('image/png');
            link.click();
        }

        logoInput.addEventListener('change', function(e) {
            const fileLabel = document.querySelector('.file-input-label span');
            if (e.target.files.length > 0) {
                fileLabel.textContent = '✅ ' + e.target.files[0].name;
            } else {
                fileLabel.textContent = '📎 Choisir un fichier';
            }
        });

        window.onload = generateCustomQRCode;