# P7 - Créez un réseau social d’entreprise

## Compétences évaluées

-   Gérer un stockage de données à l'aide de SQL

-   Personnaliser le contenu envoyé à un client web

-   Implémenter un stockage de données sécurisé en utilisant SQL

-   Authentifier un utilisateur et maintenir sa session

# Installez l'application de Groupomania

# Backend

Le backend a été crée avec **Node.js**, **Express.js** et **MySQL** comme base de données.
<br />

### Installation

-   Dans le terminal de VSCODE, situez-vous dans le dossier `/backend`.
    <br />
-   Démarrer `npm install` pour installer toutes les dependencies du backend.
    <br />
-   Dans le fichier `.env`, veuillez rentrer le host, les identifiants de votre utilisateur admin et le nom de la base de données que vous souhaitez créer.
    <br />
-   Écrivez dans la ligne de commande `node config_db.js` pour configurer la base de données.

### Development server

Démarrer `nodemon server` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

# Frontend

Le frontend a été crée avec React.js

### Installation

Dans le dossier `/frontend` démarrez `npm install` pour installer toutes les dépendances du frontend.

### Development server

Démarrer `npm start` pour avoir accès au serveur de développement. L'application va se recharger automatiquement si vous modifiez un fichier source.

## Droits Admin

Pour tester les droits d'admin, changez le valeur sur le champ account dans le tableau users, de user pour admin.
