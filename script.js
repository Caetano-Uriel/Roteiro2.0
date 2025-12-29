// Função para mostrar/ocultar campo de Plano Antigo
function togglePlanos() {
    const tipo = document.getElementById('tipo-atendimento').value;
    const campoAntigo = document.getElementById('campo-plano-antigo');
    
    if (tipo === 'AMPLIAÇÃO DE BANDA') {
        campoAntigo.classList.remove('hidden');
    } else {
        campoAntigo.classList.add('hidden');
    }
}

// Função Principal de Extração e Impressão
function prepararImpressao() {
    // 1. Extração de Dados do Texto Colado
    const rawText = document.getElementById('paste-area').value;
    let nome = "", doc = "";

    try {
        const nomeMatch = rawText.match(/(?:Nome\/Razão Social|Nome):\s*(.*?)(?:\n|$|CPF|CNPJ)/i);
        const docMatch = rawText.match(/(?:CPF\/CNPJ|CPF|CNPJ):\s*([\d.\/-]+)/i);
        if(nomeMatch) nome = nomeMatch[1].trim();
        if(docMatch) doc = docMatch[1].trim();
    } catch (e) { console.error("Erro regex", e); }

    // 2. Preenchendo o Layout de Impressão Minimalista
    const tipoServico = document.getElementById('tipo-atendimento').value;
    const tipoPessoa = document.getElementById('tipo-pessoa').value;

    document.getElementById('p-tipo-servico').innerText = tipoServico;
    document.getElementById('p-nome').innerText = nome || "N/A";
    document.getElementById('p-label-doc').innerText = (tipoPessoa === 'PJ') ? "CNPJ:" : "CPF:";
    document.getElementById('p-doc').innerText = doc || "N/A";

    // --- LÓGICA DE PLANOS ---
    
    // Plano Novo
    const planoNovo = document.getElementById('plano-novo').value || "";
    const valorNovo = document.getElementById('valor-plano').value || "";
    document.getElementById('p-plano-completo').innerText = `${planoNovo} - ${valorNovo}`;

    // Plano Antigo (Só aparece se for Ampliação)
    const linhaPlanoAntigo = document.getElementById('p-linha-plano-antigo');
    
    if(tipoServico === "AMPLIAÇÃO DE BANDA") {
        linhaPlanoAntigo.classList.remove('hidden');
        
        const planoAntigoNome = document.getElementById('plano-antigo').value || "";
        const planoAntigoValor = document.getElementById('valor-antigo').value || "";
        
        document.getElementById('p-plano-antigo').innerText = `${planoAntigoNome} - ${planoAntigoValor}`;
    } else {
        linhaPlanoAntigo.classList.add('hidden');
    }

    // Equipamentos e Docs
    document.getElementById('p-rot-comodato').innerText = document.getElementById('roteador-comodato').value;
    document.getElementById('p-mod-comodato').innerText = document.getElementById('modem-comodato').value;
    document.getElementById('p-assinatura').innerText = document.getElementById('tipo-assinatura').value;
    document.getElementById('p-docs-anex').innerText = document.getElementById('docs-anexados').value;

    // --- LÓGICA DE OBSERVAÇÕES ---
    const obsTexto = document.getElementById('observacoes').value;
    const linhaObs = document.getElementById('p-linha-obs');
    const linhaDocs = document.getElementById('linha-docs'); // Elemento pai do docs

    if(obsTexto && obsTexto.trim() !== "") {
        // Mostra obs e formata bordas
        linhaObs.classList.remove('hidden');
        linhaObs.classList.add('print-line-last');
        document.getElementById('p-obs').innerText = obsTexto;

        // A linha anterior (docs) agora ganha borda
        linhaDocs.classList.remove('print-line-last');
        linhaDocs.classList.add('print-line');
    } else {
        // Esconde obs
        linhaObs.classList.add('hidden');
        
        // A linha anterior (docs) perde a borda
        linhaDocs.classList.remove('print-line');
        linhaDocs.classList.add('print-line-last');
    }

    // Checklist
    document.getElementById('p-c1').innerText = document.getElementById('check1').checked ? "X" : " ";
    document.getElementById('p-c2').innerText = document.getElementById('check2').checked ? "X" : " ";
    document.getElementById('p-c3').innerText = document.getElementById('check3').checked ? "X" : " ";

    // 3. Executa a Impressão
    window.print();
}