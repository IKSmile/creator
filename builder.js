//-----------------------------------------------------------------//
//  GÉNÉRATEUR DE STRUCTURE NODE - EXPRESS - EJS                  //
//  Version : 3.1.0 - CORRIGÉ ET OPTIMISÉ                         //
//  Développé par : KUAKUA MATALATALA ISAAC                       //
//-----------------------------------------------------------------//

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Création de l'interface pour les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Configuration des langues
const langues = {
  fr: {
    title: "GÉNÉRATEUR DE PROJET NODE.js - EXPRESS - EJS",
    subtitle: "Développé par KUAKUA MATALATALA ISAAC",
    projectName: "Nom du projet : ",
    description: "Description du projet : ",
    socketIO: "Souhaitez-vous inclure Socket.IO ? (o/n) : ",
    multiLang:
      "Souhaitez-vous activer le support multilingue (Français/Anglais) ? (o/n) : ",
    generating: "Génération de votre projet en cours...",
    completed: "GÉNÉRATION TERMINÉE !",
    nextSteps: "Prochaines étapes :",
    install: "1. Exécuter : npm install",
    dev: "2. Exécuter : npm run dev",
    Creator: "3. Tester les commandes Creator : npm run creator help",
    access: "4. Accéder à : http://localhost:3000",
    happyCoding: "🎉 Bonne programmation ! 🎉",
  },
  en: {
    title: "NODE.js - EXPRESS - EJS PROJECT GENERATOR",
    subtitle: "Developed by KUAKUA MATALATALA ISAAC",
    projectName: "Project name: ",
    description: "Project description: ",
    socketIO: "Do you want to include Socket.IO? (y/n): ",
    multiLang:
      "Do you want to enable multilanguage support (French/English)? (y/n): ",
    generating: "Generating your project...",
    completed: "GENERATION COMPLETED!",
    nextSteps: "Next steps:",
    install: "1. Run: npm install",
    dev: "2. Run: npm run dev",
    Creator: "3. Test Creator commands: npm run creator help",
    access: "4. Access: http://localhost:3000",
    happyCoding: "🎉 Happy coding! 🎉",
  },
};

// Fonction pour poser une question à l'utilisateur
const poserQuestion = (query) => {
  return new Promise((resolve) => {
    rl.question(query, (reponse) => {
      resolve(reponse);
    });
  });
};

// Fonction pour créer un dossier s'il n'existe pas
const creerDossier = (dossier) => {
  if (!fs.existsSync(dossier)) {
    fs.mkdirSync(dossier, { recursive: true });
    console.log(`✅ Créé ${dossier}`);
    return true;
  }
  return false;
};

// Fonction pour écrire un fichier
const ecrireFichier = (chemin, contenu) => {
  const dir = path.dirname(chemin);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(chemin, contenu);
  console.log(`✅ Créé ${chemin}`);
  return true;
};

// Sélection de la langue
console.log("\n╔══════════════════════════════════════════════════════════╗");
console.log("║              SELECT LANGUAGE / CHOISIR LANGUE            ║");
console.log("╠══════════════════════════════════════════════════════════╣");
console.log("║    1. Français (FR)                                      ║");
console.log("║    2. English (EN)                                       ║");
console.log("╚══════════════════════════════════════════════════════════╝\n");

const choixLangue = await poserQuestion("Votre choix / Your choice (1-2): ");
const langue = choixLangue === "2" ? "en" : "fr";
const t = langues[langue];

console.log(`\n${"=".repeat(60)}`);
console.log(`     ${t.title}`);
console.log(`     ${t.subtitle}`);
console.log(`${"=".repeat(60)}\n`);

// Récupération des informations du projet
const nomProjet = await poserQuestion(t.projectName);
const descriptionProjet = await poserQuestion(t.description);
const inclureSocketIO = await poserQuestion(t.socketIO);
const activerMultilingue = await poserQuestion(t.multiLang);
const auteur = "KUAKUA MATALATALA ISAAC";
const annee = new Date().getFullYear();

console.log(`\n🔨 ${t.generating}\n`);

// Création des dossiers principaux
const dossiersPrincipaux = [
  "app",
  "config",
  "database",
  "public",
  "views",
  "routes",
];
for (const dossier of dossiersPrincipaux) {
  creerDossier(dossier);
}

// Création des sous-dossiers
creerDossier("app/controllers");
creerDossier("app/models");
creerDossier("app/middleware");
creerDossier("public/css");
creerDossier("public/js");
creerDossier("public/lib");
creerDossier("views/auth");
creerDossier("database/migrations");
creerDossier("database/seeders");

