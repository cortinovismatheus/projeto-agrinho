// ===== DADOS DE EXEMPLO =====
let culturas = [
    {
        id: 1,
        nome: "Plantação de Soja",
        tipo: "Soja",
        area: 50,
        dataplantio: "2024-09-15",
        status: "pronto-colheita",
        producao: "180 ton"
    },
    {
        id: 2,
        nome: "Milho Safrinha",
        tipo: "Milho",
        area: 35,
        dataplantio: "2024-10-01",
        status: "em-crescimento",
        producao: "140 ton"
    },
    {
        id: 3,
        nome: "Trigo Premium",
        tipo: "Trigo",
        area: 25,
        dataplantio: "2024-08-20",
        status: "colhido",
        producao: "95 ton"
    }
];

let estoque = [
    { id: 1, produto: "Sementes de Soja", quantidade: 450, unidade: "kg", localizacao: "Galpão A", ultimaAtualizacao: "2024-05-02" },
    { id: 2, produto: "Adubo NPK", quantidade: 2300, unidade: "kg", localizacao: "Galpão B", ultimaAtualizacao: "2024-05-01" },
    { id: 3, produto: "Defensivo Agrícola", quantidade: 180, unidade: "L", localizacao: "Armazém", ultimaAtualizacao: "2024-04-30" },
    { id: 4, produto: "Calcário", quantidade: 5000, unidade: "kg", localizacao: "Pátio", ultimaAtualizacao: "2024-04-29" },
    { id: 5, produto: "Óleo de Motor 10W30", quantidade: 120, unidade: "L", localizacao: "Oficina", ultimaAtualizacao: "2024-04-28" }
];

const previsao = [
    { dia: "Seg", max: 32, min: 22, condicao: "☀️", chuva: "0%" },
    { dia: "Ter", max: 30, min: 21, condicao: "⛅", chuva: "10%" },
    { dia: "Qua", max: 28, min: 20, condicao: "🌧️", chuva: "60%" },
    { dia: "Qui", max: 26, min: 19, condicao: "🌧️", chuva: "75%" },
    { dia: "Sex", max: 29, min: 20, condicao: "⛅", chuva: "30%" },
    { dia: "Sab", max: 31, min: 22, condicao: "☀️", chuva: "5%" },
    { dia: "Dom", max: 33, min: 23, condicao: "☀️", chuva: "0%" }
];

// ===== NAVEGAÇÃO ENTRE SEÇÕES =====
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        
        // Adiciona active ao clicado
        item.classList.add('active');
        const sectionId = item.dataset.section;
        document.getElementById(sectionId).classList.add('active');
    });
});

