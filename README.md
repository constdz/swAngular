# SwApp

Application Angular permettant d'accèder à l'API Star Wars (https://swapi.py4e.com/api/)

## Prérequis
- node version 20.5.0 (or plus)
- npm version 10.5.2 (or plus)
- AngularCLI version 17.3.5 (ou plus)

## Intallation
Lancer *npm i* à la racine du projet afin d'installer les dépendances.

## Lancement
Lancer *npm start* à la racine du projet afin de lancer l'application.
Elle sera accessible à *localhost/4200*.

## Démarche
- Le routing de l'appli reprend celui de l'api, *people/2* permet d'accèder aux détails du personnage 2, *vehicles/14* au véhicule 14, etc...
- Pour l'autocomplete, j'ai utilisé celui de Angular Material. Afin d'obtenir la liste des noms de personnages associés avec leur id, je parcours le endpoint */people* récursivement au lancement de l'appli. Afin de lancer la recherche et voir les détails du personnage, appuyer sur Entrée une fois que le nom est sélectionné.
- J'ai crée un component par type d'item à afficher en détail (Personnage, Film, Planète, Véhicule, Vaisseau, Espèce). Les numéros affichés entre crochets sont des liens cliquables afin de naviguer entre les détails des différents items.
- J'ai crée 3 services :
  -- un service Environnement pour les variables d'environnement
  -- un service Rest pour les appels API
  -- un service Name pour stocker les noms des personnages (pour l'autocomplete)
- Les erreurs sont gérées à l'aide d'un *pipe* et d'un handler pour les erreurs dans le *RestService* (ex : localhost:4200/people/100 pour déclencher une erreur)

## Points à améliorer
- Pour les planètes, véhicules, etc… les noms ne sont pas encore affichés mais un lien pour accéder à une description détaillée. 
- Il peut-être opportun de remplacer les structures contenant les données à afficher par des *Promises* afin d'éviter l'erreur *ctx.character is undefined* qui précède le chargement des données (l'erreur est bénigne et n'impacte pas le fonctionnement de l'appli).
