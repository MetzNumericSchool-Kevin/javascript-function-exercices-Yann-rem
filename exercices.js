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

// Exercice 2 : Quel est le tarif d'une potion ?
const tarif = (id, inventaire, quantite = 1) => {
  const potion = inventaire.find((p) => p.id === id);
  return potion ? potion.prix * quantite : 0;
};

console.log(tarif("potion_soin", inventaire, 3));

// Exercice 3 : Fabrication de potion
const fabrication = (id, prix = 10, stock = 1) => {
  return { id, prix, stock };
};

console.log(fabrication("potion_mana", 10, 5));
console.log(fabrication("potion_endurance", 5, 10));
console.log(fabrication("potion_vitesse", 10, 15));
console.log(fabrication("potion_force", 15, 8));
