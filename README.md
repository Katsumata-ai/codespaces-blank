# Dafnck Army - Plateforme de Marketing d'Influence

## 🚀 Installation et Déploiement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn
- Compte Supabase

### Installation locale

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd dafnck-army
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos vraies valeurs
nano .env
```

4. **Démarrer le serveur de développement**
```bash
npm start
# ou
node server.js
```

Le site sera accessible sur `http://localhost:3000`

### Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Configuration du serveur
PORT=3000
HOST=127.0.0.1

# Configuration Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Configuration de l'application
NODE_ENV=development
BASE_URL=http://localhost:3000

# Configuration de sécurité
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-super-secret-session-key-here
```

### Déploiement en production

#### 1. Hébergeurs supportés
- **Vercel** (recommandé)
- **Netlify**
- **Railway**
- **Heroku**
- **VPS/Serveur dédié**

#### 2. Configuration pour Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement dans le dashboard Vercel
```

#### 3. Configuration pour Netlify
```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod
```

#### 4. Variables d'environnement en production
⚠️ **Important** : Ne jamais committer le fichier `.env` !

Configurez ces variables dans votre hébergeur :
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NODE_ENV=production`
- `BASE_URL=https://votre-domaine.com`

### Sécurité

✅ **Ce qui est sécurisé maintenant :**
- Variables d'environnement dans `.env`
- Configuration Supabase via API
- Fichier `.env` exclu de Git

❌ **Avant (problème de sécurité) :**
- Clés codées en dur dans le code
- Informations sensibles visibles sur GitHub

### Structure du projet

```
dafnck-army/
├── .env                 # Variables d'environnement (non versionné)
├── .env.example         # Exemple de configuration
├── .gitignore          # Fichiers à ignorer
├── server.js           # Serveur Node.js
├── index.html          # Page principale
├── css/                # Styles CSS
├── js/                 # Scripts JavaScript
│   ├── config/         # Configuration (Supabase, etc.)
│   ├── core/           # Fonctionnalités core
│   ├── pages/          # Pages de l'application
│   └── components/     # Composants réutilisables
└── assets/             # Images, fonts, etc.
```

### API Endpoints

- `GET /api/config` - Configuration de l'application
- Toutes les autres routes servent l'application SPA

### Développement

```bash
# Mode développement avec rechargement automatique
npm run dev

# Démarrage normal
npm start
```

### Support

Pour toute question ou problème :
1. Vérifiez que toutes les variables d'environnement sont configurées
2. Vérifiez que Supabase est accessible
3. Consultez les logs du serveur pour les erreurs
