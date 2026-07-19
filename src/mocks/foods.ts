// Données factices (avec vraies images locales) utilisées quand l'API est
// injoignable en dev — voir useFoodStore.
import food1 from "../assets/food_1.png";
import food2 from "../assets/food_2.png";
import food3 from "../assets/food_3.png";
import food4 from "../assets/food_4.png";
import food5 from "../assets/food_5.png";
import food6 from "../assets/food_6.png";
import food7 from "../assets/food_7.png";
import food8 from "../assets/food_8.png";
import food9 from "../assets/food_9.png";
import food10 from "../assets/food_10.png";
import food11 from "../assets/food_11.png";
import food12 from "../assets/food_12.png";
import food13 from "../assets/food_13.png";
import food14 from "../assets/food_14.png";
import food15 from "../assets/food_15.png";
import food16 from "../assets/food_16.png";
import food17 from "../assets/food_17.png";
import food18 from "../assets/food_18.png";
import food19 from "../assets/food_19.png";
import food20 from "../assets/food_20.png";
import food21 from "../assets/food_21.png";
import food22 from "../assets/food_22.png";
import tomates from "../assets/tomates.png";
import vinaigrette from "../assets/vinaigrette.png";

export const mockFoods = [
  {
    _id: "mock-food-1",
    name: "Thiéboudienne",
    description: "Riz au poisson, légumes mijotés, sauce tomate.",
    price: 3500,
    image: food1,
    category: "Plats",
    sousCategory: "",
  },
  {
    _id: "mock-food-2",
    name: "Yassa Poulet",
    description: "Poulet mariné aux oignons et au citron.",
    price: 3000,
    image: food2,
    category: "Plats",
    sousCategory: "",
  },
  {
    _id: "mock-food-3",
    name: "Mafé",
    description: "Ragoût de viande à la pâte d'arachide.",
    price: 3200,
    image: food3,
    category: "Plats",
    sousCategory: "",
  },
  {
    _id: "mock-food-4",
    name: "Poulet Braisé",
    description: "Poulet grillé aux épices, frites maison.",
    price: 3800,
    image: food4,
    category: "Plats",
    sousCategory: "",
  },
  {
    _id: "mock-food-5",
    name: "Poisson Braisé",
    description: "Poisson grillé, oignons caramélisés, riz.",
    price: 4000,
    image: food5,
    category: "Plats",
    sousCategory: "",
  },
  {
    _id: "mock-food-6",
    name: "Pastels",
    description: "Beignets farcis au poisson, croustillants.",
    price: 1500,
    image: food6,
    category: "Entrées",
    sousCategory: "",
  },
  {
    _id: "mock-food-7",
    name: "Accras de crevettes",
    description: "Beignets moelleux aux crevettes épicées.",
    price: 2000,
    image: food7,
    category: "Entrées",
    sousCategory: "",
  },
  {
    _id: "mock-food-8",
    name: "Salade César",
    description: "Salade, poulet grillé, croûtons, parmesan.",
    price: 2500,
    image: food8,
    category: "Salade",
    sousCategory: "Salade",
  },
  {
    _id: "mock-food-9",
    name: "Salade Niçoise",
    description: "Thon, œuf, olives, tomates, vinaigrette.",
    price: 2700,
    image: food9,
    category: "Salade",
    sousCategory: "Salade",
  },
  {
    _id: "mock-food-10",
    name: "Vinaigrette",
    description: "Sauce vinaigrette classique.",
    price: 0,
    image: vinaigrette,
    category: "Salade",
    sousCategory: "Sauce",
  },
  {
    _id: "mock-food-11",
    name: "Sauce César",
    description: "Sauce riche et savoureuse.",
    price: 0,
    image: food10,
    category: "Salade",
    sousCategory: "Sauce",
  },
  {
    _id: "mock-food-12",
    name: "Tomates fraîches",
    description: "Supplément de tomates fraîches coupées.",
    price: 300,
    image: tomates,
    category: "Salade",
    sousCategory: "Supplément",
  },
  {
    _id: "mock-food-13",
    name: "Croûtons",
    description: "Supplément de croûtons croustillants.",
    price: 300,
    image: food11,
    category: "Salade",
    sousCategory: "Supplément",
  },
  {
    _id: "mock-food-14",
    name: "Jus de Bissap",
    description: "Boisson rafraîchissante à l'hibiscus.",
    price: 1000,
    image: food12,
    category: "Boissons",
    sousCategory: "",
  },
  {
    _id: "mock-food-15",
    name: "Jus de Bouye",
    description: "Boisson crémeuse au fruit de baobab.",
    price: 1200,
    image: food1,
    category: "Boissons",
    sousCategory: "",
  },
  {
    _id: "mock-food-16",
    name: "Brochettes de bœuf",
    description: "Brochettes marinées grillées au feu de bois.",
    price: 3500,
    image: food13,
    category: "Grillades",
    sousCategory: "",
  },
  {
    _id: "mock-food-17",
    name: "Brochettes de poulet",
    description: "Brochettes de poulet aux épices, sauce piquante.",
    price: 3200,
    image: food14,
    category: "Grillades",
    sousCategory: "",
  },
  {
    _id: "mock-food-18",
    name: "Merguez grillées",
    description: "Merguez épicées grillées, servies avec pain.",
    price: 2800,
    image: food15,
    category: "Grillades",
    sousCategory: "",
  },
  {
    _id: "mock-food-19",
    name: "Sandwich Poulet",
    description: "Pain, poulet grillé, crudités, sauce maison.",
    price: 2200,
    image: food16,
    category: "Sandwichs",
    sousCategory: "",
  },
  {
    _id: "mock-food-20",
    name: "Sandwich Merguez",
    description: "Pain, merguez grillées, oignons, sauce piquante.",
    price: 2000,
    image: food17,
    category: "Sandwichs",
    sousCategory: "",
  },
  {
    _id: "mock-food-21",
    name: "Club Sandwich",
    description: "Poulet, œuf, salade, tomate, pain grillé.",
    price: 2600,
    image: food18,
    category: "Sandwichs",
    sousCategory: "",
  },
  {
    _id: "mock-food-22",
    name: "Pizza Margherita",
    description: "Sauce tomate, mozzarella, basilic frais.",
    price: 4500,
    image: food19,
    category: "Pizzas",
    sousCategory: "",
  },
  {
    _id: "mock-food-23",
    name: "Pizza 4 Fromages",
    description: "Mozzarella, gorgonzola, emmental, parmesan.",
    price: 5000,
    image: food20,
    category: "Pizzas",
    sousCategory: "",
  },
  {
    _id: "mock-food-24",
    name: "Pizza Poulet",
    description: "Poulet grillé, oignons, poivrons, mozzarella.",
    price: 4800,
    image: food21,
    category: "Pizzas",
    sousCategory: "",
  },
  {
    _id: "mock-food-25",
    name: "Tarte au citron",
    description: "Pâte sablée, crème citron, meringue légère.",
    price: 1800,
    image: food22,
    category: "Desserts",
    sousCategory: "",
  },
  {
    _id: "mock-food-26",
    name: "Fondant au chocolat",
    description: "Gâteau moelleux au cœur coulant de chocolat.",
    price: 2000,
    image: food13,
    category: "Desserts",
    sousCategory: "",
  },
  {
    _id: "mock-food-27",
    name: "Salade de fruits",
    description: "Fruits frais de saison coupés en dés.",
    price: 1500,
    image: food14,
    category: "Desserts",
    sousCategory: "",
  },
];
