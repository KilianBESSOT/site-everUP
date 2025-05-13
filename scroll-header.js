// Script pour le header qui change au défilement
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
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
});
