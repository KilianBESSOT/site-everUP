// Script pour le header qui change au défilement et le menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const scrollThreshold = 100; // Seuil de défilement en pixels

    // Fonction pour vérifier la position de défilement
    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Vérifier au chargement de la page
    checkScroll();

    // Ajouter l'écouteur d'événement pour le défilement
    window.addEventListener('scroll', checkScroll);
    
    // Fonction pour basculer le menu mobile
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('body-no-scroll'); // Empêcher le défilement du fond
    }
    
    // Ajouter l'écouteur d'événement pour le menu hamburger
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Fermer le menu mobile lorsqu'un lien est cliqué
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
});
