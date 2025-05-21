// Script pour le carrousel automatique de photos
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carousel = document.querySelector('.photo-carousel');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    // Vider le carrousel des placeholders
    carousel.innerHTML = '';
    
    // Chemin vers le dossier d'images
    const imageFolderPath = 'images/img société/';
    
    // Liste des images dans le dossier (à mettre à jour manuellement quand de nouvelles images sont ajoutées)
    const imageFiles = [
        'image (21).jpg',
        'image (22).jpg',
        'image (23).jpg',
        'image (24).jpg',
        'image (25).jpg',
        'image (26).jpg'
    ];
    
    // Générer dynamiquement les éléments du carrousel
    imageFiles.forEach((imageFile, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
        
        const img = document.createElement('img');
        img.src = imageFolderPath + imageFile;
        img.alt = 'Photo de l\'entreprise ' + (index + 1);
        img.className = 'carousel-image';
        
        // Ajouter un gestionnaire d'événements pour ouvrir la modal au clic
        img.addEventListener('click', () => {
            openImageModal(img.src);
        });
        
        carouselItem.appendChild(img);
        carousel.appendChild(carouselItem);
    });
    
    // Mettre à jour les variables après la génération dynamique
    
    // Éléments pour la modal
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    // Configuration
    const autoplaySpeed = 5000; // Vitesse de défilement automatique en ms
    let currentIndex = 0;
    let autoplayInterval;
    const totalItems = imageFiles.length;
    
    // Fonction pour afficher une diapositive spécifique
    function showSlide(index) {
        // Gérer les limites du carrousel de manière circulaire
        // Utiliser le modulo pour assurer un défilement infini
        currentIndex = (index % totalItems + totalItems) % totalItems;
        
        // Déplacer le carrousel pour centrer l'image active
        const offset = currentIndex * 100;
        carousel.style.transform = `translateX(-${offset}%)`;
        
        // Mettre à jour les classes active pour les items
        const carouselItems = document.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mettre à jour les indicateurs
        const indicators = document.querySelectorAll('.indicator');
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
    indicatorsContainer.className = 'carousel-indicators';
    document.querySelector('.photo-carousel-container').appendChild(indicatorsContainer);
    
    // Ajouter les indicateurs en fonction du nombre d'images
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'indicator' + (i === 0 ? ' active' : '');
        indicator.setAttribute('data-index', i);
        indicatorsContainer.appendChild(indicator);
        
        // Ajouter l'écouteur d'événement
        indicator.addEventListener('click', () => {
            showSlide(i);
            stopAutoplay();
            startAutoplay(); // Redémarrer l'autoplay après un clic
        });
    }
    
    // Ajouter des écouteurs d'événements pour les boutons de navigation
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay(); // Redémarrer l'autoplay après un clic
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Redémarrer l'autoplay après un clic
    });
    
    // Fonction pour ouvrir la modal avec l'image agrandie
    function openImageModal(imageSrc) {
        // Si c'est un placeholder sans vraie image, ne rien faire
        if (!imageSrc) return;
        
        modalImage.src = imageSrc;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
        stopAutoplay(); // Arrêter le défilement automatique quand on regarde une image
    }
    
    // Fonction pour fermer la modal
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; // Rétablir le défilement de la page
        startAutoplay(); // Redémarrer le défilement automatique
    }
    
    // Ajouter des écouteurs d'événements pour la modal
    closeModal.addEventListener('click', closeImageModal);
    
    // Fermer la modal en cliquant en dehors de l'image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Fermer la modal avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });
    
    // Ajouter des écouteurs d'événements pour le carrousel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Ajouter la prise en charge du toucher pour les appareils mobiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Seuil de détection du balayage
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Balayage vers la gauche
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Balayage vers la droite
            prevSlide();
        }
    }
    
    // Préparer le carrousel
    function setupCarousel() {
        // Ajouter des écouteurs d'événements pour chaque image
        originalItems.forEach(item => {
            const placeholder = item.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.addEventListener('click', function() {
                    // Pour l'instant, nous utilisons un placeholder, donc pas d'image réelle
                    // Quand vous ajouterez de vraies images, remplacez ceci par le chemin de l'image
                    const imageSrc = placeholder.querySelector('img')?.src;
                    if (imageSrc) {
                        openImageModal(imageSrc);
                    } else {
                        // Afficher un message indiquant que c'est un placeholder
                        alert('Ceci est un emplacement pour une image. Ajoutez une vraie image pour la voir en grand.');
                    }
                });
            }
        });
        
        return originalItems;
    }
    
    // Initialiser le carrousel
    const items = setupCarousel();
    showSlide(0);
    startAutoplay();
    
    // Ajouter une animation d'entrée pour le carrousel
    carousel.style.opacity = '0';
    setTimeout(() => {
        carousel.style.opacity = '1';
        carousel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }, 300);
});
