# Site everUP

Ce projet est une réplique du site everUP, créé à partir d'une capture d'écran. Il s'agit d'une maquette statique que vous pouvez modifier selon vos besoins.

## Structure du projet

```
site-everUP/
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   └── README.txt (liste des images nécessaires)
└── index.html
```

## Technologies utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles et mise en page responsive
- **JavaScript** : Interactions et animations
- **Font Awesome** : Icônes

## Fonctionnalités

- Design responsive adapté à tous les appareils
- Onglets interactifs dans la section plateforme
- Animations au défilement pour les cartes de solutions et témoignages
- Animation du formulaire d'appel à l'action
- Mise en page moderne avec dégradés et ombres

## Comment utiliser

1. Clonez ou téléchargez ce dépôt
2. Ouvrez le fichier `index.html` dans votre navigateur pour voir le site
3. Modifiez les fichiers selon vos besoins

## Personnalisation

### Couleurs

Les couleurs principales sont définies comme variables CSS dans le fichier `css/styles.css` :

```css
:root {
    --primary-color: #ff7f00; /* Orange everUP */
    --secondary-color: #2c4b8a; /* Bleu foncé */
    --light-blue: #3a5ca9; /* Bleu plus clair pour les dégradés */
    --dark-blue: #1e3a6e; /* Bleu plus foncé pour les dégradés */
    /* ... autres variables ... */
}
```

Vous pouvez modifier ces variables pour changer les couleurs du site.

### Images

Remplacez les images dans le dossier `images/` par vos propres images. Consultez le fichier `images/README.txt` pour connaître les images nécessaires.

### Contenu

Modifiez le fichier `index.html` pour changer le contenu du site. La structure est organisée en sections clairement identifiées par des commentaires.

### Fonctionnalités JavaScript

Le fichier `js/main.js` contient les scripts pour les interactions et animations. Vous pouvez les modifier ou en ajouter de nouvelles selon vos besoins.

## Améliorations possibles

- Ajouter un menu de navigation mobile
- Implémenter un formulaire de contact fonctionnel
- Ajouter des animations plus complexes avec des bibliothèques comme GSAP
- Intégrer un système de gestion de contenu pour faciliter les mises à jour
- Ajouter des pages supplémentaires pour les différentes sections

## Crédits

Ce site est une réplique créée à des fins éducatives et de démonstration. Le design original appartient à everUP.

---

N'hésitez pas à modifier et adapter ce site selon vos besoins !
