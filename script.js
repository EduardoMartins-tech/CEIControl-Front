// =============================================
// DARK MODE
// =============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const checkbox = document.getElementById('checkbox');
        if (checkbox) checkbox.checked = true;
    }

    // Inicializa validações conforme a página
    if (document.querySelector('form[action="login_user.php"]')) {
        iniciarValidacaoLogin();
    }

    if (document.querySelector('form[action="processa_cadastro.php"]')) {
        iniciarValidacaoCadastro();
    }
});


// =============================================
// UTILITÁRIOS
// =============================================
function mostrarErro(inputId, mensagem) {
    const input = document.getElementById(inputId);
    let erro = document.getElementById('erro-' + inputId);

    input.style.borderColor = '#e74c3c';

    if (!erro) {
        erro = document.createElement('small');
        erro.id = 'erro-' + inputId;
        erro.style.color = '#e74c3c';
        erro.style.display = 'block';
        erro.style.marginTop = '4px';
        erro.style.fontSize = '0.8rem';
        input.parentNode.appendChild(erro);
    }
    erro.textContent = mensagem;
}

function limparErro(inputId) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById('erro-' + inputId);
    input.style.borderColor = '';
    if (erro) erro.textContent = '';
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// =============================================
// VALIDAÇÃO DO LOGIN
// =============================================
function iniciarValidacaoLogin() {
    const form = document.querySelector('form[action="login_user.php"]');

    // Limpa erro ao digitar
    document.getElementById('email').addEventListener('input', () => limparErro('email'));
    document.getElementById('senha').addEventListener('input', () => limparErro('senha'));
    document.getElementById('perfil').addEventListener('change', () => limparErro('perfil'));

    form.addEventListener('submit', function (e) {
        let valido = true;

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const perfil = document.getElementById('perfil').value;

        if (!email) {
            mostrarErro('email', 'O e-mail é obrigatório.');
            valido = false;
        } else if (!validarEmail(email)) {
            mostrarErro('email', 'Digite um e-mail válido (ex: nome@email.com).');
            valido = false;
        } else {
            limparErro('email');
        }

        if (!senha) {
            mostrarErro('senha', 'A senha é obrigatória.');
            valido = false;
        } else if (senha.length < 6) {
            mostrarErro('senha', 'A senha deve ter pelo menos 6 caracteres.');
            valido = false;
        } else {
            limparErro('senha');
        }

        if (!perfil) {
            mostrarErro('perfil', 'Selecione um perfil de acesso.');
            valido = false;
        } else {
            limparErro('perfil');
        }

        if (!valido) e.preventDefault();
    });
}


// =============================================
// VALIDAÇÃO DO CADASTRO DE USUÁRIO
// =============================================
function iniciarValidacaoCadastro() {
    const form = document.querySelector('form[action="processa_cadastro.php"]');

    document.getElementById('nome').addEventListener('input', () => limparErro('nome'));
    document.getElementById('email').addEventListener('input', () => limparErro('email'));
    document.getElementById('senha').addEventListener('input', () => limparErro('senha'));

    form.addEventListener('submit', function (e) {
        let valido = true;

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        // Validação do nome
        if (!nome) {
            mostrarErro('nome', 'O nome completo é obrigatório.');
            valido = false;
        } else if (nome.length < 3) {
            mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres.');
            valido = false;
        } else {
            limparErro('nome');
        }

        // Validação do e-mail
        if (!email) {
            mostrarErro('email', 'O e-mail é obrigatório.');
            valido = false;
        } else if (!validarEmail(email)) {
            mostrarErro('email', 'Digite um e-mail válido (ex: nome@email.com).');
            valido = false;
        } else {
            limparErro('email');
        }

        // Validação da senha
        if (!senha) {
            mostrarErro('senha', 'A senha é obrigatória.');
            valido = false;
        } else if (senha.length < 6) {
            mostrarErro('senha', 'A senha deve ter pelo menos 6 caracteres.');
            valido = false;
        } else if (!/[A-Z]/.test(senha)) {
            mostrarErro('senha', 'A senha deve ter pelo menos uma letra maiúscula.');
            valido = false;
        } else if (!/[0-9]/.test(senha)) {
            mostrarErro('senha', 'A senha deve ter pelo menos um número.');
            valido = false;
        } else {
            limparErro('senha');
        }

        if (!valido) e.preventDefault();
    });
}

// =============================================
// SIDEBAR MOBILE — HAMBURGUER
// =============================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}
 
