document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do acordeão
    const perguntasFaq = document.querySelectorAll('.pergunta-faq');
    
    perguntasFaq.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const item = pergunta.parentElement;
            const resposta = pergunta.nextElementSibling;
            const icone = pergunta.querySelector('i');
            
            // Fecha todos os outros itens
            document.querySelectorAll('.item-faq').forEach(outroItem => {
                if (outroItem !== item) {
                    outroItem.classList.remove('ativo');
                    outroItem.querySelector('.resposta-faq').style.maxHeight = '0';
                    outroItem.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });
            
            // Alterna o item atual
            item.classList.toggle('ativo');
            
            if (item.classList.contains('ativo')) {
                resposta.style.maxHeight = resposta.scrollHeight + 'px';
                icone.style.transform = 'rotate(180deg)';
            } else {
                resposta.style.maxHeight = '0';
                icone.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Funcionalidade de busca
    const campoBusca = document.getElementById('busca-faq');
    
    if (campoBusca) {
        campoBusca.addEventListener('keyup', function() {
            const termoBusca = this.value.toLowerCase();
            const perguntas = document.querySelectorAll('.pergunta-faq span:first-child');
            
            perguntas.forEach(pergunta => {
                const textoPergunta = pergunta.textContent.toLowerCase();
                const itemFaq = pergunta.closest('.item-faq');
                
                if (textoPergunta.includes(termoBusca)) {
                    itemFaq.style.display = '';
                } else {
                    itemFaq.style.display = 'none';
                }
            });
        });
    }
    
    // Inicializa o primeiro item como ativo
    const primeiroItemFaq = document.querySelector('.item-faq');
    if (primeiroItemFaq) {
        primeiroItemFaq.classList.add('ativo');
        const primeiraResposta = primeiroItemFaq.querySelector('.resposta-faq');
        primeiraResposta.style.maxHeight = primeiraResposta.scrollHeight + 'px';
    }
});