const nome = prompt('Digite seu nome completo:');
const resultado = document.getElementById('resultado');

resultado.innerHTML += `<p class="resultado"><strong>Seu nome é:</strong> ${nome}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>O total de letras do seu nome é:</strong> ${nome.replace(/\s/g, '').length}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Primeira letra do seu nome:</strong> ${nome.charAt(0)}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Última letra do seu nome:</strong>${nome.slice(-1)}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Primeiro índice da letra 'a':</strong>${nome.toLowerCase().indexOf('a')}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Último índice da letra 'a':</strong>${nome.toLowerCase().lastIndexOf('a')}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Últimas três letras do seu nome:</strong>${nome.slice(-3)}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Nome com as lentras em maiúsculo:</strong>${nome.toUpperCase()}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Nome com as lentras em minúsculo:</strong>${nome.toLowerCase()}</p>`;
resultado.innerHTML += `<p class="resultado"><strong>Nome separado por vírgula (,):</strong>${nome.split(' ')}</p>`;