# Déploiement Frontend Murmure sur Render

## Prérequis

1. Compte Render : [render.com](https://render.com)
2. Repository GitHub du frontend : `Murmure-Front` doit être public ou connecté à Render
3. **Backend déjà déployé** et URL disponible (ex: `https://murmure-backend.onrender.com`)
4. Le package `serve` a été ajouté aux devDependencies (déjà fait ✅)

## Variable d'environnement requise

| Variable | Description | Exemple |
|----------|-------------|---------|
| `EXPO_PUBLIC_BACKEND_URL` | URL du backend déployé | `https://murmure-backend.onrender.com` |

⚠️ **IMPORTANT** : Cette variable doit pointer vers votre backend Render (sans slash final)

## Déploiement

### Méthode 1 : Blueprint (Automatique) - RECOMMANDÉ

1. **Poussez les modifications sur GitHub**
   ```bash
   git add .
   git commit -m "Add Render configuration for web deployment"
   git push origin main
   ```

2. **Créez le service depuis Render**
   - Allez sur [dashboard.render.com](https://dashboard.render.com)
   - Cliquez sur "New +" → "Blueprint"
   - Sélectionnez votre repository `Murmure-Front`
   - Render détectera automatiquement `render.yaml`
   - Cliquez sur "Apply"

3. **Ajoutez la variable d'environnement**
   - Dans le dashboard, sélectionnez `murmure-frontend`
   - Allez dans "Environment"
   - Ajoutez `EXPO_PUBLIC_BACKEND_URL` avec l'URL de votre backend

4. **Déployez**
   - Le déploiement démarre automatiquement
   - Build : 5-10 minutes
   - Une fois "Live", visitez l'URL fournie

### Méthode 2 : Création manuelle

1. **Créez un nouveau Static Site**
   - Dashboard → "New +" → "Web Service"
   - Connectez votre repository `Murmure-Front`

2. **Configuration**
   - **Name** : `murmure-frontend`
   - **Region** : Frankfurt (même que le backend)
   - **Branch** : `main`
   - **Root Directory** : (laisser vide)
   - **Runtime** : Node
   - **Build Command** : `npm install && npx expo export -p web`
   - **Start Command** : `npx serve dist -s -n -p $PORT`
   - **Plan** : Free

3. **Variable d'environnement**
   - Ajoutez `EXPO_PUBLIC_BACKEND_URL` = URL de votre backend

4. **Créez le service**

## Vérification

1. **Vérifiez les logs de build**
   - Logs → recherchez "Exporting..."
   - Doit se terminer par "Export successful"

2. **Testez l'application**
   - Visitez l'URL de votre frontend
   - L'app doit charger
   - Testez la connexion au chat pour vérifier la communication avec le backend

3. **Vérifiez les erreurs réseau**
   - Ouvrez la console navigateur (F12)
   - Onglet Network
   - Vérifiez que les requêtes vers le backend réussissent

## Pour l'application mobile (iOS/Android)

L'application React Native mobile continuera de fonctionner avec le backend déployé.

### Mettre à jour l'URL du backend pour mobile

1. **Modifiez config.js localement**
   ```javascript
   // Pour forcer l'URL en production même en dev mobile
   export const BACKEND_ADDRESS = "https://murmure-backend.onrender.com";
   ```

2. **Ou utilisez les variables d'environnement Expo**
   - Créez `.env` dans Murmure-Front :
   ```
   EXPO_PUBLIC_BACKEND_URL=https://murmure-backend.onrender.com
   ```

3. **Testez avec Expo Go**
   ```bash
   npm start
   ```
   - L'app mobile utilisera désormais le backend en production

### Publier l'app mobile (optionnel)

Pour publier sur App Store et Google Play :

```bash
# Installez EAS CLI
npm install -g eas-cli

# Configurez EAS
eas login
eas build:configure

# Build pour iOS/Android
eas build --platform ios
eas build --platform android

# Soumettez aux stores
eas submit
```

Documentation : [docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)

## Dépannage

### Le build échoue
```
✓ Vérifiez les logs de build dans Render
✓ Vérifiez que tous les packages sont installés
✓ Testez le build localement : npm run build:web
```

### L'app charge mais ne se connecte pas au backend
```
✓ Vérifiez EXPO_PUBLIC_BACKEND_URL dans Environment
✓ Vérifiez que le backend est bien "Live"
✓ Vérifiez la console navigateur pour les erreurs CORS
✓ Vérifiez que le backend a activé CORS (déjà fait dans app.js)
```

### Erreur CORS
Le backend utilise déjà `cors()` qui autorise toutes les origines. Si problème :
```javascript
// Dans Murmure-Back/app.js - vérifiez :
const cors = require("cors");
app.use(cors()); // ✓ Déjà présent
```

### Page blanche
```
✓ Vérifiez la console navigateur (F12)
✓ Vérifiez que le dossier 'dist' a été créé lors du build
✓ Vérifiez les logs Render
✓ Essayez un redéploiement manuel
```

## Limitations du plan gratuit

- Service s'endort après 15 min d'inactivité
- Premier chargement : 30-60 secondes
- 750 heures/mois (suffisant pour 1 service actif)

## Prochaines étapes

✅ Backend déployé
✅ Frontend web déployé
➡️ Testez l'application complète
➡️ (Optionnel) Publiez l'app mobile avec EAS Build

## URLs finales

Notez vos URLs de production :

```
Backend:  https://murmure-backend.onrender.com
Frontend: https://murmure-frontend.onrender.com
```

Partagez l'URL du frontend pour accéder à l'application web !
