document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  console.log(hamburger);
  const navLinks = document.querySelector('.nav-links');

  // Toggle menu
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
  });

  // Fechar menu ao clicar nos links
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
      });
  });
});

// Ícones customizados para o mapa
const icons = {
    calor: L.icon({ iconUrl: 'imagens/calor.svg', iconSize: [30,30], iconAnchor: [15,30] }),
    terremoto: L.icon({ iconUrl: 'imagens/terremoto.svg', iconSize: [30,30], iconAnchor: [15,30] }),
    enchente: L.icon({ iconUrl: 'imagens/enchente.svg', iconSize: [30,30], iconAnchor: [15,30] }),
    outro: L.icon({ iconUrl: 'imagens/outro.svg', iconSize: [30,30], iconAnchor: [15,30] }),
  };
  
  // Áreas de risco (simulação)
  const areasRisco = [
    { tipo: "calor", desc: "Zona com onda de calor frequente", lat: -23.55, lng: -46.64 },
    { tipo: "terremoto", desc: "Área com histórico sísmico", lat: -23.49, lng: -46.62 },
    { tipo: "enchente", desc: "Região sujeita a enchentes", lat: -23.58, lng: -46.66 }
  ];
  
  let ocorrencias = [];
  let markers = [];
  
  const map = L.map('mapa').setView([-23.55, -46.63], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Dados do mapa © OpenStreetMap contributors'
  }).addTo(map);
  
  // Áreas de risco fixas
  areasRisco.forEach(ar => {
    L.marker([ar.lat, ar.lng], { icon: icons[ar.tipo] })
      .addTo(map)
      .bindPopup(`<b>Área de risco (${ar.tipo})</b><br>${ar.desc}`);
  });
  
  // Marca localização ao clicar no mapa para novo registro
  map.on('click', function(e) {
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
    document.getElementById('coordenadas-info').textContent = 
      `Local selecionado: Lat ${e.latlng.lat.toFixed(4)}, Lng ${e.latlng.lng.toFixed(4)}`;
  });
  
  // Registrar nova ocorrência
  document.getElementById('form-ocorrencia').onsubmit = async function(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value.trim();
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
    if (!tipo || !descricao || isNaN(lat) || isNaN(lng)) {
      document.getElementById('form-msg').textContent = "Preencha todos os campos e marque a localização no mapa.";
      return;
    }
    let fotoUrl = "";
    const fotoInput = document.getElementById('foto');
    if (fotoInput.files && fotoInput.files[0]) {
      fotoUrl = await toDataUrl(fotoInput.files[0]);
    }
    const ocorrencia = {
      tipo, descricao, lat, lng, fotoUrl,
      data: (new Date()).toLocaleString()
    };
    ocorrencias.push(ocorrencia);
    renderOcorrencias();
    renderOcorrenciasMapa();
    document.getElementById('form-ocorrencia').reset();
    document.getElementById('coordenadas-info').textContent = "Clique no mapa para marcar a localização.";
    document.getElementById('form-msg').textContent = "Ocorrência registrada!";
    setTimeout(() => document.getElementById('form-msg').textContent = "", 3000);
  };
  function toDataUrl(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
  function renderOcorrencias() {
    const div = document.getElementById('lista-ocorrencias');
    div.innerHTML = "";
    ocorrencias.slice().reverse().forEach(o => {
      const el = document.createElement('div');
      el.className = 'ocorrencia ' + o.tipo;
      el.innerHTML = `
        <b>${capitalize(o.tipo)}</b> — <span style="color:#666">${o.data}</span><br>
        <span>${o.descricao}</span><br>
        <small><b>Local:</b> Lat ${o.lat.toFixed(4)}, Lng ${o.lng.toFixed(4)}</small>
        ${o.fotoUrl ? `<img src="${o.fotoUrl}" alt="foto da ocorrência">` : ""}
      `;
      div.appendChild(el);
    });
  }
  function renderOcorrenciasMapa() {
    // Remove antigos
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    ocorrencias.forEach(o => {
      const marker = L.marker([o.lat, o.lng], { icon: icons[o.tipo] })
        .addTo(map)
        .bindPopup(
          `<b>${capitalize(o.tipo)}</b> — ${o.descricao}<br>
          <b>Data:</b> ${o.data}<br>
          <b>Local:</b> Lat ${o.lat.toFixed(4)}, Lng ${o.lng.toFixed(4)}
          ${o.fotoUrl ? `<br><img src="${o.fotoUrl}" style="max-width:90px; margin-top:5px;">` : ""}`
        );
      markers.push(marker);
    });
  }
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Dicas dinâmicas
  const dicas = [
    {
      titulo: "Calor Extremo",
      texto: "Hidrate-se sempre, evite exposição ao sol entre 10h e 16h, use roupas leves e busque ambientes ventilados."
    },
    {
      titulo: "Terremoto",
      texto: "Durante um tremor, proteja-se sob móveis resistentes, afaste-se de janelas e, após o evento, vá para áreas abertas e seguras."
    },
    {
      titulo: "Enchente",
      texto: "Não transite em áreas alagadas, desligue energia, busque abrigo elevado e siga orientações das autoridades."
    },
    {
      titulo: "Solidariedade",
      texto: "Ofereça ajuda a vizinhos e pessoas vulneráveis. Compartilhe informações e recursos de forma segura."
    },
    {
      titulo: "QUEIMADAS",
      texto: "Evite queimar lixo, não solte balões e denuncie focos de incêndio. Proteja-se da fumaça, mantendo portas e janelas fechadas."
    },
    {
      titulo: "DESLIZAMENTO",
      texto: "Fique atento a rachaduras e inclinação de postes ou árvores. Em caso de risco, saia imediatamente e avise a defesa civil."
    },
  ];
  function renderDicas() {
    const container = document.getElementById('dicas-container');
    container.innerHTML = "";
    dicas.forEach(dica => {
      const el = document.createElement('div');
      el.className = 'dica';
      el.innerHTML = `<h3>${dica.titulo}</h3><p>${dica.texto}</p>`;
      container.appendChild(el);
    });
  }
  renderDicas();
  
  // Canal solidário
  const listaAjuda = [];
  function renderAjuda() {
    const div = document.getElementById('lista-ajuda');
    div.innerHTML = "";
    listaAjuda.slice().reverse().forEach(a => {
      const el = document.createElement('div');
      el.className = 'ajuda ' + a.tipo;
      el.innerHTML =
        `<b>${a.tipo === "preciso" ? "Precisa de ajuda" : "Oferece ajuda"}</b>: ${a.msg}
        <br><span><b>Contato:</b> ${a.contato} — <b>Nome:</b> ${a.nome}</span>
        <span style="float:right; font-size:0.9em; color:#888">${a.data}</span>`;
      div.appendChild(el);
    });
  }
  document.getElementById('form-ajuda').onsubmit = function (e) {
    e.preventDefault();
    const tipo = document.getElementById('tipo-ajuda').value;
    const nome = document.getElementById('nome-ajuda').value.trim();
    const contato = document.getElementById('contato-ajuda').value.trim();
    const msg = document.getElementById('msg-ajuda').value.trim();
    if (!tipo || !nome || !contato || !msg) return;
    listaAjuda.push({ tipo, nome, contato, msg, data: (new Date()).toLocaleString() });
    renderAjuda();
    document.getElementById('form-ajuda').reset();
    const msgDiv = document.getElementById('ajuda-msg');
    msgDiv.textContent = "Mensagem publicada no canal solidário!";
    setTimeout(() => msgDiv.textContent = "", 4000);
  };
  renderAjuda();
