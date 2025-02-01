// Constantes
const nom_sorcier = "Archibald 🧙‍♂️";

const manuel_de_fabrication = {
  potion_soin: {
    ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
    temps_de_fabrication: 3, // exprimé en secondes
  },
};

const inventaire = [
  {
    id: "potion_soin", // identifiant unique de la potion
    prix: 10,
    stock: 0,
  },
];

// Exercice 1 : Salutation Aventurier
const salutations = (nom) => {
  return console.log(`Salutations Aventurier ! Je me nomme ${nom} pour vous servir.`);
};

salutations(nom_sorcier);
