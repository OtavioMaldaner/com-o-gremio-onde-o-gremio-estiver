(function() {
    // Busca os arquivos do seu repositório no GitHub automaticamente
    fetch('https://api.github.com/repos/OtavioMaldaner/wallpaper/contents')
        .then(response => response.json())
        .then(data => {
            // Filtra as imagens
            const imagensGithub = data
                .filter(file => file.type === 'file' && file.name.match(/\.(jpe?g|png|gif|webp)$/i))
                .map(file => file.download_url);

            if (imagensGithub.length === 0) {
                console.error("Nenhuma imagem encontrada no repositório.");
                return;
            }

            // Inicia a invasão tricolor
            iniciarSubstituicao(imagensGithub);
        })
        .catch(error => console.error("Erro ao carregar imagens do GitHub:", error));

    function iniciarSubstituicao(lstImgs) {
        
        function handleImages(time) {
            // Pega todas as imagens da página
            const images = document.querySelectorAll('img');
            
            images.forEach(item => {
                // Pula se a imagem já foi substituída
                if (!lstImgs.includes(item.src)) {
                    
                    let h = item.clientHeight || item.height;
                    let w = item.clientWidth || item.width;
                    
                    // Se a imagem original já tiver tamanho carregado na tela
                    if (h > 0 && w > 0) {
                        // Força o tamanho e o enquadramento usando !important para vencer o CSS do site
                        item.style.setProperty('width', w + 'px', 'important');
                        item.style.setProperty('height', h + 'px', 'important');
                        item.style.setProperty('object-fit', 'cover', 'important');
                        item.style.setProperty('object-position', 'center', 'important');
                        
                        item.src = lstImgs[Math.floor(Math.random() * lstImgs.length)]; 
                    } else {
                        // Se a imagem ainda está carregando, espera ela terminar
                        item.addEventListener('load', function onloadHandler() {
                            item.removeEventListener('load', onloadHandler);
                            
                            if (!lstImgs.includes(item.src)) {
                                let h = item.clientHeight || item.height;
                                let w = item.clientWidth || item.width;
                                
                                item.style.setProperty('width', w + 'px', 'important');
                                item.style.setProperty('height', h + 'px', 'important');
                                item.style.setProperty('object-fit', 'cover', 'important');
                                item.style.setProperty('object-position', 'center', 'important');
                                
                                item.src = lstImgs[Math.floor(Math.random() * lstImgs.length)]; 
                            }
                        });
                    }
                }
            });
            
            // Continua rodando em loop
            if (time > 0) {
                setTimeout(() => handleImages(time), time);
            }
        }

        // Executa a função a cada 3 segundos
        handleImages(3000);
    }
})();