// ==================== UserController.js (Controller) ====================
const userControllerContent = `// app/controllers/UserController.js
// Développé par KUAKUA MATALATALA ISAAC

const Utilisateur = require("../models/Utilisateur");
${activerMultilingue === "o" ? 'const i18n = require("../../config/i18n");' : ""}

const ControleurUtilisateur = {
  afficherConnexion: (req, res) => {
    if (req.session.utilisateurId) {
      return res.redirect("/tableau-de-bord");
    }
    const trads = ${activerMultilingue === "o" ? "i18n.getTranslations(req)" : "{}"};
    res.render("auth/connexion", { 
      erreur: null, 
      titre: ${activerMultilingue === "o" ? "trads('auth.login')" : "'Connexion'"},
      t: trads
    });
  },

  connexion: (req, res) => {
    const { nomUtilisateur, motDePasse } = req.body;
    const trads = ${activerMultilingue === "o" ? "i18n.getTranslations(req)" : "{}"};

    if (!nomUtilisateur || !motDePasse) {
      return res.render("auth/connexion", {
        erreur: ${activerMultilingue === "o" ? "trads('errors.fillAllFields')" : "'Veuillez remplir tous les champs'"},
        titre: ${activerMultilingue === "o" ? "trads('auth.login')" : "'Connexion'"},
        t: trads
      });
    }

    Utilisateur.trouverParNom(nomUtilisateur, (err, utilisateur) => {
      if (err) {
        console.error("Erreur lors de la recherche:", err);
        return res.render("auth/connexion", {
          erreur: ${activerMultilingue === "o" ? "trads('errors.technicalError')" : "'Erreur technique, veuillez réessayer'"},
          titre: ${activerMultilingue === "o" ? "trads('auth.login')" : "'Connexion'"},
          t: trads
        });
      }
      
      if (!utilisateur) {
        return res.render("auth/connexion", {
          erreur: ${activerMultilingue === "o" ? "trads('errors.invalidCredentials')" : "'Nom d\\'utilisateur ou mot de passe invalide'"},
          titre: ${activerMultilingue === "o" ? "trads('auth.login')" : "'Connexion'"},
          t: trads
        });
      }

      const motDePasseValide = Utilisateur.verifierMotDePasse(motDePasse, utilisateur.mot_de_passe);
      
      if (motDePasseValide) {
        req.session.utilisateurId = utilisateur.id;
        req.session.nomUtilisateur = utilisateur.nom_utilisateur;
        res.redirect("/tableau-de-bord");
      } else {
        res.render("auth/connexion", {
          erreur: ${activerMultilingue === "o" ? "trads('errors.invalidCredentials')" : "'Nom d\\'utilisateur ou mot de passe invalide'"},
          titre: ${activerMultilingue === "o" ? "trads('auth.login')" : "'Connexion'"},
          t: trads
        });
      }
    });
  },

  afficherInscription: (req, res) => {
    if (req.session.utilisateurId) {
      return res.redirect("/tableau-de-bord");
    }
    const trads = ${activerMultilingue === "o" ? "i18n.getTranslations(req)" : "{}"};
    res.render("auth/inscription", { 
      erreur: null, 
      titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
      t: trads
    });
  },

  inscription: (req, res) => {
    const { nomUtilisateur, email, motDePasse, confirmerMotDePasse } = req.body;
    const trads = ${activerMultilingue === "o" ? "i18n.getTranslations(req)" : "{}"};

    if (!nomUtilisateur || !email || !motDePasse || !confirmerMotDePasse) {
      return res.render("auth/inscription", {
        erreur: ${activerMultilingue === "o" ? "trads('errors.fillAllFields')" : "'Veuillez remplir tous les champs'"},
        titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
        t: trads
      });
    }

    if (motDePasse !== confirmerMotDePasse) {
      return res.render("auth/inscription", {
        erreur: ${activerMultilingue === "o" ? "trads('errors.passwordsDoNotMatch')" : "'Les mots de passe ne correspondent pas'"},
        titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
        t: trads
      });
    }

    if (motDePasse.length < 6) {
      return res.render("auth/inscription", {
        erreur: ${activerMultilingue === "o" ? "trads('errors.passwordTooShort')" : "'Le mot de passe doit contenir au moins 6 caractères'"},
        titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
        t: trads
      });
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("auth/inscription", {
        erreur: ${activerMultilingue === "o" ? "trads('errors.invalidEmail')" : "'Veuillez entrer un email valide'"},
        titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
        t: trads
      });
    }

    // CORRECTION: Appel à la méthode statique create
    Utilisateur.create({ nomUtilisateur, email, motDePasse }, (err, utilisateurId) => {
      if (err) {
        console.error("Erreur lors de la création:", err);
        
        if (err.message && err.message.includes("UNIQUE constraint failed")) {
          return res.render("auth/inscription", {
            erreur: ${activerMultilingue === "o" ? "trads('errors.userExists')" : "'Nom d\\'utilisateur ou email déjà existant'"},
            titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
            t: trads
          });
        }
        
        return res.render("auth/inscription", {
          erreur: ${activerMultilingue === "o" ? "trads('errors.registrationError')" : "'Erreur lors de la création du compte'"},
          titre: ${activerMultilingue === "o" ? "trads('auth.register')" : "'Inscription'"},
          t: trads
        });
      }
      
      console.log("Utilisateur créé avec succès, ID:", utilisateurId);
      res.redirect("/connexion");
    });
  },

  tableauDeBord: (req, res) => {
    const trads = ${activerMultilingue === "o" ? "i18n.getTranslations(req)" : "{}"};
    Utilisateur.trouverParId(req.session.utilisateurId, (err, utilisateur) => {
      if (err || !utilisateur) {
        console.error("Erreur lors de la recherche de l'utilisateur:", err);
        return res.redirect("/connexion");
      }

      res.render("tableau-de-bord", {
        titre: ${activerMultilingue === "o" ? "trads('dashboard.title')" : "'Tableau de bord'"},
        utilisateur: utilisateur,
        t: trads
      });
    });
  },

  deconnexion: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la destruction de la session :", err);
      }
      res.redirect("/connexion");
    });
  }
};

module.exports = ControleurUtilisateur;`;

ecrireFichier("app/controllers/UserController.js", userControllerContent);

