document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  const inputs = document.querySelectorAll('.heart-box input');

  let lastCombination = ''; // Guarda a última combinação usada

  // Função para remover resultado
  function removeResult() {
    const existingResult = document.getElementById('result');
    if (existingResult) {
      existingResult.remove();
    }
  }

  // Clique nas caixas apaga resultado
  inputs.forEach(input => {
    input.addEventListener('focus', removeResult);
  });

  // Função para gerar valor final
  function getFinalPercentage(names) {
    // Regra especial
    if (names.includes('mariah') && names.includes('joao')) {
      return 100;
    }
    return Math.floor(Math.random() * 100) + 1;
  }

  // Clique no botão calcula
  button.addEventListener('click', () => {
    // Pega nomes e normaliza
    const names = Array.from(inputs).map(input => input.value.trim().toLowerCase());

    // Verifica campos vazios
    if (names.some(name => name === '')) {
      alert('Por favor, preencha ambos os nomes!');
      return;
    }

    // Ordena os nomes para tratar combinações iguais independente da ordem
    const combinationKey = names.sort().join('+');

    // Verifica se é a mesma combinação que a última
    if (combinationKey === lastCombination) {
      alert('Você não pode repetir a mesma combinação imediatamente!');
      return;
    }

    // Atualiza a última combinação
    lastCombination = combinationKey;

    // Remove resultado anterior
    removeResult();

    // Cria elemento de resultado
    const result = document.createElement('div');
    result.id = 'result';
    document.body.appendChild(result);

    Object.assign(result.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '100px',
      fontFamily: "'Press Start 2P', cursive",
      color: '#b3003b',
      textShadow: '3px 3px #ffb6c1',
      backgroundColor: 'rgba(255,230,230,0.9)',
      padding: '20px 40px',
      borderRadius: '20px',
      textAlign: 'center',
      zIndex: '1000'
    });

    // Animação de suspense
    const animationDuration = 1500; // 1.5 segundos
    const intervalTime = 50;
    let elapsed = 0;

    const animation = setInterval(() => {
      result.textContent = `${Math.floor(Math.random() * 100) + 1}%`;
      elapsed += intervalTime;
      if (elapsed >= animationDuration) {
        clearInterval(animation);
        result.textContent = `${getFinalPercentage(names)}%`;
      }
    }, intervalTime);
  });
});
