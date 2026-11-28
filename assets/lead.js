/* Formulário de contato da Amaral Gama.
   ENDPOINT: cole aqui o endereço do Apps Script publicado (termina em /exec).
   Enquanto estiver vazio, o formulário abre o WhatsApp com a mensagem já montada. */
(function(){
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxXij_o4hRrxjwWDUIhMcgwtn84VgkWBZvsIoFZvYqC_lMbg9oBsDIwF7TxJfO_GSDe/exec';
  var WA = '5521971707910';
  var AVISO = 'v1-2026-11-27';

  function utm(){
    var q = new URLSearchParams(location.search), out = [];
    ['utm_source','utm_medium','utm_campaign'].forEach(function(k){ if(q.get(k)) out.push(k.replace('utm_','') + '=' + q.get(k)); });
    return out.join(' · ');
  }

  document.querySelectorAll('form.lead-form').forEach(function(f){
    var msg = f.querySelector('.lead-msg'), btn = f.querySelector('button[type=submit]');
    var relato = f.querySelector('[name=relato]'), cont = f.querySelector('.lead-cont');
    if(relato && cont){ relato.addEventListener('input', function(){ cont.textContent = relato.value.length + '/600'; }); }

    f.addEventListener('submit', function(e){
      e.preventDefault();
      if(f.website && f.website.value){ return; }          // armadilha para robôs
      if(!f.reportValidity()){ return; }
      var d = {
        origem: location.pathname.replace(/^\//,'') || 'index',
        campanha: utm(),
        servico: f.servico.value,
        nome: f.nome.value.trim(),
        whatsapp: f.whatsapp.value.trim(),
        email: f.email.value.trim(),
        cidade: f.cidade.value.trim(),
        outra_parte: f.outra_parte.value.trim(),
        relato: f.relato.value.trim(),
        preferencia: f.preferencia.value,
        consentimento: f.consentimento.checked ? 'sim' : 'não',
        aviso: AVISO
      };
      var texto = 'Olá! Vim pelo site da Amaral Gama.\n' +
        'Assunto: ' + d.servico + '\nNome: ' + d.nome + (d.cidade ? '\nCidade: ' + d.cidade : '') +
        (d.relato ? '\n\n' + d.relato : '');
      var waUrl = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto);

      if(!ENDPOINT){ window.open(waUrl, '_blank', 'noopener'); return; }

      btn.disabled = true; btn.textContent = 'Enviando…';
      var body = new URLSearchParams(d);
      fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
        .then(function(){
          f.classList.add('lead-ok');
          msg.innerHTML = '<strong>Recebemos o seu contato.</strong> Respondemos pelo canal que você escolheu, no horário de atendimento. Se preferir falar agora, <a href="' + waUrl + '" target="_blank" rel="noopener">abra o WhatsApp</a>.';
          msg.hidden = false; f.reset();
        })
        .catch(function(){
          msg.innerHTML = 'Não conseguimos enviar agora. <a href="' + waUrl + '" target="_blank" rel="noopener">Continue pelo WhatsApp</a>, com a mesma mensagem.';
          msg.hidden = false;
        })
        .then(function(){ btn.disabled = false; btn.textContent = 'Enviar'; });
    });
  });
})();
