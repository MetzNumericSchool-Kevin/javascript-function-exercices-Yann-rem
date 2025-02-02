// Constantes
const nom_sorcier = "Archibald 🧙‍♂️";

const manuel_de_fabrication = {
  potion_soin: {
    ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
    temps_de_fabrication: 10, // exprimé en secondes
  },
};

const inventaire = [
  {
    id: "potion_soin", // identifiant unique de la potion
    prix: 10,
    stock: 0,
  },
];

// Fonction utilitaire pour comparer deux tableaux
const compare_tableau = (tb1, tb2) => {
  if (tb1.length !== tb2.length) return false;
  const tb1Trie = [...tb1].sort();
  const tb2Trie = [...tb2].sort();

  for (let i = 0; i < tb1Trie.length; i++) {
    if (tb1Trie[i] !== tb2Trie[i]) {
      return false;
    }
  }
  return true;
};

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

// Exercice 6 : Allons faire de la cueillette, nous avons besoin de plus de potions !

/*
const fabriquer_potion = ({ id, prix = 10, stock = 1, ingredients }) => {
  try {
    const potion = manuel_de_fabrication[id] || null;

    if (!potion) {
      throw new Error(`La potion "${id}" n'existe pas dans le manuel de fabrication.`);
    }

    if (!compare_tableau(potion.ingredients, ingredients)) {
      throw new Error(`Les ingrédients fournis pour la potion "${id}" sont incorrects.`);
    }

    return { id, prix, stock };
  } catch (error) {
    console.error("Erreur lors de la fabrication :", error.message);

    return null;
  }
};

const nouvelles_potions = [
  { id: "potion_soin", stock: 8, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
  { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon", "dent_de_dragon"] },
  { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon"] },
  { id: "potion_mana", ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
];

nouvelles_potions.forEach((p) => {
  const potion = fabriquer_potion(p);

  if (potion) {
    ajouter(inventaire, potion);
  }
});

console.table(inventaire);
*/

// Exercice 7 : Une potion n'est jamais fabriquée en retard, ni en avance d'ailleurs. Elle est fabriquée
// précisément à l'heure prévue !

// const nouvelles_potions = [
//   { id: "potion_soin", stock: 5, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
//   { id: "potion_soin", stock: 10, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
//   { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon", "dent_de_dragon"] },
//   { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon"] },
//   { id: "potion_mana", ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
//   { id: "potion_soin", stock: 5, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
// ];

// Exercice 8 : Une potion n'est jamais fabriquée en retard, ni en avance d'ailleurs. Elle est fabriquée précisément
// à l'heure prévue !

/*
const potionEstFinie = (potion) => {
  console.log("Fabrication de la potion finie :", potion);
  ajouter(inventaire, potion);
  console.table(inventaire);
};

const fabriquerPotion = ({ id, prix = 10, stock = 1, ingredients }, callback) => {
  try {
    const potion = manuel_de_fabrication[id] || null;

    if (!potion) {
      throw new Error(`La potion "${id}" n'existe pas dans le manuel de fabrication.`);
    }

    if (!compare_tableau(potion.ingredients, ingredients)) {
      throw new Error(`Les ingrédients fournis pour la potion "${id}" sont incorrects.`);
    }

    setTimeout(() => {
      const nouvelle_potion = { id, prix, stock };

      callback(nouvelle_potion);
    }, potion.temps_de_fabrication * 1000);
  } catch (error) {
    console.error("Erreur lors de la fabrication :", error.message);

    return null;
  }
};

fabriquerPotion(
  { id: "potion_soin", stock: 8, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
  potionEstFinie
);
*/

// Exercice 9 : Epreuve ultime, la fabrication de plusieurs inventaires indépendants

/*
const creationInventaire = () => {
  const inventaire = [];

  return {
    AjouterPotion(potion) {
      const index = inventaire.findIndex((p) => p.id === potion.id);

      index !== -1
        ? ((inventaire[index].stock += potion.stock), (inventaire[index].prix = potion.prix))
        : inventaire.push(potion);

      inventaire.sort((a, b) => b.prix - a.prix);
    },

    PotionsEnStock() {
      return inventaire.filter((potion) => potion.stock > 0);
    },

    PotionsEnRuptureDeStock() {
      return inventaire.filter((potion) => potion.stock === 0);
    },
  };
};

const inventaireBoutiquePotionsA = creationInventaire();
const inventaireBoutiquePotionsB = creationInventaire();

inventaireBoutiquePotionsA.ajouterPotion({ id: "potion_soin", stock: 5 });
inventaireBoutiquePotionsA.ajouterPotion({ id: "potion_mana", stock: 3 });

inventaireBoutiquePotionsB.ajouterPotion({ id: "potion_soin", stock: 0 });
inventaireBoutiquePotionsB.ajouterPotion({ id: "potion_force", stock: 7 });

console.log("Inventaire A - Potions en stock:");
console.table(inventaireBoutiquePotionsA.PotionsEnStock());

console.log("Inventaire A - Potions en rupture:");
console.table(inventaireBoutiquePotionsA.PotionsEnRuptureDeStock());

console.log("Inventaire B - Potions en stock:");
console.table(inventaireBoutiquePotionsB.PotionsEnStock());

console.log("Inventaire B - Potions en rupture:");
console.table(inventaireBoutiquePotionsB.PotionsEnRuptureDeStock());
*/

// Bonus : un sorcier a toujours la classe !
class Inventaire {
  constructor() {
    this.inventaire = [];
  }

  AjouterPotion(potion) {
    const index = inventaire.findIndex((p) => p.id === potion.id);

    index !== -1
      ? ((inventaire[index].stock += potion.stock), (inventaire[index].prix = potion.prix))
      : inventaire.push(potion);

    inventaire.sort((a, b) => b.prix - a.prix);
  }

  PotionsEnStock() {
    return inventaire.filter((potion) => potion.stock > 0);
  }

  PotionsEnRuptureDeStock() {
    return inventaire.filter((potion) => potion.stock === 0);
  }
}

const inventaireBoutiquePotionsA = new Inventaire();
const inventaireBoutiquePotionsB = new Inventaire();

inventaireBoutiquePotionsA.AjouterPotion({ id: "potion_soin", stock: 5 });
inventaireBoutiquePotionsA.AjouterPotion({ id: "potion_mana", stock: 3 });

inventaireBoutiquePotionsB.AjouterPotion({ id: "potion_soin", stock: 0 });
inventaireBoutiquePotionsB.AjouterPotion({ id: "potion_force", stock: 7 });

console.log("Inventaire A - Potions en stock:");
console.table(inventaireBoutiquePotionsA.PotionsEnStock());

console.log("Inventaire A - Potions en rupture:");
console.table(inventaireBoutiquePotionsA.PotionsEnRuptureDeStock());

console.log("Inventaire B - Potions en stock:");
console.table(inventaireBoutiquePotionsB.PotionsEnStock());

console.log("Inventaire B - Potions en rupture:");
console.table(inventaireBoutiquePotionsB.PotionsEnRuptureDeStock());
