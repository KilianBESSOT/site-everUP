// Script pour la galerie moderne
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du DOM
    const slider = document.querySelector('.gallery-slider');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const thumbsContainer = document.querySelector('.gallery-thumbs');
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images avec leurs légendes
    const galleryImages = [
        { file: 'image (21).jpg', title: 'Réunion d\'équipe', description: 'Avril 2024' },
        { file: 'image (22).jpg', title: 'Brainstorming', description: 'Mars 2024' },
        { file: 'image (23).jpg', title: 'Séminaire annuel', description: 'Juin 2024' },
        { file: 'image (24).jpg', title: 'Lancement produit', description: 'Mars 2024' },
        { file: 'image (25).jpg', title: 'Workshop clients', description: 'Février 2024' },
        { file: 'image (26).jpg', title: 'Team building', description: 'Janvier 2024' },
        { file: 'Equipe 8 .jpg', title: 'Formation', description: 'Mai 2024' },
        { file: 'Equipe 9.jpg', title: 'Conférence', description: 'Avril 2024' }
    ];
    
    // Variables de contrôle
    let currentIndex = 0;
    const totalSlides = galleryImages.length;
    
    // Fonction pour initialiser la galerie
    function initGallery() {
        // Créer les slides
        createSlides();
        
        // Créer les miniatures
        createThumbnails();
        
        // Ajouter les écouteurs d'événements
        setupEventListeners();
        
        // Afficher le premier slide
        updateGallery();
    }
    
    // Fonction pour créer les slides
    function createSlides() {
        slider.innerHTML = '';
        
        galleryImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.dataset.index = index;
            
            slide.innerHTML = `
                <div class="gallery-image-container">
                    <img src="${imageFolderPath}${image.file}" alt="${image.title}" class="gallery-image">
                    <div class="gallery-caption">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                </div>
            `;
            
            slider.appendChild(slide);
        });
    }
    
    // Fonction pour créer les miniatures
    function createThumbnails() {
        thumbsContainer.innerHTML = '';
        
        galleryImages.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
            thumb.dataset.index = index;
            
            thumb.innerHTML = `<img src="${imageFolderPath}${image.file}" alt="${image.title}">`;
            
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
            
            thumbsContainer.appendChild(thumb);
        });
    }
    
    // Fonction pour mettre à jour l'affichage de la galerie
    function updateGallery() {
        // Mettre à jour la position du slider
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Mettre à jour les miniatures actives
        const thumbs = document.querySelectorAll('.gallery-thumb');
        thumbs.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
    
    // Fonction pour passer au slide suivant
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    }
    
    // Fonction pour passer au slide précédent
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateGallery();
    }
    
    // Fonction pour configurer les écouteurs d'événements
    function setupEventListeners() {
        // Boutons de navigation
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        });
        
        // Gestion du swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
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
    }
    
    // Initialiser la galerie
    initGallery();
});