// ==================== Utilisateur.js (MODEL) ====================
const utilisateurModelContent = `// app/models/Utilisateur.js
// Développé par KUAKUA MATALATALA ISAAC

const { db } = require("../../config/database");
const bcrypt = require("bcryptjs");

class Utilisateur {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nom_utilisateur = data.nom_utilisateur || null;
    this.email = data.email || null;
    this.mot_de_passe = data.mot_de_passe || null;
    this.date_creation = data.date_creation || null;
  }

  // Méthode d'instance pour sauvegarder l'objet courant
  save(callback) {
    if (this.id) {
      this.update(callback);
    } else {
      this.create(callback);
    }
  }

  // Méthode d'instance pour créer à partir de l'objet courant
  create(callback) {
    if (!this.mot_de_passe) {
      return callback(new Error("Le mot de passe est requis"), null);
    }
    
    let motDePasseHache;
    try {
      const salt = bcrypt.genSaltSync(10);
      motDePasseHache = bcrypt.hashSync(this.mot_de_passe, salt);
    } catch (error) {
      return callback(error, null);
    }
    
    db.run(
      "INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe) VALUES (?, ?, ?)",
      [this.nom_utilisateur, this.email, motDePasseHache],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  // CORRECTION: Méthode STATIQUE pour créer un utilisateur
  static create(userData, callback) {
    const utilisateur = new Utilisateur({
      nom_utilisateur: userData.nomUtilisateur,
      email: userData.email,
      mot_de_passe: userData.motDePasse
    });
    utilisateur.create(callback);
  }

  update(callback) {
    db.run(
      "UPDATE utilisateurs SET nom_utilisateur = ?, email = ? WHERE id = ?",
      [this.nom_utilisateur, this.email, this.id],
      callback
    );
  }

  delete(callback) {
    db.run("DELETE FROM utilisateurs WHERE id = ?", [this.id], callback);
  }

  static trouverParNom(nomUtilisateur, callback) {
    db.get("SELECT * FROM utilisateurs WHERE nom_utilisateur = ?", [nomUtilisateur], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (row) {
        const user = new Utilisateur(row);
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
  }

  static trouverParId(id, callback) {
    db.get(
      "SELECT id, nom_utilisateur, email, date_creation FROM utilisateurs WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          callback(err, null);
        } else if (row) {
          callback(null, new Utilisateur(row));
        } else {
          callback(null, null);
        }
      }
    );
  }

  static all(callback) {
    db.all("SELECT * FROM utilisateurs ORDER BY id DESC", [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new Utilisateur(row)));
      }
    });
  }

  static verifierMotDePasse(motDePasse, motDePasseHache) {
    if (!motDePasse || !motDePasseHache) return false;
    try {
      return bcrypt.compareSync(motDePasse, motDePasseHache);
    } catch (error) {
      return false;
    }
  }
}

module.exports = Utilisateur;`;

ecrireFichier("app/models/Utilisateur.js", utilisateurModelContent);

// ==================== database.js ====================
const databaseContent = `// config/database.js
// Développé par KUAKUA MATALATALA ISAAC

const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dossierDonnees = path.join(__dirname, "../database");
if (!fs.existsSync(dossierDonnees)) {
  fs.mkdirSync(dossierDonnees, { recursive: true });
}

const db = new sqlite3.Database(path.join(dossierDonnees, "database.db"));

const initialiserBaseDonnees = () => {
  db.serialize(() => {
    db.run(\`CREATE TABLE IF NOT EXISTS utilisateurs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom_utilisateur TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      mot_de_passe TEXT NOT NULL,
      date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
    )\`);
    console.log("✅ Base de données initialisée avec succès");
  });
};

module.exports = { db, initialiserBaseDonnees };`;

ecrireFichier("config/database.js", databaseContent);

// ==================== i18n.js (si multilingue activé) ====================
if (activerMultilingue === "o") {
  const i18nContent = `// config/i18n.js - Configuration multilingue
// Développé par KUAKUA MATALATALA ISAAC

const translations = {
  fr: {
    common: {
      welcome: "Bienvenue",
      logout: "Déconnexion",
      login: "Connexion",
      register: "Inscription",
      dashboard: "Tableau de bord"
    },
    auth: {
      login: "Connexion",
      register: "Inscription",
      username: "Nom d'utilisateur",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      noAccount: "Pas de compte ? S'inscrire",
      hasAccount: "Déjà un compte ? Se connecter"
    },
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bienvenue",
      memberSince: "Membre depuis",
      accountInfo: "Informations du compte",
      statistics: "Statistiques"
    },
    errors: {
      fillAllFields: "Veuillez remplir tous les champs",
      passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
      invalidEmail: "Veuillez entrer un email valide",
      invalidCredentials: "Nom d'utilisateur ou mot de passe invalide",
      userExists: "Nom d'utilisateur ou email déjà existant",
      registrationError: "Erreur lors de la création du compte",
      technicalError: "Erreur technique, veuillez réessayer"
    }
  },
  en: {
    common: {
      welcome: "Welcome",
      logout: "Logout",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard"
    },
    auth: {
      login: "Login",
      register: "Register",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      noAccount: "No account? Register",
      hasAccount: "Already have an account? Login"
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome",
      memberSince: "Member since",
      accountInfo: "Account information",
      statistics: "Statistics"
    },
    errors: {
      fillAllFields: "Please fill all fields",
      passwordsDoNotMatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      invalidEmail: "Please enter a valid email",
      invalidCredentials: "Invalid username or password",
      userExists: "Username or email already exists",
      registrationError: "Error creating account",
      technicalError: "Technical error, please try again"
    }
  }
};

const getTranslations = (req) => {
  const lang = req.session.langue || 'fr';
  return (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
};

const changeLanguage = (req, res, next) => {
  const { lang } = req.query;
  if (lang && (lang === 'fr' || lang === 'en')) {
    req.session.langue = lang;
    if (req.session.utilisateurId) {
      const url = req.originalUrl.split('?')[0];
      return res.redirect(url);
    }
  }
  next();
};

module.exports = { getTranslations, changeLanguage };`;

  ecrireFichier("config/i18n.js", i18nContent);
}

