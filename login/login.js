// 🔐 Força login apenas quando acessar o /login diretamente
if (performance.getEntriesByType('navigation')[0].type === 'navigate') {
  sessionStorage.removeItem('auth');
}


const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const entrarBtn = document.getElementById('entrar');
const erro = document.getElementById('erro');
const toggleSenha = document.getElementById('toggleSenha');

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbx33kwB_uKur1d12uVrWrBPkcEM8m9-NhgL6RTzso9TPGb5wsHWV7S9OrfkAxeiAnnz0g/exec";


// =====================================
// 🚀 FUNÇÃO DE LOGIN
// =====================================
function validarLogin() {
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  erro.textContent = '';

  if (!email || !senha) {
    erro.textContent = 'Preencha e-mail e senha';
    return;
  }

  const url = `${SHEET_API_URL}?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
  console.log('Chamando:', url);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log('Resposta AppScript:', data);

      if (data?.success) {
      sessionStorage.setItem('auth', JSON.stringify({
  logado: true,
  email,
  nome: data.nome || ''
}));


        window.location.href = '/conta/';

      } else {
        erro.textContent = 'E-mail ou senha inválidos';
      }
    })
    .catch(err => {
      console.error('Erro fetch ->', err);
      erro.textContent = 'Erro ao validar login';
    });
}

// =====================================
// 🎯 LISTENERS
// =====================================
entrarBtn.addEventListener('click', validarLogin);

emailInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') senhaInput.focus();
});

senhaInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') validarLogin();
});

toggleSenha.addEventListener('click', () => {
  senhaInput.type = senhaInput.type === 'password' ? 'text' : 'password';
});
