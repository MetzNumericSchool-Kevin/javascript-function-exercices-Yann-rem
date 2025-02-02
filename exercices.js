// Constantes
const nomSorcier = "Archibald 🧙‍♂️";

const manuelDeFabrication = {
  potionSoin: {
    ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
    tempsDeFabrication: 10, // exprimé en secondes
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
const comparerTableaux = (tb1, tb2) => {
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
  console.log(`Salutations Aventurier ! Je me nomme ${nom} pour vous servir.`);
};

salutations(nomSorcier);

// Exercice 2 : Quel est le tarif d'une potion ?
const calculerTarifPotion = (id, inventaire, quantite = 1) => {
  const potion = inventaire.find((p) => p.id === id);
  return potion ? potion.prix * quantite : 0;
};

console.log(calculerTarifPotion("potion_soin", inventaire, 3));

// Exercice 3 : Fabrication de potion
const fabriquerPotion1 = (id, prix = 10, stock = 1) => {
  return { id, prix, stock };
};

// Exercice 4 : Ajout de nouvelles potions dans l'inventaire
const ajouterPotion = (inventaire, nouvellePotion) => {
  const index = inventaire.findIndex((p) => p.id === nouvellePotion.id);

  index !== -1
    ? ((inventaire[index].stock += nouvellePotion.stock), (inventaire[index].prix = nouvellePotion.prix))
    : inventaire.push(nouvellePotion);

  inventaire.sort((a, b) => b.prix - a.prix);
};

ajouterPotion(inventaire, fabriquerPotion1("potion_soin", 14, 5));
ajouterPotion(inventaire, fabriquerPotion1("potion_mana", 10, 5));
ajouterPotion(inventaire, fabriquerPotion1("potion_endurance", 8, 10));
ajouterPotion(inventaire, fabriquerPotion1("potion_vitesse", 12, 15));
ajouterPotion(inventaire, fabriquerPotion1("potion_force", 15, 0));

// Exercice 5 : Cherche moi les potions qui...
const potionsEnStock = () => {
  return inventaire.filter((p) => p.stock > 0);
};

const potionsEnRuptureDeStock = () => {
  return inventaire.filter((p) => p.stock === 0);
};

console.table(inventaire);
console.table(potionsEnStock());
console.table(potionsEnRuptureDeStock());

// Exercice 6 : Allons faire de la cueillette, nous avons besoin de plus de potions !
const fabriquerPotion2 = ({ id, prix = 10, stock = 1, ingredients }) => {
  try {
    const potion = manuelDeFabrication[id] || null;

    if (!potion) {
      throw new Error(`La potion "${id}" n'existe pas dans le manuel de fabrication.`);
    }

    if (!comparerTableaux(potion.ingredients, ingredients)) {
      throw new Error(`Les ingrédients fournis pour la potion "${id}" sont incorrects.`);
    }

    return { id, prix, stock };
  } catch (error) {
    console.error("Erreur lors de la fabrication :", error.message);

    return null;
  }
};

const nouvellesPotions = [
  { id: "potion_soin", stock: 8, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
  { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon", "dent_de_dragon"] },
  { id: "potion_soin", ingredients: ["eau_de_source", "ecaille_de_dragon"] },
  { id: "potion_mana", ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
];

nouvellesPotions.forEach((p) => {
  const potion = fabriquerPotion2(p);

  if (potion) {
    ajouterPotion(inventaire, potion);
  }
});

console.table(inventaire);

// Exercice 7 : Une potion n'est jamais fabriquée en retard, ni en avance d'ailleurs. Elle est fabriquée précisément
// à l'heure prévue !
const potionEstFinie = (potion) => {
  console.log("Fabrication de la potion finie :", potion);
  ajouterPotion(inventaire, potion);
  console.table(inventaire);
};

const fabriquerPotion3 = ({ id, prix = 10, stock = 1, ingredients }, callback) => {
  try {
    const potion = manuelDeFabrication[id] || null;

    if (!potion) {
      throw new Error(`La potion "${id}" n'existe pas dans le manuel de fabrication.`);
    }

    if (!comparerTableaux(potion.ingredients, ingredients)) {
      throw new Error(`Les ingrédients fournis pour la potion "${id}" sont incorrects.`);
    }

    setTimeout(() => {
      const nouvellePotion = { id, prix, stock };

      callback(nouvellePotion);
    }, potion.tempsDeFabrication * 1000);
  } catch (error) {
    console.error("Erreur lors de la fabrication :", error.message);

    return null;
  }
};

fabriquerPotion3(
  { id: "potion_soin", stock: 8, ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"] },
  potionEstFinie
);

// Exercice 9 : Epreuve ultime, la fabrication de plusieurs inventaires indépendants
const creationInventaire = () => {
  const inventaire = [];

  return {
    ajouterPotion(potion) {
      const index = inventaire.findIndex((p) => p.id === potion.id);

      index !== -1
        ? ((inventaire[index].stock += potion.stock), (inventaire[index].prix = potion.prix))
        : inventaire.push(potion);

      inventaire.sort((a, b) => b.prix - a.prix);
    },

    potionsEnStock() {
      return inventaire.filter((potion) => potion.stock > 0);
    },

    potionsEnRuptureDeStock() {
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
console.table(inventaireBoutiquePotionsA.potionsEnStock());

console.log("Inventaire A - Potions en rupture:");
console.table(inventaireBoutiquePotionsA.potionsEnRuptureDeStock());

console.log("Inventaire B - Potions en stock:");
console.table(inventaireBoutiquePotionsB.potionsEnStock());

console.log("Inventaire B - Potions en rupture:");
console.table(inventaireBoutiquePotionsB.potionsEnRuptureDeStock());

// Bonus : un sorcier a toujours la classe !
class Inventaire {
  constructor() {
    this.inventaire = [];
  }

  ajouterPotion(potion) {
    const index = this.inventaire.findIndex((p) => p.id === potion.id);

    index !== -1
      ? ((this.inventaire[index].stock += potion.stock), (this.inventaire[index].prix = potion.prix))
      : this.inventaire.push(potion);

    this.inventaire.sort((a, b) => b.prix - a.prix);
  }

  potionsEnStock() {
    return this.inventaire.filter((potion) => potion.stock > 0);
  }

  potionsEnRuptureDeStock() {
    return this.inventaire.filter((potion) => potion.stock === 0);
  }
}

const inventaireBoutiqueA = new Inventaire();
const inventaireBoutiqueB = new Inventaire();

inventaireBoutiqueA.ajouterPotion({ id: "potion_soin", stock: 5 });
inventaireBoutiqueA.ajouterPotion({ id: "potion_mana", stock: 3 });

inventaireBoutiqueB.ajouterPotion({ id: "potion_soin", stock: 0 });
inventaireBoutiqueB.ajouterPotion({ id: "potion_force", stock: 7 });

console.log("Inventaire A - Potions en stock:");
console.table(inventaireBoutiqueA.potionsEnStock());

console.log("Inventaire A - Potions en rupture:");
console.table(inventaireBoutiqueA.potionsEnRuptureDeStock());

console.log("Inventaire B - Potions en stock:");
console.table(inventaireBoutiqueB.potionsEnStock());

console.log("Inventaire B - Potions en rupture:");
console.table(inventaireBoutiqueB.potionsEnRuptureDeStock());
