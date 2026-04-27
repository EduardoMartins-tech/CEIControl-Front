// ============================================================
//  DASHBOARD.JS — CEIControl (Versão Front-End Estática)
//  CRUD simulado com dados em memória (arrays JS)
// ============================================================

// ============================================================
// LOGIN SIMULADO
// ============================================================
const USUARIOS_LOGIN = [
    { email: 'admin@cei.com',   senha: '12345', perfil: 'admin',   nome: 'Eduardo Admin'        },
    { email: 'cliente@cei.com', senha: '12345', perfil: 'cliente', nome: 'Fernanda Responsável'  },
    { email: 'usuario@cei.com', senha: '12345', perfil: 'usuario', nome: 'João Educador'         },
];

function fazerLogin() {
    const email  = document.getElementById('email').value.trim();
    const senha  = document.getElementById('senha').value.trim();
    const perfil = document.getElementById('perfil').value;
    const erro   = document.getElementById('erro-login');

    if (!email || !senha || !perfil) {
        erro.style.display = 'block';
        erro.textContent   = 'Preencha todos os campos.';
        return;
    }

    const usuario = USUARIOS_LOGIN.find(u => u.email === email && u.senha === senha && u.perfil === perfil);

    if (usuario) {
        sessionStorage.setItem('logado', JSON.stringify(usuario));
        // Redireciona para o painel correto conforme o perfil
        if (perfil === 'admin')   window.location.href = 'dashboard.html';
        if (perfil === 'usuario') window.location.href = 'dashboard_usuario.html';
        if (perfil === 'cliente') window.location.href = 'dashboard_cliente.html';
    } else {
        erro.style.display = 'block';
        erro.textContent   = 'E-mail, senha ou perfil inválidos.';
    }
}

// ============================================================
// DADOS INICIAIS SIMULADOS (compartilhados entre painéis)
// ============================================================
let usuarios = [
    { id: 1, nome: 'Eduardo Admin',        email: 'admin@cei.com',    perfil: 'admin'   },
    { id: 2, nome: 'Fernanda Responsável', email: 'cliente@cei.com',  perfil: 'cliente' },
    { id: 3, nome: 'João Educador',        email: 'usuario@cei.com',  perfil: 'usuario' },
];

let produtos = [
    { id: 1, nome: 'Resma Papel A4',      preco: 25.90, quantidade: 40  },
    { id: 2, nome: 'Kit Estojo Colorido', preco: 15.00, quantidade: 100 },
];

let fornecedores = [
    { id: 1, nome: 'Distribuidora Escolar S.A.', cnpj: '12.345.678/0001-99', email: 'contato@distribuidora.com', telefone: '(11) 4002-8922' },
    { id: 2, nome: 'Manutenção Express',         cnpj: '98.765.432/0001-00', email: 'suporte@mantenex.com',      telefone: '(11) 99999-8888' },
];

let agenda = [
    { id: 1, titulo: 'Reunião de Planejamento', data: '2026-05-20', local: 'Sala dos Professores', publico: 'Funcionários' },
    { id: 2, titulo: 'Festa Junina CEI',         data: '2026-06-15', local: 'Pátio Principal',       publico: 'Geral'        },
];

let proximoId = { usuario: 4, produto: 3, fornecedor: 3, evento: 3 };
let editandoId = null;
let tipoAtual  = null;

// ============================================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ============================================================
function mostrarSecao(nome) {
    document.querySelectorAll('.dash-secao').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));

    const secao = document.getElementById('secao-' + nome);
    if (secao) secao.style.display = 'flex';

    const nav = document.getElementById('nav-' + nome);
    if (nav) nav.classList.add('active');

    // Fechar sidebar mobile ao navegar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    renderizar(nome);
}

// ============================================================
// RENDERIZAÇÃO DAS TABELAS
// ============================================================
function renderizar(nome) {
    if (nome === 'usuarios')     renderUsuarios();
    if (nome === 'produtos')     renderProdutos();
    if (nome === 'fornecedores') renderFornecedores();
    if (nome === 'agenda')       renderAgenda();
    if (nome === 'materiais')    renderMateriais();
}

