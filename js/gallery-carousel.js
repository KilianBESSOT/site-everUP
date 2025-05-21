// Script pour le carrousel de la galerie
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carousel = document.querySelector('.gallery-carousel');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    // Vider le carrousel des placeholders
    carousel.innerHTML = '';
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images dans le dossier
    const imageFiles = [
        'image (21).jpg',
        'image (22).jpg',
        'image (23).jpg',
        'image (24).jpg',
        'image (25).jpg',
        'image (26).jpg',
        'Equipe 8 .jpg',
        'Equipe 9.jpg'
    ];
    
    // Générer dynamiquement les éléments du carrousel
    imageFiles.forEach((imageFile, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item' + (index === 0 ? ' active' : '');
        
        const img = document.createElement('img');
        img.src = imageFolderPath + imageFile;
        img.alt = 'Photo de l\'entreprise ' + (index + 1);
        img.className = 'gallery-image';
        
        // Ajouter un gestionnaire d'événements pour ouvrir la modal au clic
        img.addEventListener('click', () => {
            openImageModal(img.src);
        });
        
        galleryItem.appendChild(img);
        carousel.appendChild(galleryItem);
    });
    
    // Éléments pour la modal
    const imageModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    const closeModal = document.querySelector('.close-gallery-modal');
    
    // Configuration
    const autoplaySpeed = 5000; // Vitesse de défilement automatique en ms
    let currentIndex = 0;
    let autoplayInterval;
    const totalItems = imageFiles.length;
    
    // Fonction pour afficher une diapositive spécifique
    function showSlide(index) {
        // Gérer les limites du carrousel de manière circulaire
        currentIndex = (index % totalItems + totalItems) % totalItems;
        
        // Déplacer le carrousel pour centrer l'image active
        const offset = currentIndex * 100;
        carousel.style.transform = `translateX(-${offset}%)`;
        
        // Mettre à jour les classes active pour les items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mettre à jour les indicateurs
        const indicators = document.querySelectorAll('.gallery-indicator');
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Fonction pour passer à la diapositive suivante
    function nextSlide() {
        showSlide(currentIndex + 1);
    }
    
    // Fonction pour passer à la diapositive précédente
    function prevSlide() {
        showSlide(currentIndex - 1);
    }
    
    // Démarrer le défilement automatique
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplaySpeed);
    }
    
    // Arrêter le défilement automatique
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Créer les indicateurs de façon dynamique
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'gallery-indicators';
    document.querySelector('.gallery-carousel-container').appendChild(indicatorsContainer);
    
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'gallery-indicator' + (i === 0 ? ' active' : '');
        indicator.dataset.index = i;
        indicatorsContainer.appendChild(indicator);
        
        // Ajouter un gestionnaire d'événements pour naviguer au clic sur un indicateur
        indicator.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    }
    
    // Fonction pour ouvrir la modal avec l'image agrandie
    function openImageModal(imageSrc) {
        modalImage.src = imageSrc;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
        stopAutoplay();
    }
    
    // Fonction pour fermer la modal
    function closeImageModal() {
        imageModal.style.display = 'none';
        document.body.style.overflow = ''; // Réactiver le défilement de la page
        startAutoplay();
    }
    
    // Ajouter des écouteurs d'événements pour la modal
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }
    
    // Fermer la modal en cliquant en dehors de l'image
    if (imageModal) {
        imageModal.addEventListener('click', function(event) {
            if (event.target === imageModal) {
                closeImageModal();
            }
        });
    }
    
    // Ajouter des écouteurs d'événements pour les boutons de navigation
    prevButton.addEventListener('click', function() {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    nextButton.addEventListener('click', function() {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    // Arrêter le défilement automatique au survol du carrousel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Gestion du swipe sur mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
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
    
    // Initialiser le carrousel
    showSlide(0);
    startAutoplay();
});