// ==================== style.css ====================
const styleCssContent = `/* style.css - Développé par KUAKUA MATALATALA ISAAC */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  
}

.language-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.language-switcher .btn {
  margin: 0 5px;
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.container {
  padding: 20px;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #1d2239 0%, #100c13 100%);
  color: white;
  padding: 20px;
  text-align: center;
}

.card-body {
  padding: 30px;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px 15px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #1d2239 0%, #100c13 100%);
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.alert {
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.navbar {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`;

ecrireFichier("public/css/style.css", styleCssContent);

// ==================== main.js ====================
let mainJsContent = `// main.js - Développé par KUAKUA MATALATALA ISAAC
console.log("Application chargée avec succès");

document.addEventListener('DOMContentLoaded', function() {
    // Validation des mots de passe
    const formInscription = document.querySelector('form[action="/inscription"]');
    if (formInscription) {
        formInscription.addEventListener('submit', function(e) {
            const password = document.getElementById('motDePasse');
            const confirm = document.getElementById('confirmerMotDePasse');
            
            if (password && confirm && password.value !== confirm.value) {
                e.preventDefault();
                alert('Les mots de passe ne correspondent pas !');
            }
        });
    }
    
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s';
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });
});`;

if (inclureSocketIO === "o") {
  mainJsContent += `

const socket = io();

function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = \`alert alert-\${type === 'error' ? 'danger' : 'success'} notification\`;
    toast.innerHTML = \`
        <strong>\${type === 'error' ? '❌' : '✅'}</strong> \${message}
    \`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
    showNotification('Connecté au serveur en temps réel', 'success');
});

socket.on('notification', (data) => {
    showNotification(data.message, data.type);
});`;
}

ecrireFichier("public/js/main.js", mainJsContent);

// ==================== Routes ====================
const authRoutesContent = `// routes/authRoutes.js
// Développé par KUAKUA MATALATALA ISAAC

const express = require("express");
const router = express.Router();
const ControleurUtilisateur = require("../app/controllers/UserController");
${activerMultilingue === "o" ? 'const i18n = require("../config/i18n");' : ""}

const requireLogin = (req, res, next) => {
  if (!req.session.utilisateurId) {
    return res.redirect("/connexion");
  }
  next();
};

${activerMultilingue === "o" ? "router.use(i18n.changeLanguage);" : ""}

router.get("/", (req, res) => {
  if (req.session.utilisateurId) {
    res.redirect("/tableau-de-bord");
  } else {
    res.redirect("/connexion");
  }
});

router.get("/connexion", ControleurUtilisateur.afficherConnexion);
router.post("/connexion", ControleurUtilisateur.connexion);
router.get("/inscription", ControleurUtilisateur.afficherInscription);
router.post("/inscription", ControleurUtilisateur.inscription);
router.get("/tableau-de-bord", requireLogin, ControleurUtilisateur.tableauDeBord);
router.get("/deconnexion", ControleurUtilisateur.deconnexion);

module.exports = router;`;

ecrireFichier("routes/authRoutes.js", authRoutesContent);

const webRoutesContent = `// routes/web.js
// Routes principales du projet
// Développé par KUAKUA MATALATALA ISAAC

const express = require("express");
const router = express.Router();

router.get("/accueil", (req, res) => {
  res.render("accueil", { 
    titre: "Accueil",
    message: "Bienvenue sur l'application"
  });
});

module.exports = router;`;

ecrireFichier("routes/web.js", webRoutesContent);

// ==================== Vues EJS ====================
const connexionEjs = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= titre %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    ${activerMultilingue === "o"
    ? `<div class="language-switcher">
        <a href="?lang=fr" class="btn btn-light">🇫🇷 Français</a>
        <a href="?lang=en" class="btn btn-light">🇬🇧 English</a>
    </div>`
    : ""
  }
    
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3><%= t ? t('auth.login') : 'Connexion' %></h3>
                    </div>
                    <div class="card-body">
                        <% if (erreur) { %>
                            <div class="alert alert-danger"><%= erreur %></div>
                        <% } %>
                        <form method="POST" action="/connexion">
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.username') : "Nom d'utilisateur" %></label>
                                <input type="text" name="nomUtilisateur" class="form-control" required autofocus>
                            </div>
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.password') : "Mot de passe" %></label>
                                <input type="password" name="motDePasse" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100"><%= t ? t('auth.login') : "Se connecter" %></button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="/inscription"><%= t ? t('auth.noAccount') : "Pas de compte ? S'inscrire" %></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/main.js"></script>
    ${inclureSocketIO === "o" ? '<script src="/socket.io/socket.io.js"></script>' : ""}
</body>
</html>`;

ecrireFichier("views/auth/connexion.ejs", connexionEjs);

const inscriptionEjs = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= titre %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    ${activerMultilingue === "o"
    ? `<div class="language-switcher">
        <a href="?lang=fr" class="btn btn-light">🇫🇷 Français</a>
        <a href="?lang=en" class="btn btn-light">🇬🇧 English</a>
    </div>`
    : ""
  }
    
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h3><%= t ? t('auth.register') : "Inscription" %></h3>
                    </div>
                    <div class="card-body">
                        <% if (erreur) { %>
                            <div class="alert alert-danger"><%= erreur %></div>
                        <% } %>
                        <form action="/inscription" method="POST">
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.username') : "Nom d'utilisateur" %></label>
                                <input type="text" name="nomUtilisateur" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.email') : "Email" %></label>
                                <input type="email" name="email" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.password') : "Mot de passe" %></label>
                                <input type="password" id="motDePasse" name="motDePasse" class="form-control" required>
                                <small class="text-muted">Au moins 6 caractères</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label"><%= t ? t('auth.confirmPassword') : "Confirmer le mot de passe" %></label>
                                <input type="password" id="confirmerMotDePasse" name="confirmerMotDePasse" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100"><%= t ? t('auth.register') : "S'inscrire" %></button>
                        </form>
                        <div class="text-center mt-3">
                            <a href="/connexion"><%= t ? t('auth.hasAccount') : "Déjà un compte ? Se connecter" %></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/main.js"></script>
    ${inclureSocketIO === "o" ? '<script src="/socket.io/socket.io.js"></script>' : ""}
</body>
</html>`;