function badgePerfil(perfil) {
    const labels = { admin: 'Gestor Escolar', cliente: 'Responsável', usuario: 'Educador' };
    return `<span class="badge badge-${perfil}">${labels[perfil] || perfil}</span>`;
}

function botoesAcao(tipo, id) {
    return `
        <td class="actions-cell">
            <a href="#" onclick="editarItem('${tipo}',${id})" class="edit-btn" title="Editar"><i class="fa-solid fa-pen-to-square"></i></a>
            <a href="#" onclick="excluirItem('${tipo}',${id})" class="delete-btn" title="Excluir"><i class="fa-solid fa-trash"></i></a>
        </td>`;
}

function renderUsuarios() {
    const tbody = document.getElementById('tabela-usuarios');
    if (!tbody) return;
    tbody.innerHTML = usuarios.map(u => `
        <tr>
            <td>#${u.id}</td>
            <td><strong>${u.nome}</strong></td>
            <td>${u.email}</td>
            <td>${badgePerfil(u.perfil)}</td>
            ${botoesAcao('usuario', u.id)}
        </tr>`).join('');
}

function renderProdutos() {
    const tbody = document.getElementById('tabela-produtos');
    if (!tbody) return;
    tbody.innerHTML = produtos.map(p => `
        <tr>
            <td>${p.nome}</td>
            <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
            <td>${p.quantidade}</td>
            <td><strong>R$ ${(p.preco * p.quantidade).toFixed(2).replace('.', ',')}</strong></td>
            ${botoesAcao('produto', p.id)}
        </tr>`).join('');
}

function renderFornecedores() {
    const tbody = document.getElementById('tabela-fornecedores');
    if (!tbody) return;
    tbody.innerHTML = fornecedores.map(f => `
        <tr>
            <td><strong>${f.nome}</strong></td>
            <td>${f.cnpj}</td>
            <td>${f.email}</td>
            <td>${f.telefone}</td>
            ${botoesAcao('fornecedor', f.id)}
        </tr>`).join('');
}

function renderAgenda() {
    // Admin
    const tbody = document.getElementById('tabela-agenda');
    if (tbody) {
        tbody.innerHTML = agenda.map(e => `
            <tr>
                <td>${formatarData(e.data)}</td>
                <td><strong>${e.titulo}</strong></td>
                <td>${e.local}</td>
                <td><span class="badge badge-admin">${e.publico}</span></td>
                ${botoesAcao('evento', e.id)}
            </tr>`).join('');
    }

    // Educador
    const tbodyU = document.getElementById('tabela-agenda-usuario');
    if (tbodyU) {
        tbodyU.innerHTML = agenda.map(e => `
            <tr>
                <td>${formatarData(e.data)}</td>
                <td><strong>${e.titulo}</strong></td>
                <td>${e.local}</td>
                <td><span class="badge badge-admin">${e.publico}</span></td>
            </tr>`).join('');
    }

    // Cliente
    const tbodyC = document.getElementById('tabela-agenda-cliente');
    if (tbodyC) {
        tbodyC.innerHTML = agenda.map(e => `
            <tr>
                <td>${formatarData(e.data)}</td>
                <td><strong>${e.titulo}</strong></td>
                <td>${e.local}</td>
                <td><span class="badge badge-admin">${e.publico}</span></td>
            </tr>`).join('');
    }
}

function renderMateriais() {
    const tbody = document.getElementById('tabela-materiais');
    if (!tbody) return;
    tbody.innerHTML = produtos.map(p => `
        <tr>
            <td>${p.nome}</td>
            <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
            <td>${p.quantidade}</td>
            <td><strong>R$ ${(p.preco * p.quantidade).toFixed(2).replace('.', ',')}</strong></td>
        </tr>`).join('');
}

