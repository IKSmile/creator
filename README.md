# 🚀 Générateur de Projet Node.js + Express + EJS

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-4.x-black)
![EJS](https://img.shields.io/badge/EJS-Template-orange)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue)
![Licence](https://img.shields.io/badge/Licence-MIT-yellow)

---

# 📌 Description

Générateur professionnel de projets Node.js avec :

* Express.js
* EJS
* SQLite3
* Architecture MVC
* Système d’authentification
* CLI Creator personnalisé
* Support Socket.IO
* Support multilingue (FR/EN)
* Interface Bootstrap 5

Développé par **KUAKUA MATALATALA ISAAC**

---

# ✨ Fonctionnalités

✅ Architecture MVC
✅ Système d’authentification
✅ Sessions Express
✅ Base de données SQLite
✅ Générateur dynamique de projet
✅ Commandes CLI Creator
✅ Templates EJS
✅ Interface Bootstrap 5
✅ Support Socket.IO
✅ Support multilingue FR/EN
✅ Système de middlewares
✅ Système de migrations
✅ Système de seeders
✅ Liste automatique des routes
✅ Hachage sécurisé des mots de passe
✅ Tableau de bord inclus
✅ Prêt pour la production

---

# 📂 Structure du Projet Généré

```bash
project/
├── app/
│   ├── controllers/
│   ├── middleware/
│   └── models/
│
├── config/
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── database.db
│
├── public/
│   ├── css/
│   ├── js/
│   └── lib/
│
├── routes/
│
├── views/
│   ├── auth/
│   ├── tableau-de-bord.ejs
│   ├── accueil.ejs
│   └── 404.ejs
│
├── cli.js
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Prérequis

* Node.js 18+
* npm 9+

Vérifier les versions :

```bash
node -v
npm -v
```

---

# 📦 Installation

## 1. Cloner le dépôt

```bash
git clone https://github.com/IKSmile/creator.git
```

---

## 2. Entrer dans le dossier du projet

```bash
cd creator
```
# ▶️ Lancer le Générateur

```bash
node builder.js
```

# 🧠 Questions du Générateur

Le générateur demandera :

* Nom du projet
* Description du projet
* Inclure Socket.IO ?
* Activer le support multilingue ?

---

# Démarrer le Projet Généré

Installer les dépendances :

```bash
npm install
```

Lancer le serveur en développement :

```bash
npm run dev
```

Mode production :

```bash
npm start
```

---

# Accéder à l’Application

```bash
http://localhost:3000
```

---

# Commandes CLI Creator

---

# Créer un Modèle

```bash
npm run make:model Article titre:string contenu:text
```

Exemple de modèle généré :

```js
class Article {
  constructor(data = {}) {
    this.titre = data.titre;
    this.contenu = data.contenu;
  }
}
```

---

# Créer un Contrôleur

```bash
npm run make:controller ArticleController
```

---

# Créer un Middleware

```bash
npm run make:middleware AuthMiddleware
```

---

# Créer une Migration

```bash
npm run make:migration create_articles_table
```

---

# Exécuter les Migrations

```bash
npm run migrate
```

---

# Créer un Seeder

```bash
npm run make:seed ArticleSeeder
```

---

# Exécuter les Seeders

```bash
npm run db:seed
```

---

# Lister les Routes

```bash
npm run route:list
```

---

# Aide CLI

```bash
npm run creator help
```

---

# 🔐 Système d’Authentification Inclus

Généré automatiquement :

✅ Connexion
✅ Inscription
✅ Tableau de bord
✅ Authentification par session
✅ Protection des routes
✅ Hachage des mots de passe
✅ Déconnexion

---

# Support Multilingue

Langues disponibles :

* 🇫🇷 Français
* 🇬🇧 Anglais

Le changement de langue est dynamique.

---

# Support Socket.IO

Si activé :

* Notifications en temps réel
* Connexions live
* Architecture prête pour le chat

---

# Technologies Utilisées

| Technologie     | Utilisation                |
| --------------- | -------------------------- |
| Node.js         | Runtime JavaScript         |
| Express.js      | Framework Backend          |
| SQLite3         | Base de données            |
| EJS             | Moteur de templates        |
| Bootstrap 5     | Framework UI               |
| Socket.IO       | Temps réel                 |
| bcryptjs        | Sécurité des mots de passe |
| express-session | Gestion des sessions       |

---

# Routes Générées

| Méthode | Route            | Description            |
| ------- | ---------------- | ---------------------- |
| GET     | /                | Redirection            |
| GET     | /connexion       | Page de connexion      |
| POST    | /connexion       | Traitement connexion   |
| GET     | /inscription     | Page d’inscription     |
| POST    | /inscription     | Traitement inscription |
| GET     | /tableau-de-bord | Tableau de bord        |
| GET     | /deconnexion     | Déconnexion            |
| GET     | /accueil         | Page d’accueil         |

---

# Sécurité

Le générateur inclut :

* Hachage des mots de passe avec bcrypt
* Sessions Express sécurisées
* Routes protégées
* Validation des formulaires
* Authentification sécurisée

---

# Exemple de Création de Projet

## Exemple Blog

### Créer un modèle

```bash
npm run make:model Post titre:string contenu:text
```

---

### Créer un contrôleur

```bash
npm run make:controller PostController
```

---

### Créer une migration

```bash
npm run make:migration create_posts_table
```

---

### Exécuter les migrations

```bash
npm run migrate
```

---

# Variables d’Environnement

Copier `.env.example`

```bash
cp .env.example .env
```

Exemple :

```env
PORT=3000
SESSION_SECRET=mon_super_secret
```

---

# Contribution

Les contributions sont les bienvenues.

Étapes :

1. Forker le projet
2. Créer une branche
3. Committer les modifications
4. Push la branche
5. Ouvrir une Pull Request

---

# Licence

Licence MIT

---

# 👨‍💻 Auteur

## KUAKUA MATALATALA ISAAC

Développeur Fullstack

Technologies :

* Node.js
* Express.js
* Laravel
* SQLite
* EJS
* Bootstrap
* Socket.IO

---

# Soutenir le Projet

Si ce projet vous aide :

⭐ Ajouter une étoile au dépôt
⭐ Partager avec la communauté Node.js
⭐ Contribuer aux améliorations

---

# Objectif de la Communauté

Construire l’un des meilleurs générateurs MVC open-source Node.js pour les développeurs du monde entier.

---

# Bon Développement

```bash
Happy Coding 
```
