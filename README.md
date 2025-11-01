// creation du projet eval-react avec npx create-expo-app@latest

// creation du repo git eval-react

// Arborescence du projet : J'ai organisé l'arborescence du projet en créant un dossier src à la racine de l'application, puis j'y ai ajouté les sous-dossiers screens, services, etc., pour mieux structurer les différentes parties de l'application.

// clone sur le repo de l'api api-books

// creation des vues et du service dans les bons packages

// Crud : 

Affichage de la liste des livres : Utilise useState pour stocker la liste des livres et useEffect pour charger les livres depuis ton API lors du chargement du composant.

Ajouter un livre : Utilise useState pour gérer le formulaire d'ajout, puis appelle addBook pour envoyer les données à l'API et mettre à jour la liste des livres après l'ajout.

Mettre à jour un livre : Quand un utilisateur modifie un livre, tu utilises un formulaire avec useState pour gérer les champs. Ensuite, appelle updateBook avec l'ID et les nouvelles données.

Supprimer un livre : Sur un bouton de suppression, appelle deleteBook avec l'ID du livre à supprimer, et mets à jour la liste en conséquence.


// Favoris : J'ai utilisé useState pour gérer un état favorite qui permet de marquer un livre comme favori avec une icône. Quand l'utilisateur clique dessus, l'état change et l'API est mise à jour.

// Notation : J'ai créé un état rating avec useState pour gérer la note. L'utilisateur sélectionne une note, ce qui met à jour l'état et envoie la nouvelle valeur à l'API.

// Filtres, Tri et Recherche : J'ai utilisé un état pour gérer les filtres (comme l'auteur, l'année, etc.). À chaque fois qu'un filtre est appliqué, un useEffect est déclenché pour mettre à jour l'affichage des livres.

// Image de couverture : L'image est gérée avec un état cover dans useState. Quand l'utilisateur choisit une nouvelle image via un bouton, l'URL de l'image est mise à jour et affichée.


// Résumé :
Je me suis arrêté au palier 18-19/20 car je n'ai pas avancé aussi rapidement que je l'aurais voulu. Les paliers précédents sont complets et toutes les fonctionnalités demandées sont fonctionnelles (CRUD, favoris, notation, images, etc.). J'ai créé un composant pour le header et le footer, que j'ai appliqué au layout pour les avoir partout dans l'application, et j'ai également travaillé sur l'UI pour rendre l'application plus esthétique.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
