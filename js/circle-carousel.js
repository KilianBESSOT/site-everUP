// Script pour le carrousel de photos avec défilement automatique
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carouselContainer = document.querySelector('.circle-carousel-container');
    const carousel = document.querySelector('.circle-carousel');
    const containerDiv = document.querySelector('.gallery-section .container');
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images avec leurs informations et liens
    const galleryItems = [
        { file: 'image (21).jpg', title: "L'IA c'est bluffant", date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_lia-cest-bluffant-mais-encore-faut-il-activity-7291024981327507458-HC6d/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (22).jpg', title: 'Cérémonie des trophées', date: '', url: 'https://www.linkedin.com/posts/everup-networking_cedap-kellyesteves-stephanedasse-ugcPost-7255469986633142272-UYae/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (23).jpg', title: "Présentation de l'équipe", date: '', url: 'https://www.linkedin.com/posts/engit_everup-everup-engit-activity-7272161882583543808-cY1p/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (24).jpg', title: 'Réunion avec Larchevêque', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_on-mavait-dit-qu%C3%A9ric-larchev%C3%AAque-%C3%A9tait-activity-7284517067569963008-LT7h/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (25).jpg', title: 'Mon équipe, Ma fierté', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_on-ne-construit-pas-une-fus%C3%A9e-avec-des-activity-7285966587923177473-vcLc/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (26).jpg', title: 'Le judo ma forgé', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_comment-le-judo-ma-forg%C3%A9-en-tant-quentrepreneur-activity-7289952905728520193-gJQy/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (27).png', title: 'Interview', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_interview-emilie-guerin-activity-7214609894920904704-kTpp/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (28).png', title: 'Nouvel employé', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_nous-avons-le-plaisir-de-vous-informer-que-activity-7221523444599775232-ZHt-/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (29).png', title: 'Cippaca', date: '', url: 'https://www.linkedin.com/posts/christophe-cautela-4314197_cippaca-plateformecollaborative-iagenerative-ugcPost-7191014156760707073-wXvY/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
        { file: 'image (30).png', title: 'Cedap', date: '', url: 'https://www.linkedin.com/posts/cedap-le-r%C3%A9seau-des-dirigeants-d%27associations-professionnelles_h-1-nous-organisons-ce-matin-avec-notre-activity-7179047081276231680-j0Qu/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFOsCUB9Dh_M1j6Q-dWXbaX2q6hNNh4xho' },
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
    const autoScrollInterval = 2000;
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
    
    // Fonction pour passer à la slide précédente
    function prevSlide() {
        // Décrémenter l'index mais ne pas aller en dessous de 0
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Aller à la fin quand on est au début
            currentIndex = maxIndex;
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
    
    // Ajouter les boutons de navigation
    function addNavigationButtons() {
        // Créer le bouton précédent
        const prevButton = document.createElement('button');
        prevButton.className = 'circle-carousel-nav prev';
        prevButton.innerHTML = '&lt;';
        prevButton.setAttribute('aria-label', 'Précédent');
        prevButton.addEventListener('click', function() {
            stopAutoScroll(); // Arrêter le défilement automatique
            prevSlide();
        });
        
        // Ajouter les événements pour reprendre le défilement automatique
        prevButton.addEventListener('mouseenter', function() {
            stopAutoScroll();
        });
        prevButton.addEventListener('mouseleave', function() {
            startAutoScroll();
        });
        
        // Créer le bouton suivant
        const nextButton = document.createElement('button');
        nextButton.className = 'circle-carousel-nav next';
        nextButton.innerHTML = '&gt;';
        nextButton.setAttribute('aria-label', 'Suivant');
        nextButton.addEventListener('click', function() {
            stopAutoScroll(); // Arrêter le défilement automatique
            nextSlide();
        });
        
        // Ajouter les événements pour reprendre le défilement automatique
        nextButton.addEventListener('mouseenter', function() {
            stopAutoScroll();
        });
        nextButton.addEventListener('mouseleave', function() {
            startAutoScroll();
        });
        
        // Ajouter les boutons à la div container plutôt qu'au conteneur du carousel
        containerDiv.appendChild(prevButton);
        containerDiv.appendChild(nextButton);
    }
    
    // Initialisation du carrousel
    function initCarousel() {
        createSlides();
        addNavigationButtons();
        startAutoScroll();
    }
    
    // Arrêter le défilement automatique lorsque l'utilisateur interagit avec le carrousel
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Initialiser le carrousel
    initCarousel();
});