function formatarData(data) {
    const [y, m, d] = data.split('-');
    return `${d}/${m}/${y}`;
}

// ============================================================
// MODAL — ABRIR / FECHAR
// ============================================================
function abrirModal(tipo, id = null) {
    tipoAtual  = tipo;
    editandoId = id;

    const modal   = document.getElementById('modal');
    const overlay = document.getElementById('modal-overlay');
    const titulo  = document.getElementById('modal-titulo');
    const body    = document.getElementById('modal-body');

    titulo.textContent = (id ? 'Editar' : 'Cadastrar') + ' ' + labelTipo(tipo);
    body.innerHTML     = gerarFormulario(tipo, id);

    modal.style.display   = 'block';
    overlay.style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal').style.display        = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    editandoId = null;
    tipoAtual  = null;
}

function labelTipo(tipo) {
    return { usuario: 'Usuário', produto: 'Produto', fornecedor: 'Fornecedor', evento: 'Evento' }[tipo] || tipo;
}

// ============================================================
// GERAR FORMULÁRIOS
// ============================================================
function gerarFormulario(tipo, id) {
    let dados = null;
    if (id) {
        if (tipo === 'usuario')    dados = usuarios.find(u => u.id === id);
        if (tipo === 'produto')    dados = produtos.find(p => p.id === id);
        if (tipo === 'fornecedor') dados = fornecedores.find(f => f.id === id);
        if (tipo === 'evento')     dados = agenda.find(e => e.id === id);
    }
    const v = dados || {};

    const forms = {
        usuario: `
            <div class="form-group">
                <label>Nome Completo *</label>
                <input id="f-nome" type="text" value="${v.nome||''}" placeholder="Nome completo" required>
            </div>
            <div class="form-group">
                <label>E-mail *</label>
                <input id="f-email" type="email" value="${v.email||''}" placeholder="email@exemplo.com" required>
            </div>
            ${!id ? `<div class="form-group">
                <label>Senha *</label>
                <input id="f-senha" type="password" placeholder="Mínimo 6 caracteres" required>
            </div>` : ''}
            <div class="form-group">
                <label>Perfil de Acesso *</label>
                <select id="f-perfil">
                    <option value="admin"   ${v.perfil==='admin'   ?'selected':''}>Gestor Escolar (Admin)</option>
                    <option value="cliente" ${v.perfil==='cliente' ?'selected':''}>Responsável (Cliente)</option>
                    <option value="usuario" ${v.perfil==='usuario' ?'selected':''}>Educador (Usuário)</option>
                </select>
            </div>`,

        produto: `
            <div class="form-group">
                <label>Nome do Produto *</label>
                <input id="f-nome" type="text" value="${v.nome||''}" placeholder="Ex: Resma Papel A4" required>
            </div>
            <div class="form-group">
                <label>Preço Unitário (R$) *</label>
                <input id="f-preco" type="number" step="0.01" min="0" value="${v.preco||''}" placeholder="0,00" required>
            </div>
            <div class="form-group">
                <label>Quantidade em Estoque *</label>
                <input id="f-quantidade" type="number" min="0" value="${v.quantidade||''}" placeholder="0" required>
            </div>`,

        fornecedor: `
            <div class="form-group">
                <label>Nome da Empresa *</label>
                <input id="f-nome" type="text" value="${v.nome||''}" placeholder="Razão social" required>
            </div>
            <div class="form-group">
                <label>CNPJ *</label>
                <input id="f-cnpj" type="text" value="${v.cnpj||''}" placeholder="00.000.000/0001-00" required>
            </div>
            <div class="form-group">
                <label>E-mail</label>
                <input id="f-email" type="email" value="${v.email||''}" placeholder="contato@empresa.com">
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input id="f-telefone" type="text" value="${v.telefone||''}" placeholder="(11) 00000-0000">
            </div>`,

        evento: `
            <div class="form-group">
                <label>Título do Evento *</label>
                <input id="f-titulo" type="text" value="${v.titulo||''}" placeholder="Ex: Festa Junina" required>
            </div>
            <div class="form-group">
                <label>Data *</label>
                <input id="f-data" type="date" value="${v.data||''}" required>
            </div>
            <div class="form-group">
                <label>Local</label>
                <input id="f-local" type="text" value="${v.local||''}" placeholder="Ex: Pátio Principal">
            </div>
            <div class="form-group">
                <label>Público-Alvo</label>
                <select id="f-publico">
                    <option value="Geral"       ${v.publico==='Geral'       ?'selected':''}>Geral (Todos)</option>
                    <option value="Pais"         ${v.publico==='Pais'        ?'selected':''}>Pais/Responsáveis</option>
                    <option value="Funcionários" ${v.publico==='Funcionários'?'selected':''}>Apenas Funcionários</option>
                </select>
            </div>`,
    };

    return `
        <div id="modal-alerta" class="modal-alert"></div>
        ${forms[tipo] || ''}
        <div class="modal-actions">
            <button class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
            <button class="btn-salvar" onclick="salvarItem()">
                <i class="fa-solid fa-check"></i> ${id ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
        </div>`;
}

