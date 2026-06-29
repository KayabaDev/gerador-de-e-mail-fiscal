// ── Tema ──────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const label = document.getElementById('theme-label');
  label.textContent = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── CNPJ mask (alfanumérico) ──────────────────────
// Formato: XX.XXX.XXX/XXXX-DD
// - Posições 1–12: letras maiúsculas ou dígitos
// - Posições 13–14: apenas dígitos (verificadores)
function maskCNPJ(input) {
  const raw = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 14);
  const base  = raw.substring(0, 12);  // alfanumérico
  const check = raw.substring(12, 14).replace(/\D/g, ''); // só dígitos

  const full = base + check;
  let v = '';

  if (full.length > 12) {
    v = `${full.substring(0,2)}.${full.substring(2,5)}.${full.substring(5,8)}/${full.substring(8,12)}-${full.substring(12)}`;
  } else if (full.length > 8) {
    v = `${full.substring(0,2)}.${full.substring(2,5)}.${full.substring(5,8)}/${full.substring(8)}`;
  } else if (full.length > 5) {
    v = `${full.substring(0,2)}.${full.substring(2,5)}.${full.substring(5)}`;
  } else if (full.length > 2) {
    v = `${full.substring(0,2)}.${full.substring(2)}`;
  } else {
    v = full;
  }

  input.value = v;
}

// ── Persistência de assinatura ────────────────────
function salvarDados(nome, cargo, telefone, email) {
  localStorage.setItem('nome', nome);
  localStorage.setItem('cargo', cargo);
  localStorage.setItem('telefone', telefone);
  localStorage.setItem('email', email);
}

function carregarDados() {
  document.getElementById('nome').value     = localStorage.getItem('nome')     || '';
  document.getElementById('cargo').value    = localStorage.getItem('cargo')    || '';
  document.getElementById('telefone').value = localStorage.getItem('telefone') || '';
  document.getElementById('email').value    = localStorage.getItem('email')    || '';
}

// ── Gerador de e-mail ─────────────────────────────
function update() {
  const cnpj      = document.getElementById('cnpj').value.trim();
  const razao     = document.getElementById('razao').value.trim();
  const nomeValor = document.getElementById('nome').value.trim();
  const nome      = nomeValor || '___________';
  const cargo     = document.getElementById('cargo').value.trim();
  const telefone  = document.getElementById('telefone').value.trim();
  const email     = document.getElementById('email').value.trim();
  const produtos  = document.getElementById('nfe').checked || document.getElementById('nfce').checked;
  const nfse      = document.getElementById('nfse').checked;
  const cte       = document.getElementById('cte').checked;

  salvarDados(nomeValor, cargo, telefone, email);

  const out = document.getElementById('email-output');
  const btn = document.getElementById('btn-copy');

  if (!cnpj && !razao && !produtos && !nfse && !cte) {
    out.innerHTML = '<span class="empty-msg">Preencha os campos acima para gerar o e-mail.</span>';
    btn.classList.remove('visible');
    return;
  }

  const empresa = razao ? ` da empresa ${razao}` : '';
  const cnpjStr = cnpj  ? ` (CNPJ: ${cnpj})` : '';

  let corpo = 'Bom dia, contador(a) responsável,\n\n';
  corpo += `Por meio deste e-mail, solicito o apoio referente à configuração fiscal${empresa}${cnpjStr}.\n\n`;

  if (produtos) {
    corpo += `Solicito o preenchimento do anexo "Escopo Fiscal Produtos.xlsx".\n\n`;
  }
  if (nfse) {
    corpo += `Informo ainda que o cliente realizará emissões de Nota Fiscal de Serviço. Solicito, portanto, o preenchimento do anexo "Escopo Fiscal Serviço.xlsx".\n\n`;
  }
  if (cte) {
    corpo += `Informo também que o cliente realizará emissões de Conhecimento de Transporte Eletrônico (CT-e). Solicito o preenchimento do anexo "Escopo Fiscal CTE.xlsx".\n\n`;
  }

  corpo += 'Adicionalmente, peço o envio do certificado digital e respectiva senha para inclusão no sistema destinado às emissões fiscais.\n\n';
  corpo += 'Em caso de dúvidas durante o preenchimento, por gentileza entre em contato pelo número: +55 65 9 9284-2660.\n\n';
  corpo += `Atenciosamente,\n${nome}`;

  out.innerText = corpo;
  btn.classList.add('visible');
}

function copyEmail() {
  const text = document.getElementById('email-output').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    btn.textContent = '✅ Copiado!';
    setTimeout(() => { btn.textContent = '📋 Copiar e-mail'; }, 2000);
  });
}

// ── Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  carregarDados();

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('cnpj').addEventListener('input', function () { maskCNPJ(this); update(); });
  document.getElementById('razao').addEventListener('input', update);
  document.getElementById('nome').addEventListener('input', update);
  document.getElementById('cargo').addEventListener('input', update);
  document.getElementById('telefone').addEventListener('input', update);
  document.getElementById('email').addEventListener('input', update);
  document.getElementById('nfe').addEventListener('change', update);
  document.getElementById('nfce').addEventListener('change', update);
  document.getElementById('nfse').addEventListener('change', update);
  document.getElementById('cte').addEventListener('change', update);
  document.getElementById('btn-copy').addEventListener('click', copyEmail);
});