// ===== RENDERIZAR CULTURAS =====
function renderCulturas() {
    const grid = document.getElementById('culturasGrid');
    grid.innerHTML = '';
    
    culturas.forEach(cultura => {
        const statusClass = `status-${cultura.status}`;
        const statusTexto = {
            'em-crescimento': 'Em Crescimento',
            'pronto-colheita': 'Pronto para Colheita',
            'colhido': 'Colhido'
        };
        
        const card = document.createElement('div');
        card.className = 'cultura-card';
        card.innerHTML = `
            <div class="cultura-header">
                <div class="cultura-nome">${cultura.nome}</div>
                <div class="cultura-tipo">${cultura.tipo}</div>
            </div>
            <div class="cultura-body">
                <span class="status-badge ${statusClass}">${statusTexto[cultura.status]}</span>
                <div class="cultura-info">
                    <div class="cultura-field">
                        <label>Área</label>
                        <value>${cultura.area} ha</value>
                    </div>
                    <div class="cultura-field">
                        <label>Produção</label>
                        <value>${cultura.producao}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Data Plantio</label>
                        <value>${new Date(cultura.dataplantio).toLocaleDateString('pt-BR')}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Dias Plantada</label>
                        <value>${Math.floor((new Date() - new Date(cultura.dataplantio)) / (1000 * 60 * 60 * 24))} dias</value>
                    </div>
                </div>
                <div class="cultura-actions">
                    <button class="edit-btn" onclick="editarCultura(${cultura.id})">Editar</button>
                    <button class="delete-btn" onclick="deletarCultura(${cultura.id})">Deletar</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== RENDERIZAR ESTOQUE =====
function renderEstoque() {
    const tbody = document.getElementById('estoqueTableBody');
    tbody.innerHTML = '';
    
    estoque.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.produto}</strong></td>
            <td>${item.quantidade}</td>
            <td>${item.unidade}</td>
            <td>${item.localizacao}</td>
            <td>${item.ultimaAtualizacao}</td>
            <td>
                <button class="edit-btn" onclick="editarEstoque(${item.id})" style="padding: 6px 12px;">Editar</button>
                <button class="delete-btn" onclick="deletarEstoque(${item.id})" style="padding: 6px 12px;">Deletar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ===== RENDERIZAR PREVISÃO =====
function renderPrevisao() {
    const grid = document.getElementById('forecastGrid');
    grid.innerHTML = '';
    
    previsao.forEach(item => {
        const div = document.createElement('div');
        div.className = 'forecast-item';
        div.innerHTML = `
            <small>${item.dia}</small>
            <div class="icon">${item.condicao}</div>
            <div class="temp">${item.max}°/${item.min}°</div>
            <small>${item.chuva}</small>
        `;
        grid.appendChild(div);
    });
}

// ===== MODAL - ADICIONAR CULTURA =====
const modal = document.getElementById('culturaModal');
const addBtn = document.getElementById('addCulturaBtn');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('culturaForm');

addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    form.reset();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novaCultura = {
        id: culturas.length + 1,
        nome: document.getElementById('culturaNome').value,
        tipo: document.getElementById('culturaTipo').value,
        area: parseFloat(document.getElementById('culturaArea').value),
        dataplantio: document.getElementById('culturaData').value,
        status: document.getElementById('culturaStatus').value,
        producao: '0 ton'
    };
    
    culturas.push(novaCultura);
    renderCulturas();
    modal.style.display = 'none';
    showNotification('Cultura adicionada com sucesso!', 'success');
});

// ===== FUNÇÕES DE AÇÕES =====
function editarCultura(id) {
    showNotification('Editar cultura #' + id, 'info');
    // Implementar funcionalidade de edição
}

function deletarCultura(id) {
    if (confirm('Tem certeza que deseja deletar esta cultura?')) {
        culturas = culturas.filter(c => c.id !== id);
        renderCulturas();
        showNotification('Cultura deletada com sucesso!', 'success');
    }
}

function editarEstoque(id) {
    showNotification('Editar estoque #' + id, 'info');
}

function deletarEstoque(id) {
    if (confirm('Tem certeza que deseja deletar este item?')) {
        estoque = estoque.filter(e => e.id !== id);
        renderEstoque();
        showNotification('Item deletado com sucesso!', 'success');
    }
}

// ===== FILTROS =====
document.getElementById('searchCultura').addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = culturas.filter(c => 
        c.nome.toLowerCase().includes(termo) || 
        c.tipo.toLowerCase().includes(termo)
    );
    
    const grid = document.getElementById('culturasGrid');
    grid.innerHTML = '';
    
    if (filtrados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Nenhuma cultura encontrada</p>';
        return;
    }
    
    filtrados.forEach(cultura => {
        const statusClass = `status-${cultura.status}`;
        const statusTexto = {
            'em-crescimento': 'Em Crescimento',
            'pronto-colheita': 'Pronto para Colheita',
            'colhido': 'Colhido'
        };
        
        const card = document.createElement('div');
        card.className = 'cultura-card';
        card.innerHTML = `
            <div class="cultura-header">
                <div class="cultura-nome">${cultura.nome}</div>
                <div class="cultura-tipo">${cultura.tipo}</div>
            </div>
            <div class="cultura-body">
                <span class="status-badge ${statusClass}">${statusTexto[cultura.status]}</span>
                <div class="cultura-info">
                    <div class="cultura-field">
                        <label>Área</label>
                        <value>${cultura.area} ha</value>
                    </div>
                    <div class="cultura-field">
                        <label>Produção</label>
                        <value>${cultura.producao}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Data Plantio</label>
                        <value>${new Date(cultura.dataplantio).toLocaleDateString('pt-BR')}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Dias Plantada</label>
                        <value>${Math.floor((new Date() - new Date(cultura.dataplantio)) / (1000 * 60 * 60 * 24))} dias</value>
                    </div>
                </div>
                <div class="cultura-actions">
                    <button class="edit-btn" onclick="editarCultura(${cultura.id})">Editar</button>
                    <button class="delete-btn" onclick="deletarCultura(${cultura.id})">Deletar</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
});

document.getElementById('statusFilter').addEventListener('change', (e) => {
    const status = e.target.value;
    const grid = document.getElementById('culturasGrid');
    grid.innerHTML = '';
    
    const filtrados = status ? culturas.filter(c => c.status === status) : culturas;
    
    if (filtrados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Nenhuma cultura encontrada</p>';
        return;
    }
    
    filtrados.forEach(cultura => {
        const statusClass = `status-${cultura.status}`;
        const statusTexto = {
            'em-crescimento': 'Em Crescimento',
            'pronto-colheita': 'Pronto para Colheita',
            'colhido': 'Colhido'
        };
        
        const card = document.createElement('div');
        card.className = 'cultura-card';
        card.innerHTML = `
            <div class="cultura-header">
                <div class="cultura-nome">${cultura.nome}</div>
                <div class="cultura-tipo">${cultura.tipo}</div>
            </div>
            <div class="cultura-body">
                <span class="status-badge ${statusClass}">${statusTexto[cultura.status]}</span>
                <div class="cultura-info">
                    <div class="cultura-field">
                        <label>Área</label>
                        <value>${cultura.area} ha</value>
                    </div>
                    <div class="cultura-field">
                        <label>Produção</label>
                        <value>${cultura.producao}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Data Plantio</label>
                        <value>${new Date(cultura.dataplantio).toLocaleDateString('pt-BR')}</value>
                    </div>
                    <div class="cultura-field">
                        <label>Dias Plantada</label>
                        <value>${Math.floor((new Date() - new Date(cultura.dataplantio)) / (1000 * 60 * 60 * 24))} dias</value>
                    </div>
                </div>
                <div class="cultura-actions">
                    <button class="edit-btn" onclick="editarCultura(${cultura.id})">Editar</button>
                    <button class="delete-btn" onclick="deletarCultura(${cultura.id})">Deletar</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
});

// ===== CONFIGURAÇÕES =====
document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Configurações salvas com sucesso!', 'success');
});

// ===== RELATÓRIOS - GERAR =====
document.querySelectorAll('.report-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('Gerando relatório...', 'info');
        setTimeout(() => {
            showNotification('Relatório gerado com sucesso! PDF baixado.', 'success');
        }, 1500);
    });
});

// ===== NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMAÇÕES CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    renderCulturas();
    renderEstoque();
    renderPrevisao();
    inicializarGraficos();
    
    // Simular atualização de dados a cada 30 segundos
    setInterval(() => {
        // Aqui você poderia fazer uma chamada AJAX para atualizar dados
        console.log('Dados atualizados');
    }, 30000);
});