// ============================================================
// SALVAR (CREATE / UPDATE)
// ============================================================
function salvarItem() {
    const tipo = tipoAtual;
    const id   = editandoId;

    const nomeInput = document.getElementById('f-nome') || document.getElementById('f-titulo');
    if (nomeInput && !nomeInput.value.trim()) {
        mostrarAlertaModal('Preencha os campos obrigatórios.', 'error');
        return;
    }

    if (tipo === 'usuario') {
        const email = document.getElementById('f-email').value.trim();
        if (!validarEmailDash(email)) {
            mostrarAlertaModal('Digite um e-mail válido.', 'error');
            return;
        }
        const emailExiste = usuarios.find(u => u.email === email && u.id !== id);
        if (emailExiste) {
            mostrarAlertaModal('Este e-mail já está cadastrado.', 'error');
            return;
        }
        if (!id) {
            const senha = document.getElementById('f-senha').value;
            if (senha.length < 6) {
                mostrarAlertaModal('A senha deve ter ao menos 6 caracteres.', 'error');
                return;
            }
        }
    }

    if (id) {
        atualizar(tipo, id);
    } else {
        criar(tipo);
    }

    fecharModal();
    const secaoMap = { usuario: 'usuarios', produto: 'produtos', fornecedor: 'fornecedores', evento: 'agenda' };
    renderizar(secaoMap[tipo]);
}

function criar(tipo) {
    if (tipo === 'usuario') {
        usuarios.push({ id: proximoId.usuario++, nome: document.getElementById('f-nome').value.trim(), email: document.getElementById('f-email').value.trim(), perfil: document.getElementById('f-perfil').value });
    } else if (tipo === 'produto') {
        produtos.push({ id: proximoId.produto++, nome: document.getElementById('f-nome').value.trim(), preco: parseFloat(document.getElementById('f-preco').value), quantidade: parseInt(document.getElementById('f-quantidade').value) });
    } else if (tipo === 'fornecedor') {
        fornecedores.push({ id: proximoId.fornecedor++, nome: document.getElementById('f-nome').value.trim(), cnpj: document.getElementById('f-cnpj').value.trim(), email: document.getElementById('f-email').value.trim(), telefone: document.getElementById('f-telefone').value.trim() });
    } else if (tipo === 'evento') {
        agenda.push({ id: proximoId.evento++, titulo: document.getElementById('f-titulo').value.trim(), data: document.getElementById('f-data').value, local: document.getElementById('f-local').value.trim(), publico: document.getElementById('f-publico').value });
    }
}

