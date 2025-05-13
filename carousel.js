// Script pour le carrousel automatique de photos
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du carrousel
    const carousel = document.querySelector('.photo-carousel');
    const originalItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    // Éléments pour la modal
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    // Configuration
    const autoplaySpeed = 5000; // Vitesse de défilement automatique en ms
    let currentIndex = 0;
    let autoplayInterval;
    const totalItems = originalItems.length;
    
    // Fonction pour afficher une diapositive spécifique
    function showSlide(index) {
        // Gérer les limites du carrousel de manière circulaire
        // Utiliser le modulo pour assurer un défilement infini
        currentIndex = (index % totalItems + totalItems) % totalItems;
        
        // Déplacer le carrousel
        const offset = currentIndex * 70;
        carousel.style.transform = `translateX(calc(-${offset}% + 15%))`;
        
        // Mettre à jour les classes active pour les items
        items.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Mettre à jour les indicateurs
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
    
    // Ajouter des écouteurs d'événements pour les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // Ajuster l'index pour tenir compte des éléments clones
            // L'index réel est décalé de 1 (car on a ajouté un élément au début)
            showSlide(index + 1);
            stopAutoplay();
            startAutoplay(); // Redémarrer l'autoplay après un clic
        });
    });
    
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
