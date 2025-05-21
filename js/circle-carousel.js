// Script pour le carrousel de photos en cercle avec défilement automatique
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carousel = document.querySelector('.circle-carousel');
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images avec leurs informations
    const galleryItems = [
        { file: 'image (21).jpg', title: 'Réunion d\'\u00e9quipe', date: 'Avril 2024' },
        { file: 'image (22).jpg', title: 'Brainstorming', date: 'Mars 2024' },
        { file: 'image (23).jpg', title: 'Séminaire annuel', date: 'Juin 2024' },
        { file: 'image (24).jpg', title: 'Lancement produit', date: 'Mars 2024' },
        { file: 'image (25).jpg', title: 'Workshop clients', date: 'Février 2024' },
        { file: 'image (26).jpg', title: 'Team building', date: 'Janvier 2024' },
        { file: 'Equipe 8 .jpg', title: 'Formation', date: 'Mai 2024' },
        { file: 'Equipe 9.jpg', title: 'Conférence', date: 'Avril 2024' }
    ];
    
    // Variables de contrôle
    let currentIndex = 0;
    const totalItems = galleryItems.length;
    let itemsPerView = window.innerWidth > 1200 ? 5 : window.innerWidth > 992 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
    
    // Intervalle pour le défilement automatique (en millisecondes)
    const autoScrollInterval = 2000;
    
    // Créer les slides du carrousel
    function createSlides() {
        carousel.innerHTML = '';
        
        galleryItems.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'circle-carousel-slide' + (index === currentIndex ? ' active' : '');
            
            slide.innerHTML = `
                <div class="person-card">
                    <div class="person-photo-container">
                        <img src="${imageFolderPath}${item.file}" alt="${item.title}" class="person-photo">
                    </div>
                    <div class="person-info">
                        <h3>${item.title}</h3>
                        <p>${item.date}</p>
                    </div>
                </div>
            `;
            
            carousel.appendChild(slide);
        });
    }
    
    // Mettre à jour l'affichage du carrousel
    function updateCarousel() {
        // Réinitialiser la position de décalage en pixels
        pixelPosition = 0;
        
        // Calculer la position du carrousel
        const slideWidth = 100 / itemsPerView;
        const offset = currentIndex * slideWidth;
        carousel.style.transform = `translateX(-${offset}%)`;
        
        // Mettre à jour les classes active des slides
        const slides = document.querySelectorAll('.circle-carousel-slide');
        slides.forEach((slide, index) => {
            if (index >= currentIndex && index < currentIndex + itemsPerView) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
    
    // Aller à un slide spécifique
    function goToSlide(index) {
        // S'assurer que l'index est dans les limites
        currentIndex = Math.max(0, Math.min(index, totalItems - itemsPerView));
        updateCarousel();
    }
    
    // Aller au slide suivant
    function nextSlide() {
        if (currentIndex < totalItems - itemsPerView) {
            currentIndex++;
            updateCarousel();
        } else {
            // Revenir au début
            currentIndex = 0;
            updateCarousel();
        }
    }
    
    // Aller au slide précédent
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Aller à la fin
            currentIndex = totalItems - itemsPerView;
            updateCarousel();
        }
    }
    
    // Ajouter les écouteurs d'événements
    function setupEventListeners() {
        // Gestion du swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            // Arrêter le défilement automatique lors du toucher
            stopAutoScroll();
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // Redémarrer le défilement automatique après le toucher
            startAutoScroll();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe vers la gauche (suivant)
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe vers la droite (précédent)
                prevSlide();
            }
        }
        
        // Ajuster le nombre d'éléments par vue lors du redimensionnement
        window.addEventListener('resize', () => {
            const newItemsPerView = window.innerWidth > 1200 ? 5 : window.innerWidth > 992 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
            
            if (newItemsPerView !== itemsPerView) {
                itemsPerView = newItemsPerView;
                goToSlide(currentIndex);
            }
        });
        
        // Arrêter le défilement automatique au survol
        carousel.addEventListener('mouseenter', stopAutoScroll);
        // Redémarrer le défilement automatique à la sortie du survol
        carousel.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Défilement automatique
    let autoScrollTimer;
    let pixelPosition = 0;
    const pixelScrollAmount = 20; // Décalage de 20px à chaque intervalle
    
    function startAutoScroll() {
        // Arrêter tout timer existant avant d'en créer un nouveau
        stopAutoScroll();
        
        // Créer un nouveau timer pour le défilement automatique avec décalage en pixels
        autoScrollTimer = setInterval(() => {
            // Calculer la largeur totale d'une slide en pixels
            const slideElement = carousel.querySelector('.circle-carousel-slide');
            const slideWidth = slideElement ? slideElement.offsetWidth : 0;
            
            if (slideWidth > 0) {
                // Ajouter le décalage progressif
                pixelPosition += pixelScrollAmount;
                
                // Si on a atteint la largeur d'une slide, passer à la suivante
                if (pixelPosition >= slideWidth) {
                    pixelPosition = 0;
                    // Passer à la slide suivante (basé sur l'index)
                    nextSlide();
                } else {
                    // Calculer le pourcentage de décalage par rapport à la largeur totale
                    const slideWidthPercent = 100 / itemsPerView;
                    const pixelPercent = (pixelPosition / slideWidth) * slideWidthPercent;
                    const totalOffset = (currentIndex * slideWidthPercent) + pixelPercent;
                    
                    // Appliquer la transformation en pourcentage pour éviter les problèmes d'unités
                    carousel.style.transform = `translateX(-${totalOffset}%)`;
                }
            }
        }, autoScrollInterval);
    }
    
    function stopAutoScroll() {
        // Arrêter le timer existant
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
        }
    }
    
    // Initialiser le carrousel
    function initCarousel() {
        createSlides();
        updateCarousel();
        setupEventListeners();
        // Démarrer le défilement automatique
        startAutoScroll();
    }
    
    // Démarrer le carrousel
    initCarousel();
});
