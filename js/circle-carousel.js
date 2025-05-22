// Script pour le carrousel de photos avec défilement automatique
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carousel = document.querySelector('.circle-carousel');
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images avec leurs informations et liens
    const galleryItems = [
        { file: 'image (21).jpg', title: 'Réunion d\'\u00e9quipe', date: 'Avril 2024', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_lia-cest-bluffant-mais-encore-faut-il-activity-7291024981327507458-HC6d/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (22).jpg', title: 'Brainstorming', date: 'Mars 2024', url: 'https://www.linkedin.com/posts/everup-networking_cedap-kellyesteves-stephanedasse-ugcPost-7255469986633142272-UYae/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (23).jpg', title: 'Séminaire annuel', date: 'Juin 2024', url: 'https://www.linkedin.com/posts/engit_everup-everup-engit-activity-7272161882583543808-cY1p/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (24).jpg', title: 'Lancement produit', date: 'Mars 2024', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_on-mavait-dit-qu%C3%A9ric-larchev%C3%AAque-%C3%A9tait-activity-7284517067569963008-LT7h/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (25).jpg', title: 'Workshop clients', date: 'Février 2024', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_on-ne-construit-pas-une-fus%C3%A9e-avec-des-activity-7285966587923177473-vcLc/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (26).jpg', title: 'Team building', date: 'Janvier 2024', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_comment-le-judo-ma-forg%C3%A9-en-tant-quentrepreneur-activity-7289952905728520193-gJQy/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
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
                    <a href="${item.url}" target="_blank" class="carousel-link">
                        <div class="person-photo-container">
                            <img src="${imageFolderPath}${item.file}" alt="${item.title}" class="person-photo">
                        </div>
                        <div class="person-info">
                            <h3>${item.title}</h3>
                            <p>${item.date}</p>
                        </div>
                    </a>
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
