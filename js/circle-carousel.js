// Script pour le carrousel de photos avec défilement automatique
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
    ];
    
    // Constantes pour les dimensions
    const slideWidth = 180; // Largeur d'une slide (comme dans les autres sections)
    const slideGap = 25; // Espacement entre les slides
    const slideFullWidth = slideWidth + slideGap; // Largeur totale d'une slide avec gap
    const visibleSlides = 5; // Nombre de slides visibles à la fois
    
    // Variables de contrôle
    let currentIndex = 0;
    const totalItems = galleryItems.length;
    const maxIndex = Math.max(0, totalItems - visibleSlides); // Index maximum pour le défilement
    
    // Intervalle pour le défilement automatique (en millisecondes)
    const autoScrollInterval = 3000;
    let autoScrollTimer;
    
    // Créer les slides du carrousel
    function createSlides() {
        carousel.innerHTML = '';
        
        galleryItems.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'circle-carousel-slide';
            
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
        
        // Positionner le carrousel au début
        updateCarousel();
    }
    
    // Mettre à jour l'affichage du carrousel
    function updateCarousel() {
        // Calculer la position du carrousel en pixels
        const offset = currentIndex * slideFullWidth;
        
        // Appliquer la transformation
        carousel.style.transform = `translateX(-${offset}px)`;
    }
    
    // Fonction pour passer à la slide suivante
    function nextSlide() {
        // Incrémenter l'index mais ne pas dépasser maxIndex
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            // Revenir au début quand on a atteint la fin
            currentIndex = 0;
        }
        
        updateCarousel();
    }
    
    // Démarrer le défilement automatique
    function startAutoScroll() {
        // Arrêter tout timer existant avant d'en créer un nouveau
        stopAutoScroll();
        
        autoScrollTimer = setInterval(() => {
            nextSlide();
        }, autoScrollInterval);
    }
    
    // Arrêter le défilement automatique
    function stopAutoScroll() {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
        }
    }
    
    // Initialisation du carrousel
    function initCarousel() {
        createSlides();
        startAutoScroll();
    }
    
    // Arrêter le défilement automatique lorsque l'utilisateur interagit avec le carrousel
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Initialiser le carrousel
    initCarousel();
});