ecrireFichier("views/auth/inscription.ejs", inscriptionEjs);

const tableauBordEjs = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= titre %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    ${activerMultilingue === "o"
    ? `<div class="language-switcher">
        <a href="?lang=fr" class="btn btn-light">🇫🇷 Français</a>
        <a href="?lang=en" class="btn btn-light">🇬🇧 English</a>
    </div>`
    : ""
  }
    
    <nav class="navbar navbar-dark" style="background: linear-gradient(135deg, #1d2239 0%, #100c13 100%);">
        <div class="container">
            <span class="navbar-brand fw-bold">${nomProjet}</span>
            <div>
                <span class="text-white me-3"><%= utilisateur.nom_utilisateur %></span>
                <a href="/deconnexion" class="btn btn-outline-light btn-sm"><%= t ? t('common.logout') : 'Déconnexion' %></a>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="alert alert-info">
            <h4><%= t ? t('dashboard.welcome') : 'Bienvenue' %>, <%= utilisateur.nom_utilisateur %> !</h4>
            <p class="mb-0">${descriptionProjet}</p>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><%= t ? t('dashboard.accountInfo') : 'Informations du compte' %></h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Email:</strong> <%= utilisateur.email %></p>
                        <p><strong><%= t ? t('dashboard.memberSince') : 'Membre depuis' %>:</strong> <%= new Date(utilisateur.date_creation).toLocaleDateString('fr-FR') %></p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><%= t ? t('dashboard.statistics') : 'Statistiques' %></h5>
                    </div>
                    <div class="card-body">
                        <p>Bienvenue sur votre tableau de bord</p>
                        <hr>
                        <p class="text-muted small mb-0">Projet généré par KUAKUA MATALATALA ISAAC</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="/js/main.js"></script>
    ${inclureSocketIO === "o" ? '<script src="/socket.io/socket.io.js"></script>' : ""}
</body>
</html>`;

ecrireFichier("views/tableau-de-bord.ejs", tableauBordEjs);

const accueilEjs = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= titre %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container mt-5">
        <div class="card text-center">
            <div class="card-header">
                <h1 class="display-4"><%= message %></h1>
            </div>
            <div class="card-body">
                <p class="lead">Ce projet a été généré par <strong>KUAKUA MATALATALA ISAAC</strong></p>
                <hr>
                <p>Utilisez les commandes  pour créer vos modèles et contrôleurs</p>
                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="alert alert-info">
                            <h5>Commandes disponibles</h5>
                            <code>npm run make:model Article titre:string</code><br>
                            <code>npm run make:controller Article</code><br>
                            <code>npm run migrate</code>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="alert alert-success">
                            <h5>Prochaines étapes</h5>
                            1. Créez vos modèles<br>
                            2. Créez vos contrôleurs<br>
                            3. Personnalisez les vues
                        </div>
                    </div>
                </div>
                <a class="btn btn-primary btn-lg mt-3" href="/connexion" role="button">Commencer l'aventure →</a>
            </div>
            <div class="card-footer text-muted">
                © ${annee} - KUAKUA MATALATALA ISAAC
            </div>
        </div>
    </div>
    <script src="/js/main.js"></script>
</body>
</html>`;

ecrireFichier("views/accueil.ejs", accueilEjs);

const notFoundEjs = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= titre %></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container text-center mt-5">
        <div class="card">
            <div class="card-header">
                <h1 class="display-1">404</h1>
            </div>
            <div class="card-body">
                <h3>Page non trouvée</h3>
                <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <a href="/" class="btn btn-primary">Retour à l'accueil</a>
            </div>
        </div>
    </div>
</body>
</html>`;

ecrireFichier("views/404.ejs", notFoundEjs);

// ==================== package.json ====================
const packageJson = {
  name: nomProjet.toLowerCase().replace(/\s+/g, "-"),
  version: "2.0.0",
  description: descriptionProjet,
  main: "server.js",
  scripts: {
    start: "node server.js",
    dev: "nodemon server.js",
    creator: "node cli.js",
    "make:model": "node cli.js make:model",
    "make:controller": "node cli.js make:controller",
    "make:migration": "node cli.js make:migration",
    "make:seed": "node cli.js make:seed",
    "make:middleware": "node cli.js make:middleware",
    migrate: "node cli.js migrate",
    "db:seed": "node cli.js db:seed",
    "route:list": "node cli.js route:list",
  },
  dependencies: {
    express: "^4.18.2",
    ejs: "^3.1.9",
    sqlite3: "^6.0.1",
    bcryptjs: "^2.4.3",
    "express-session": "^1.17.3",
    "body-parser": "^1.20.2",
    chalk: "^5.3.0",
  },
  devDependencies: {
    nodemon: "^3.0.1",
  },
};

if (inclureSocketIO === "o") {
  packageJson.dependencies["socket.io"] = "^4.6.1";
}

ecrireFichier("package.json", JSON.stringify(packageJson, null, 2));

// ==================== server.js ====================
let serverContent = `// server.js - Point d'entrée principal
// Développé par KUAKUA MATALATALA ISAAC

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
${inclureSocketIO === "o"
    ? `const http = require("http");
const socketIo = require("socket.io");`
    : ""
  }

const { initialiserBaseDonnees } = require("./config/database");
${activerMultilingue === "o" ? `const i18n = require("./config/i18n");` : ""}
const routesAuth = require("./routes/authRoutes");
const routesWeb = require("./routes/web");

