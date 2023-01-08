export interface Actor {
  imgSrc: string;
  role: string;
  name: string;
}

const actors: Actor[] = [
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "Gabriel",
    name: "Cristallin Defossez",
  },
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "Eloïse",
    name: "Héloïse Lacheray",
  },
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "Bastien",
    name: "Esteban Dauchy",
  },
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "Thibault",
    name: "Antonin Houllier",
  },
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "Franck",
    name: "Benoît Duez",
  },
  {
    imgSrc: "https://unsplash.it/350/400",
    role: "La griffe",
    name: "Yann Viseur",
  },
];

export default actors;
