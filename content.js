(function() {
    fetch('https://api.github.com/repos/OtavioMaldaner/wallpaper/contents')
        .then(response => response.json())
        .then(data => {
            const imagensGithub = data
                .filter(file => file.type === 'file' && file.name.match(/\.(jpe?g|png|gif|webp)$/i))
                .map(file => file.download_url);

            if (imagensGithub.length === 0) {
                console.error("Nenhuma imagem encontrada no repositório.");
                return;
            }
            iniciarSubstituicao(imagensGithub);
        })
        .catch(error => console.error("Erro ao carregar imagens do GitHub:", error));

    function iniciarSubstituicao(lstImgs) {
        
        function handleImages(time) {
            const images = document.querySelectorAll('img');
            
            images.forEach(item => {
                if (!lstImgs.includes(item.src)) {
                    
                    let h = item.clientHeight || item.height;
                    let w = item.clientWidth || item.width;
                    
                    if (h > 0 && w > 0) {
                        item.style.setProperty('width', w + 'px', 'important');
                        item.style.setProperty('height', h + 'px', 'important');
                        item.style.setProperty('object-fit', 'cover', 'important');
                        item.style.setProperty('object-position', 'center', 'important');
                        
                        item.src = lstImgs[Math.floor(Math.random() * lstImgs.length)]; 
                    } else {
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
            
            if (time > 0) {
                setTimeout(() => handleImages(time), time);
            }
        }
        handleImages(3000);
    }
})();
