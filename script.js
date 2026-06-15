function themeChange() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');

    themeToggle.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');

        if (temaAtual === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeLabel.textContent = '☀️ Light';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeLabel.textContent = '🌙 Dark';
        }
    });
}

function maskCNPJ(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 14);
  if (v.length > 12) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
  else if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
  else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
  else if (v.length > 2) v = v.replace(/(\d{2})(\d+)/, '$1.$2');
  input.value = v;
}

function update() {
  const cnpj     = document.getElementById('cnpj').value.trim();
  const razao    = document.getElementById('razao').value.trim();
  const nome     = document.getElementById('nome').value.trim() || '___________';
  const produtos = document.getElementById('nfe').checked || document.getElementById('nfce').checked;
  const nfse     = document.getElementById('nfse').checked;
  const cte      = document.getElementById('cte').checked;

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

themeChange();
// Inicializa eventos
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cnpj').addEventListener('input', function () { maskCNPJ(this); update(); });
  document.getElementById('razao').addEventListener('input', update);
  document.getElementById('nome').addEventListener('input', update);
  document.getElementById('nfe').addEventListener('change', update);
  document.getElementById('nfce').addEventListener('change', update);
  document.getElementById('nfse').addEventListener('change', update);
  document.getElementById('cte').addEventListener('change', update);
  document.getElementById('btn-copy').addEventListener('click', copyEmail);
});
