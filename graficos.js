function inicializarGraficos() {
    // =======================
    // GRÁFICO DE PRODUÇÃO (Linha)
    // =======================
    const ctxProd = document.getElementById('productionChart');
    if (ctxProd) {
        const data = [180, 195, 210, 185, 220, 240];
        const labels = ['Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'];

        const ctx = ctxProd.getContext('2d');
        const padding = 50;
        const width = ctxProd.width - padding * 2;
        const height = ctxProd.height - padding * 2;

        // Escala Y
        const maxData = Math.max(...data);
        const minData = 0;

        // Desenha grid Y
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const y = padding + (height / steps) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + width, y);
            ctx.stroke();

            // Label Y
            const value = Math.round(maxData - ((maxData - minData) / steps) * i);
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.fillText(value, padding - 35, y + 4);
        }

        // Desenha grid X e labels
        const xStep = width / (data.length - 1);
        labels.forEach((label, i) => {
            const x = padding + i * xStep;
            ctx.strokeStyle = '#e0e0e0';
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, padding + height);
            ctx.stroke();

            ctx.fillStyle = '#000';
            ctx.fillText(label, x - 10, padding + height + 20);
        });

        // Desenha linha
        ctx.beginPath();
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 2;
        data.forEach((value, i) => {
            const x = padding + i * xStep;
            const y = padding + height - (value - minData) / (maxData - minData) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Preenchimento
        ctx.lineTo(padding + width, padding + height);
        ctx.lineTo(padding, padding + height);
        ctx.closePath();
        ctx.fillStyle = 'rgba(46, 204, 113, 0.1)';
        ctx.fill();

        // Pontos
        data.forEach((value, i) => {
            const x = padding + i * xStep;
            const y = padding + height - (value - minData) / (maxData - minData) * height;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#2ecc71';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

   // =======================
// GRÁFICO DE CULTURAS (Doughnut)
// =======================
const ctxCult = document.getElementById('culturesChart');

if (ctxCult) {
    const data = [35, 28, 18, 12, 7];
    const labels = ['Soja', 'Milho', 'Trigo', 'Feijão', 'Outros'];
    const colors = [
        '#2ecc71',
        '#3498db',
        '#f39c12',
        '#e74c3c',
        '#9b59b6'
    ];

    const ctx = ctxCult.getContext('2d');

    const centerX = ctxCult.width / 2;
    const centerY = ctxCult.height / 2;
    const radius = 110;

    const total = data.reduce((a, b) => a + b, 0);

    let startAngle = -Math.PI / 2;

    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;

        // Fatia
        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            radius,
            startAngle,
            startAngle + sliceAngle
        );

        ctx.arc(
            centerX,
            centerY,
            radius * 0.55,
            startAngle + sliceAngle,
            startAngle,
            true
        );

        ctx.closePath();

        ctx.fillStyle = colors[index];
        ctx.fill();

        startAngle += sliceAngle;
    });

    // Texto central
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('100%', centerX, centerY + 8);
}
}

inicializarGraficos();