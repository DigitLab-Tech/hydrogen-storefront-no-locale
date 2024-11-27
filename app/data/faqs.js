export const faqs = [
  {
    id: 1,
    question: "Qu'est-ce que ReactJS ?",
    answer:
      "ReactJS est une bibliothèque JavaScript développée par Facebook pour créer des interfaces utilisateur. Elle permet de créer des composants réutilisables et de gérer efficacement les états de l'application.",
  },
  {
    id: 2,
    question: 'Comment installer ReactJS ?',
    answer:
      'Pour installer ReactJS, vous pouvez utiliser la commande `npx create-react-app nom-du-projet` avec Node.js installé. Cette commande configure automatiquement un environnement de développement React.',
  },
  {
    id: 3,
    question:
      'Quelle est la différence entre un composant fonctionnel et un composant de classe ?',
    answer:
      "Un composant fonctionnel est une simple fonction JavaScript qui retourne du JSX, tandis qu'un composant de classe est une classe ES6 avec un `render()` qui retourne du JSX. Les composants fonctionnels sont souvent plus simples et permettent l'usage des hooks.",
  },
  {
    id: 4,
    question: "Qu'est-ce que JSX ?",
    answer:
      "JSX est une syntaxe qui permet d'écrire du HTML directement dans le code JavaScript. Il facilite la création d'éléments React en combinant HTML et JavaScript dans le même fichier.",
  },
  {
    id: 5,
    question: "Qu'est-ce qu'un hook en React ?",
    answer:
      "Les hooks sont des fonctions spéciales qui permettent d'ajouter de la logique d'état et d'autres fonctionnalités à des composants fonctionnels. Par exemple, `useState` pour gérer l'état local et `useEffect` pour gérer les effets de bord.",
  },
  {
    id: 6,
    question: 'Comment fonctionne le state en React ?',
    answer:
      'Le state est un objet local à chaque composant qui permet de stocker des informations qui peuvent changer. Avec `useState`, React permet aux composants fonctionnels de gérer leur propre état.',
  },
  {
    id: 7,
    question: "Qu'est-ce que le DOM virtuel ?",
    answer:
      "Le DOM virtuel est une copie légère du DOM réel. React l'utilise pour déterminer quels éléments doivent être mis à jour lors des changements de données, ce qui rend les mises à jour plus rapides et efficaces.",
  },
  {
    id: 8,
    question: "Qu'est-ce que le props drilling ?",
    answer:
      'Le props drilling est une technique où des données sont passées en tant que props à travers plusieurs niveaux de composants. Cela peut rendre le code complexe, mais des solutions comme `useContext` et Redux peuvent aider à simplifier.',
  },
];
