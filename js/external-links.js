// Script pour ouvrir tous les liens dans un nouvel onglet
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les liens de la page
    const allLinks = document.querySelectorAll('a');
    
    // Parcourir tous les liens et ajouter target="_blank"
    allLinks.forEach(link => {
        // Ne pas modifier les liens de navigation interne (sauf s'ils ont déjà target="_blank")
        if (!link.hasAttribute('target')) {
            // Vérifier si c'est un lien interne (commence par # ou est une page du site)
            const href = link.getAttribute('href');
            const isInternalPage = href && (
                href.startsWith('index.html') || 
                href.startsWith('a-propos.html') || 
                href.startsWith('nous-contacter.html')
            );
            
            // Si ce n'est pas un lien d'ancre ou une page interne, ouvrir dans un nouvel onglet
            if (href && !href.startsWith('#') && !isInternalPage) {
                link.setAttribute('target', '_blank');
                // Ajouter rel="noopener" pour des raisons de sécurité
                link.setAttribute('rel', 'noopener');
            }
        }
    });
});