function atualizar(tipo, id) {
    if (tipo === 'usuario') {
        const u = usuarios.find(u => u.id === id);
        u.nome = document.getElementById('f-nome').value.trim();
        u.email = document.getElementById('f-email').value.trim();
        u.perfil = document.getElementById('f-perfil').value;
    } else if (tipo === 'produto') {
        const p = produtos.find(p => p.id === id);
        p.nome = document.getElementById('f-nome').value.trim();
        p.preco = parseFloat(document.getElementById('f-preco').value);
        p.quantidade = parseInt(document.getElementById('f-quantidade').value);
    } else if (tipo === 'fornecedor') {
        const f = fornecedores.find(f => f.id === id);
        f.nome = document.getElementById('f-nome').value.trim();
        f.cnpj = document.getElementById('f-cnpj').value.trim();
        f.email = document.getElementById('f-email').value.trim();
        f.telefone = document.getElementById('f-telefone').value.trim();
    } else if (tipo === 'evento') {
        const e = agenda.find(e => e.id === id);
        e.titulo = document.getElementById('f-titulo').value.trim();
        e.data = document.getElementById('f-data').value;
        e.local = document.getElementById('f-local').value.trim();
        e.publico = document.getElementById('f-publico').value;
    }
}

function editarItem(tipo, id) { abrirModal(tipo, id); }

function excluirItem(tipo, id) {
    const labels = { usuario: 'este usuário', produto: 'este produto', fornecedor: 'este fornecedor', evento: 'este evento' };
    if (!confirm(`Tem certeza que deseja excluir ${labels[tipo]}?`)) return;
    if (tipo === 'usuario')    usuarios     = usuarios.filter(u => u.id !== id);
    if (tipo === 'produto')    produtos     = produtos.filter(p => p.id !== id);
    if (tipo === 'fornecedor') fornecedores = fornecedores.filter(f => f.id !== id);
    if (tipo === 'evento')     agenda       = agenda.filter(e => e.id !== id);
    const secaoMap = { usuario: 'usuarios', produto: 'produtos', fornecedor: 'fornecedores', evento: 'agenda' };
    renderizar(secaoMap[tipo]);
}

// ============================================================
// CHAT SIMULADO
// ============================================================
function selecionarContato(nome, el) {
    document.getElementById('chat-contato-nome').textContent = nome;
    document.querySelectorAll('.contact-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
    const msgs = document.getElementById('chat-messages');
    msgs.innerHTML = `
        <div class="message received"><p>Olá! Sou ${nome}. Como posso ajudar?</p></div>
        <div class="message sent"><p>Oi! Tudo bem?</p></div>`;
}

function enviarMensagem() {
    const input = document.getElementById('chat-input');
    const texto = input.value.trim();
    if (!texto) return;
    const msgs = document.getElementById('chat-messages');
    const div  = document.createElement('div');
    div.className = 'message sent';
    div.innerHTML = `<p>${texto}</p>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';
    setTimeout(() => {
        const resp = document.createElement('div');
        resp.className = 'message received';
        resp.innerHTML = `<p>Mensagem recebida! Vou verificar e te retorno em breve.</p>`;
        msgs.appendChild(resp);
        msgs.scrollTop = msgs.scrollHeight;
    }, 800);
}

// ============================================================
// UTILITÁRIOS
// ============================================================
function validarEmailDash(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mostrarAlertaModal(msg, tipo) {
    const el = document.getElementById('modal-alerta');
    el.textContent = msg;
    el.className   = 'modal-alert ' + tipo;
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
    // Dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const checkbox = document.getElementById('checkbox');
        if (checkbox) checkbox.checked = true;
    }

    // Renderiza seção inicial se estiver em algum dashboard
    if (document.getElementById('secao-dashboard')) {
        mostrarSecao('dashboard');

        // Próximo evento no painel do cliente
        const proximoEl = document.getElementById('proximo-evento-texto');
        if (proximoEl && agenda.length > 0) {
            const proximo = agenda.sort((a, b) => new Date(a.data) - new Date(b.data))[0];
            proximoEl.textContent = `${proximo.titulo} — ${formatarData(proximo.data)} em ${proximo.local}`;
        }
    }
});