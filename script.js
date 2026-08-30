// ======================================================
// BLIE HOTÉIS — SCRIPT
// ======================================================


// ------------------------------------------------------
// TROCA DE IDIOMA
// ------------------------------------------------------

const botoesIdioma = document.querySelectorAll('.language-button');

botoesIdioma.forEach((botao) => {

    botao.addEventListener('click', () => {

        const idioma = botao.dataset.lang;

        // Remove o idioma ativo
        botoesIdioma.forEach((item) => {
            item.classList.remove('active');
        });

        // Ativa o idioma escolhido
        botao.classList.add('active');


        // Traduz todos os elementos
        const elementosTraduziveis = document.querySelectorAll(
            '[data-pt][data-en][data-es]'
        );

        elementosTraduziveis.forEach((elemento) => {

            const traducao = elemento.dataset[idioma];

            if (traducao) {
                elemento.textContent = traducao;
            }

        });


        // Atualiza o idioma do HTML
        if (idioma === 'pt') {
            document.documentElement.lang = 'pt-BR';
        }

        if (idioma === 'en') {
            document.documentElement.lang = 'en';
        }

        if (idioma === 'es') {
            document.documentElement.lang = 'es';
        }

    });

});


// ------------------------------------------------------
// ANIMAÇÃO DOS BOTÕES AO APARECER
// ------------------------------------------------------

const botoesLinks = document.querySelectorAll('.link-button');

if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entradas) => {

        const visiveis = entradas
            .filter((entrada) => entrada.isIntersecting)
            .sort((a, b) => {
                return [...botoesLinks].indexOf(a.target)
                    - [...botoesLinks].indexOf(b.target);
            });

        visiveis.forEach((entrada, indice) => {

            setTimeout(() => {
                entrada.target.classList.add('visible');
            }, indice * 160);

            observer.unobserve(entrada.target);

        });

    }, {
        threshold: 0.15
    });

    botoesLinks.forEach((botao) => {
        observer.observe(botao);
    });

} else {

    botoesLinks.forEach((botao, indice) => {

        setTimeout(() => {
            botao.classList.add('visible');
        }, indice * 160);

    });

}


// ------------------------------------------------------
// EFEITO DE TOQUE NOS BOTÕES
// ------------------------------------------------------

botoesLinks.forEach((botao) => {

    botao.addEventListener('pointerdown', () => {
        botao.classList.add('pressed');
    });

    botao.addEventListener('pointerup', () => {
        botao.classList.remove('pressed');
    });

    botao.addEventListener('pointerleave', () => {
        botao.classList.remove('pressed');
    });

});