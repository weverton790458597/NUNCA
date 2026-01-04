document.addEventListener('DOMContentLoaded', () => {
  // Recupera auth do localStorage
  const auth = JSON.parse(localStorage.getItem('auth'));

  // Se não estiver logado, volta para login
  if (!auth || !auth.logado) {
    window.location.replace('index.html');
    return;
  }

  // Marca última tela
  auth.ultimaTela = 'bem-vindo';
  localStorage.setItem('auth', JSON.stringify(auth));

  // Exibe nome no header
  const header = document.querySelector('.trade-header');
  if (header) {
    header.textContent = `Bem-vindo ao TradeWR, ${auth.nome || ''}`;
  }

  // Botão iniciar trade
  const iniciarTradeBtn = document.getElementById('iniciarTrade');
  if (iniciarTradeBtn) {
    iniciarTradeBtn.addEventListener('click', () => {
      window.location.href = 'sinais.html';
    });
  }
});
