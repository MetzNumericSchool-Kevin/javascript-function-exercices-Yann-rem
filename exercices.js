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

// Exercice 4 : Ajout de nouvelles potions dans l'inventaire
const ajouter = (inventaire, nouvelle_potion) => {
  const index = inventaire.findIndex((p) => p.id === nouvelle_potion.id);

  index !== -1
    ? ((inventaire[index].stock += nouvelle_potion.stock), (inventaire[index].prix = nouvelle_potion.prix))
    : inventaire.push(nouvelle_potion);

  inventaire.sort((a, b) => b.prix - a.prix);
};

ajouter(inventaire, fabrication("potion_soin", 14, 5));
ajouter(inventaire, fabrication("potion_mana", 10, 5));
ajouter(inventaire, fabrication("potion_endurance", 8, 10));
ajouter(inventaire, fabrication("potion_vitesse", 12, 15));
ajouter(inventaire, fabrication("potion_force", 15, 0));

// Exercice 5 : Cherche moi les potions qui...
const lister_potions_disponibles = () => {
  return inventaire.filter((p) => p.stock > 0);
};

const lister_potions_indisponibles = () => {
  return inventaire.filter((p) => p.stock === 0);
};

console.table(inventaire);
console.table(lister_potions_disponibles());
console.table(lister_potions_indisponibles());
