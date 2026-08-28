const botoesIdioma = document.querySelectorAll('.idioma');
const botoesLinks = document.querySelectorAll('.link-card');
const telinhaLinks = document.querySelector('.linktree');

botoesIdioma.forEach((botao) => {
    botao.addEventListener('click', () => {

        const idioma = botao.dataset.lang;

        // Remove o ativo de todos
        botoesIdioma.forEach((item) => {
            item.classList.remove('ativo');
        });

        // Adiciona ativo no idioma escolhido
        botao.classList.add('ativo');


        // Procura todos os elementos que possuem traduções
        const elementosTraduziveis = document.querySelectorAll(
            '[data-pt][data-en][data-es]'
        );


        elementosTraduziveis.forEach((elemento) => {
            elemento.textContent = elemento.dataset[idioma];
        });


        // Atualiza o idioma da página
        document.documentElement.lang =
            idioma === 'pt'
                ? 'pt-BR'
                : idioma;
    });
});

const revelarBotao = (botao, atraso = 0) => {
    window.setTimeout(() => {
        botao.classList.add('revelado');
    }, atraso);
};

if ('IntersectionObserver' in window) {
    const filaRevelacao = [];
    let revelando = false;

    const revelarProximo = () => {
        if (!filaRevelacao.length) {
            revelando = false;
            return;
        }

        revelando = true;
        revelarBotao(filaRevelacao.shift());

        window.setTimeout(revelarProximo, 140);
    };

    const observadorLinks = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            filaRevelacao.push(entrada.target);
            observadorLinks.unobserve(entrada.target);
        });

        if (!revelando) {
            revelarProximo();
        }
    }, {
        root: telinhaLinks,
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
    });

    botoesLinks.forEach((botao) => {
        observadorLinks.observe(botao);
    });
} else {
    botoesLinks.forEach((botao, indice) => {
        revelarBotao(botao, indice * 120);
    });
}