const app = express();
${inclureSocketIO === "o"
    ? `const server = http.createServer(app);
const io = socketIo(server);`
    : ""
  }
const PORT = process.env.PORT || 3000;

initialiserBaseDonnees();

app.use(session({
  secret: process.env.SESSION_SECRET || "monSecretSuperSecurise",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.projetNom = "${nomProjet}";
  res.locals.annee = ${annee};
  next();
});

app.use("/", routesAuth);
app.use("/", routesWeb);

${inclureSocketIO === "o"
    ? `
io.on("connection", (socket) => {
  console.log("🔌 Nouvel utilisateur connecté:", socket.id);
  socket.emit("notification", { message: "Bienvenue sur l'application !", type: "success" });
  
  socket.on("disconnect", () => {
    console.log("🔌 Utilisateur déconnecté:", socket.id);
  });
});
`
    : ""
  }

app.use((req, res) => {
  res.status(404).render("404", { titre: "Page non trouvée" });
});

${inclureSocketIO === "o" ? `server.listen(PORT, () => {` : `app.listen(PORT, () => {`}
  console.log("\\n" + "=".repeat(60));
  console.log("SERVEUR DÉMARRÉ AVEC SUCCÈS");
  console.log("=".repeat(60));
  console.log(\`http://localhost:\${PORT}\`);
  console.log(\`Projet: ${nomProjet}\`);
  console.log(\`Développé par KUAKUA MATALATALA ISAAC\`);
  console.log("=".repeat(60) + "\\n");
});`;

ecrireFichier("server.js", serverContent);

// ==================== README.md ====================
const readmeContent = `# ${nomProjet}

## Description
${descriptionProjet}

## Développé par
**KUAKUA MATALATALA ISAAC**

## Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Commandes Creator (CLI)

\`\`\`bash
# Créer un modèle
npm run make:model Article titre:string contenu:text user_id:integer

# Créer un contrôleur
npm run make:controller Article

# Créer une migration
npm run make:migration create_articles_table

# Exécuter les migrations
npm run migrate

# Créer un seeder
npm run make:seed ArticleSeeder

# Exécuter les seeders
npm run db:seed

# Créer un middleware
npm run make:middleware AuthMiddleware

# Lister toutes les routes
npm run route:list

# Aide générale
npm run creator help
\`\`\`

## Structure du projet

\`\`\`
${nomProjet}/
├── app/
│   ├── controllers/     # Contrôleurs de l'application
│   ├── models/          # Modèles de données
│   └── middleware/      # Middlewares personnalisés
├── config/              # Fichiers de configuration
├── database/            # Base de données SQLite
├── public/              # Fichiers statiques (CSS, JS)
├── routes/              # Définition des routes
├── views/               # Templates EJS
├── cli.js               # Console Creator
└── server.js            # Point d'entrée
\`\`\`

## Accès
http://localhost:3000

## Technologies
- Node.js / Express.js
- SQLite3
- EJS
- Bootstrap 5
- Creator CLI personnalisé
${inclureSocketIO === "o" ? "- Socket.IO" : ""}
${activerMultilingue === "o" ? "- i18n (Français/Anglais)" : ""}

---
© ${annee} - KUAKUA MATALATALA ISAAC
`;

ecrireFichier("README.md", readmeContent);

// ==================== .gitignore ====================
const gitignoreContent = `node_modules/
database/*.db
database/*.sqlite
.env
.DS_Store
*.log
.vscode/
.idea/
*.tmp
Thumbs.db`;

ecrireFichier(".gitignore", gitignoreContent);

// ==================== .env.example ====================
const envExampleContent = `# Fichier d'environnement
PORT=3000
SESSION_SECRET=votre_secret_super_securise`;

ecrireFichier(".env.example", envExampleContent);

// ==================== cli.js (Creator complet) ====================
const cliContent = `#!/usr/bin/env node
// cli.js - Console de commandes personnalisée
// Développé par KUAKUA MATALATALA ISAAC

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = {
  info: (msg) => console.log(chalk.cyan(\`ℹ️ \${msg}\`)),
  success: (msg) => console.log(chalk.green(\`✅ \${msg}\`)),
  error: (msg) => console.log(chalk.red(\`❌ \${msg}\`)),
  warning: (msg) => console.log(chalk.yellow(\`⚠️ \${msg}\`)),
  title: (msg) => console.log(\`\\n\${chalk.bold.blue(msg)}\\n\`),
};

function getSQLType(type) {
  const types = {
    'string': 'TEXT',
    'text': 'TEXT',
    'integer': 'INTEGER',
    'int': 'INTEGER',
    'float': 'REAL',
    'boolean': 'INTEGER',
    'date': 'DATE',
    'datetime': 'DATETIME'
  };
  return types[type.toLowerCase()] || 'TEXT';
}

const commands = {
  'make:model': async (args) => {
    if (!args[0]) {
      log.error("Spécifiez le nom du modèle");
      log.info("Usage: node cli.js make:model NomModele [field1:type field2:type ...]");
      return;
    }
    
    const modelName = args[0];
    const fields = [];
    
    for (let i = 1; i < args.length; i++) {
      const [name, type] = args[i].split(':');
      if (name && type) {
        fields.push({ name, type: getSQLType(type), nullable: false });
      }
    }
    
    const className = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const tableName = modelName.toLowerCase() + "s";
    
    let fieldsSQL = fields.map(f => \`\${f.name} \${f.type} NOT NULL\`).join(',\\n      ');
    let fieldsProps = fields.map(f => \`    this.\${f.name} = data.\${f.name} || null;\`).join('\\n');
    let fieldsCreate = fields.map(f => \`this.\${f.name}\`).join(', ');
    let fieldsUpdate = fields.map(f => \`\${f.name} = ?\`).join(', ');
    
    const content = \`// app/models/\${className}.js
const { db } = require("../../config/database");

class \${className} {
  constructor(data = {}) {
    this.id = data.id || null;
\${fieldsProps}
    this.date_creation = data.date_creation || null;
    this.date_modification = data.date_modification || null;
  }

  save(callback) {
    if (this.id) {
      this.update(callback);
    } else {
      this.create(callback);
    }
  }

  create(callback) {
    const fields = [\${fields.map(f => \`'\${f.name}'\`).join(', ')}];
    const values = [\${fieldsCreate}];
    const placeholders = values.map(() => '?').join(', ');
    
    db.run(
      \\\`INSERT INTO \${tableName} (\${fields.join(', ')}) VALUES (\${placeholders})\\\`,
      values,
      function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  update(callback) {
    const values = [\${fieldsCreate}, this.id];
    db.run(
      \\\`UPDATE \${tableName} SET \${fieldsUpdate}, date_modification = CURRENT_TIMESTAMP WHERE id = ?\\\`,
      values,
      callback
    );
  }

  delete(callback) {
    db.run(\\\`DELETE FROM \${tableName} WHERE id = ?\\\`, [this.id], callback);
  }

  static find(id, callback) {
    db.get(\\\`SELECT * FROM \${tableName} WHERE id = ?\\\`, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (row) {
        callback(null, new \${className}(row));
      } else {
        callback(null, null);
      }
    });
  }

  static all(callback) {
    db.all(\\\`SELECT * FROM \${tableName} ORDER BY id DESC\\\`, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new \${className}(row)));
      }
    });
  }

  static where(conditions, callback) {
    let sql = \\\`SELECT * FROM \${tableName}\\\`;
    const values = [];
    if (conditions && typeof conditions === 'object') {
      const clauses = [];
      for (const [key, value] of Object.entries(conditions)) {
        clauses.push(\\\`\${key} = ?\\\`);
        values.push(value);
      }
      if (clauses.length) {
        sql += ' WHERE ' + clauses.join(' AND ');
      }
    }
    db.all(sql, values, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows.map(row => new \${className}(row)));
      }
    });
  }

  static createTable(callback) {
    db.run(\\\`
      CREATE TABLE IF NOT EXISTS \${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        \${fieldsSQL}\${fields.length > 0 ? ',' : ''}
        date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
        date_modification DATETIME
      )
    \\\`, callback);
  }
}

module.exports = \${className};\`;
    
    const filePath = path.join(__dirname, 'app', 'models', \`\${modelName}.js\`);
    fs.writeFileSync(filePath, content);
    log.success(\`Modèle \${modelName} créé avec succès !\`);
    
    try {
      const { db } = await import("./config/database.js");
      const ModelClass = await import(filePath);
      if (ModelClass.default && ModelClass.default.createTable) {
        ModelClass.default.createTable((err) => {
          if (err) {
            log.error(\`Erreur création table: \${err.message}\`);
          } else {
            log.success(\`Table \${tableName} créée avec succès !\`);
          }
        });
      }
    } catch (err) {
      log.warning("Modèle créé, veuillez créer la table manuellement avec npm run migrate");
    }
  },

  'make:controller': (args) => {
    if (!args[0]) {
      log.error("Spécifiez le nom du contrôleur");
      log.info("Usage: node cli.js make:controller NomController");
      return;
    }
    
    const controllerName = args[0];
    const className = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);
    
    const content = \`// app/controllers/\${className}.js
// Développé par KUAKUA MATALATALA ISAAC

const \${className}Controller = {
  index: (req, res) => {
    res.json({ message: "Liste des éléments" });
  },

  show: (req, res) => {
    const { id } = req.params;
    res.json({ message: \\\`Détail de l'élément \${id}\\\` });
  },

  create: (req, res) => {
    res.json({ message: "Formulaire de création" });
  },

  store: (req, res) => {
    const data = req.body;
    res.json({ message: "Élément créé", data });
  },

  edit: (req, res) => {
    const { id } = req.params;
    res.json({ message: \\\`Formulaire d'édition de l'élément \${id}\\\` });
  },

  update: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    res.json({ message: \\\`Élément \${id} mis à jour\\\`, data });
  },

  delete: (req, res) => {
    const { id } = req.params;
    res.json({ message: \\\`Élément \${id} supprimé\\\` });
  }
};

module.exports = \${className}Controller;\`;
    
    const filePath = path.join(__dirname, 'app', 'controllers', \`\${controllerName}.js\`);
    fs.writeFileSync(filePath, content);
    log.success(\`Contrôleur \${controllerName} créé avec succès !\`);
  },

  'make:middleware': (args) => {
    if (!args[0]) {
      log.error("Spécifiez le nom du middleware");
      return;
    }
    
    const middlewareName = args[0];
    const content = \`// app/middleware/\${middlewareName}.js
// Développé par KUAKUA MATALATALA ISAAC

const \${middlewareName} = (req, res, next) => {
  // Logique du middleware
  console.log(\\\`Middleware \${middlewareName} exécuté\\\`);
  next();
};

module.exports = \${middlewareName};\`;
    
    const filePath = path.join(__dirname, 'app', 'middleware', \`\${middlewareName}.js\`);
    fs.writeFileSync(filePath, content);
    log.success(\`Middleware \${middlewareName} créé avec succès !\`);
  },

  'make:migration': (args) => {
    if (!args[0]) {
      log.error("Spécifiez le nom de la migration");
      return;
    }
    
    const migrationName = args[0];
    const timestamp = Date.now();
    const filename = \`\${timestamp}_\${migrationName}.js\`;
    
    const content = \`// database/migrations/\${filename}
// Développé par KUAKUA MATALATALA ISAAC

const { db } = require("../../config/database");

exports.up = () => {
  return new Promise((resolve, reject) => {
    db.run(\\\`
      CREATE TABLE IF NOT EXISTS example (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    \\\`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

exports.down = () => {
  return new Promise((resolve, reject) => {
    db.run(\\\`DROP TABLE IF EXISTS example\\\`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};\`;
    
    const filePath = path.join(__dirname, 'database', 'migrations', filename);
    fs.writeFileSync(filePath, content);
    log.success(\`Migration créée: \${filename}\`);
  },

  'migrate': async () => {
    log.info("Exécution des migrations...");
    const migrationsDir = path.join(__dirname, 'database', 'migrations');
    
    if (!fs.existsSync(migrationsDir)) {
      log.warning("Aucun dossier migrations trouvé");
      return;
    }
    
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.js'));
    
    if (files.length === 0) {
      log.warning("Aucune migration trouvée");
      return;
    }
    
    for (const file of files) {
      try {
        const migration = await import(path.join(migrationsDir, file));
        if (migration.up) {
          await migration.up();
          log.success(\`Migration \${file} exécutée\`);
        }
      } catch (err) {
        log.error(\`Erreur migration \${file}: \${err.message}\`);
      }
    }
  },

  'db:seed': () => {
    log.info("Exécution des seeders...");
    const seedersDir = path.join(__dirname, 'database', 'seeders');
    
    if (!fs.existsSync(seedersDir)) {
      log.warning("Aucun dossier seeders trouvé");
      return;
    }
    
    const files = fs.readdirSync(seedersDir).filter(f => f.endsWith('.js'));
    
    files.forEach(file => {
      try {
        const seeder = require(path.join(seedersDir, file));
        if (seeder.run) {
          seeder.run();
          log.success(\`Seeder \${file} exécuté\`);
        }
      } catch (err) {
        log.error(\`Erreur seeder \${file}: \${err.message}\`);
      }
    });
  },

  'make:seed': (args) => {
    if (!args[0]) {
      log.error("Spécifiez le nom du seeder");
      return;
    }
    
    const seederName = args[0];
    const content = \`// database/seeders/\${seederName}.js
// Développé par KUAKUA MATALATALA ISAAC

const { db } = require("../../config/database");

exports.run = () => {
  console.log("Exécution du seeder \${seederName}");
  // Ajoutez vos données ici
  // db.run("INSERT INTO ...");
};\`;
    
    const filePath = path.join(__dirname, 'database', 'seeders', \`\${seederName}.js\`);
    fs.writeFileSync(filePath, content);
    log.success(\`Seeder \${seederName} créé avec succès !\`);
  },

  'route:list': () => {
    log.title("Liste des routes");
    console.log(\`
\${chalk.cyan('GET')}    /                 → Redirection vers connexion
\${chalk.cyan('GET')}    /connexion        → Afficher le formulaire de connexion
\${chalk.cyan('POST')}   /connexion        → Traiter la connexion
\${chalk.cyan('GET')}    /inscription      → Afficher le formulaire d'inscription
\${chalk.cyan('POST')}   /inscription      → Traiter l'inscription
\${chalk.cyan('GET')}    /tableau-de-bord  → Tableau de bord (protégé)
\${chalk.cyan('GET')}    /deconnexion      → Déconnexion
\${chalk.cyan('GET')}    /accueil          → Page d'accueil
\`);
  },

  'help': () => {
    log.title("📚 Commandes Creator disponibles");
    console.log(\`
\${chalk.bold.green('Création')}
  \${chalk.cyan('make:model')}      - Créer un modèle
  \${chalk.cyan('make:controller')} - Créer un contrôleur
  \${chalk.cyan('make:migration')}  - Créer une migration
  \${chalk.cyan('make:seed')}       - Créer un seeder
  \${chalk.cyan('make:middleware')} - Créer un middleware

\${chalk.bold.green('Base de données')}
  \${chalk.cyan('migrate')}         - Exécuter les migrations
  \${chalk.cyan('db:seed')}         - Exécuter les seeders

\${chalk.bold.green('Utilitaires')}
  \${chalk.cyan('route:list')}      - Lister toutes les routes
  \${chalk.cyan('help')}            - Afficher cette aide

\${chalk.yellow('Exemples:')}
  node cli.js make:model Article titre:string contenu:text
  node cli.js make:controller ArticleController
  node cli.js make:middleware AuthMiddleware
  node cli.js migrate
  \`);
  }
};

const command = process.argv[2];
const args = process.argv.slice(3);

if (commands[command]) {
  commands[command](args);
} else {
  if (command) log.error(\`Commande inconnue: \${command}\`);
  commands.help();
}`;

ecrireFichier("cli.js", cliContent);

// Rendre cli.js exécutable
try {
  fs.chmodSync("cli.js", 0o755);
} catch (err) {
  // Ignorer les erreurs sur Windows
}

// Fermeture de l'interface
rl.close();

// Affichage du résumé final
console.log("\n" + "=".repeat(60));
console.log(`     ${t.completed}`);
console.log("=".repeat(60));
console.log(`\n Récapitulatif du projet :`);
console.log(`   Nom : ${nomProjet}`);
console.log(`   Description : ${descriptionProjet}`);
console.log(`   Auteur : KUAKUA MATALATALA ISAAC`);
console.log(
  `   Socket.IO : ${inclureSocketIO === "o" ? "Activé" : "Désactivé"}`,
);
console.log(
  `   Multilingue : ${activerMultilingue === "o" ? "Activé" : "Désactivé"}`,
);
console.log(`\n ${t.nextSteps}`);
console.log(`   ${t.install}`);
console.log(`   ${t.dev}`);
console.log(`   ${t.Creator}`);
console.log(`   ${t.access}`);
console.log(`\n${t.happyCoding}`);
console.log("=".repeat(60));
