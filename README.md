_Copy .env.example to a .env file_
  
## Running app

-  `npm install`
-  `npm run dev`

## Proposition de modèle
**marques**
 ```js  
{
  "nom": "Marque ex2",
  "pays": "France",
  "siteWeb": "http://www.marqueexemple.com",
  "anneeCreation": 1950,
  "flippers": ["UnIdDeflipperExistant ou supprimer cette ligne si il y'a pas de flipper"]
}
```
**flippers**
 ```js   
{
  "nom": "Flipper exxx",
  "marque": "UnIdDeMarque",
  "anneeFabrication": 1980,
  "description": "Description du flipper exemple",
  "images": ["image1.jpg", "image2.jpg"],
  "prix": 1000,
  "etat": "Neuf",
  "quantite": 5,
  "note": 4.5,
  "showQuantity": true,
  "guidePdfPath": "path/to/guide.pdf"
}
```

## Optimisation
**Search**
Afin d'optimiser le search il faudrait utiliser des indexes textuels qui permettent de réaliser des recherches textuelles efficaces

**Améliorer les performances**
Mettre en place une pagination pour charger les données petit à petit