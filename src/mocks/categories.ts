// Données factices (avec vraies images locales) utilisées quand l'API est
// injoignable en dev — voir useCategoryStore.
import menu1 from "../assets/menu_1.png";
import menu2 from "../assets/menu_2.png";
import menu3 from "../assets/menu_3.png";
import menu4 from "../assets/menu_4.png";
import menu5 from "../assets/menu_5.png";
import menu6 from "../assets/menu_6.png";
import menu7 from "../assets/menu_7.png";
import menu8 from "../assets/menu_8.png";

export const mockCategories = [
  {
    _id: "mock-cat-1",
    menu_name: "Plats",
    menu_image: menu1,
    sous_categories: [],
  },
  {
    _id: "mock-cat-2",
    menu_name: "Entrées",
    menu_image: menu2,
    sous_categories: [],
  },
  {
    _id: "mock-cat-3",
    menu_name: "Salade",
    menu_image: menu3,
    sous_categories: [
      { _id: "mock-subcat-1", sous_category_name: "Sauce", sous_category_image: menu3 },
      { _id: "mock-subcat-2", sous_category_name: "Supplément", sous_category_image: menu3 },
    ],
  },
  {
    _id: "mock-cat-4",
    menu_name: "Boissons",
    menu_image: menu4,
    sous_categories: [],
  },
  {
    _id: "mock-cat-5",
    menu_name: "Grillades",
    menu_image: menu5,
    sous_categories: [],
  },
  {
    _id: "mock-cat-6",
    menu_name: "Sandwichs",
    menu_image: menu6,
    sous_categories: [],
  },
  {
    _id: "mock-cat-7",
    menu_name: "Pizzas",
    menu_image: menu7,
    sous_categories: [],
  },
  {
    _id: "mock-cat-8",
    menu_name: "Desserts",
    menu_image: menu8,
    sous_categories: [],
  },
];
