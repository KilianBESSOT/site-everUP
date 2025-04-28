# Gestion des logos everUP

Ce dossier est destiné à contenir les différentes versions du logo everUP dans plusieurs formats pour une utilisation optimale sur le site web.

## Formats recommandés

1. **SVG** (recommandé pour le web)
   - Format vectoriel qui s'adapte à toutes les tailles sans perte de qualité
   - Supporte la transparence
   - Taille de fichier généralement plus petite
   - Nommage suggéré: `everup-logo.svg`

2. **PNG**
   - Format raster avec support de la transparence
   - Idéal pour les logos avec fond transparent
   - Nommage suggéré: `everup-logo.png`

3. **JPG/JPEG**
   - Format compressé sans transparence
   - À utiliser uniquement si le logo a un fond plein
   - Nommage suggéré: `everup-logo.jpg`

## Comment remplacer le logo

1. Placez votre nouveau logo dans ce dossier dans le format souhaité (SVG ou PNG recommandé)
2. Modifiez le chemin dans le fichier `index.html` si nécessaire:
   ```html
   <div class="logo">
       <img src="images/logos/everup-logo.svg" alt="everUP Logo">
   </div>
   ```

## Recommandations pour les logos

- **Taille recommandée**: Hauteur de 40-50px pour une bonne visibilité sans prendre trop d'espace
- **Fond transparent**: Privilégiez un logo avec fond transparent (formats SVG ou PNG)
- **Versions alternatives**: Vous pouvez également préparer une version blanche du logo pour les fonds sombres (par exemple `everup-logo-white.svg`)

## Utilisation dans le footer

Pour utiliser une version alternative du logo dans le footer (par exemple, une version blanche), modifiez le chemin dans la section footer du fichier `index.html`:

```html
<img src="images/logos/everup-logo-white.svg" alt="everUP Logo" class="footer-logo">
```
