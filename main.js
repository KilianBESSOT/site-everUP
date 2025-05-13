// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets dans la section plateforme
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContent = document.querySelector('.tab-content');
    
    // Contenu des différents onglets avec texte et image
    const tabContents = [
        '<div class="tab-content-wrapper"><div class="tab-text"><h3>Alignement</h3><p>Des équipes plus productives grâce à un fil d\'actualité structuré.</p></div><img src="images/platform-preview.png" alt="Alignement" class="platform-preview"></div>',
        '<div class="tab-content-wrapper"><div class="tab-text"><h3>Performance</h3><p>Analyse et reporting intégrés pour optimiser votre organisation.</p></div><img src="images/analytics-preview.png" alt="Performance" class="platform-preview"></div>',
        '<div class="tab-content-wrapper"><div class="tab-text"><h3>Centralisation</h3><p>Une seule plateforme pour toutes vos communications internes.</p></div><img src="images/communication-preview.png" alt="Centralisation" class="platform-preview"></div>',
        '<div class="tab-content-wrapper"><div class="tab-text"><h3>Engagement</h3><p>Boosté par un community manager et des outils interactifs.</p></div><img src="images/resources-preview.png" alt="Engagement" class="platform-preview"></div>'
    ];
    
    // Ajouter les écouteurs d'événements pour les onglets
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Mettre à jour le contenu de l'onglet avec une animation
            tabContent.style.opacity = 0;
            
            setTimeout(() => {
                tabContent.innerHTML = tabContents[index];
                tabContent.style.opacity = 1;
            }, 300);
        });
    });
    
    // Animation au défilement pour les cartes de solutions
    const solutionCards = document.querySelectorAll('.solution-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const offset = 200; // Avancer l'animation de 200px
        return (
            rect.top >= -offset &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Fonction pour animer les éléments lorsqu'ils deviennent visibles
    function animateOnScroll() {
        // Animer les cartes de solutions
        solutionCards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
        
        // Animer les cartes de témoignages
        testimonialCards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('animated')) {
                card.classList.add('animated');
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialiser les styles pour l'animation
    solutionCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    testimonialCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ajouter l'écouteur d'événement pour le défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Déclencher l'animation au chargement initial
    animateOnScroll();
    
    // Animation du formulaire CTA
    const ctaForm = document.querySelector('.cta-form');
    const ctaInput = document.querySelector('.cta-input');
    const ctaButton = document.querySelector('.cta-form .btn');
    
    if (ctaForm && ctaInput && ctaButton) {
        ctaInput.addEventListener('focus', () => {
            ctaForm.style.transform = 'scale(1.02)';
        });
        
        ctaInput.addEventListener('blur', () => {
            ctaForm.style.transform = 'scale(1)';
        });
        
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (ctaInput.value.trim() !== '') {
                // Simuler l'envoi du formulaire
                ctaButton.textContent = 'Envoi en cours...';
                
                setTimeout(() => {
                    ctaButton.textContent = 'Merci !';
                    ctaInput.value = '';
                    
                    setTimeout(() => {
                        ctaButton.textContent = 'Demander une démo';
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Animation du menu de navigation pour mobile (à implémenter si nécessaire)
    // ...
    
    // Animation du bouton de retour en haut de page (à implémenter si nécessaire)
    // ...
});
