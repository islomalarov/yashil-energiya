type Plant = {
  region: string;
  name: string;
  coords: [number, number];
  status: string;
  capacity: number;
};

// Микро ГЭС
export const plants: Plant[] = [
  {
    region: "Tashkent region",
    name: "Margumenkova MHP",
    coords: [40.954157, 69.160334],
    status: "planning",
    capacity: 270
  },
  {
    region: "Tashkent region",
    name: "Qorasu MHP",
    coords: [41.408611, 69.575556],
    status: "planning",
    capacity: 100
  },
  {
    region: "Tashkent region",
    name: "Qodiriya MHP-2",
    coords: [41.395789, 69.436550],
    status: "planning",
    capacity: 500
  },
  {
    region: "Tashkent region",
    name: "Koksu MHP",
    coords: [41.616111, 70.115686],
    status: "planning",
    capacity: 4200
  },
  {
    region: "Tashkent region",
    name: "Oromzodasoy MHP",
    coords: [41.818233, 70.261659],
    status: "planning",
    capacity: 1100
  },
  {
    region: "Namangan region",
    name: "Yingichka MHP",
    coords: [41.069339, 72.031417],
    status: "planning",
    capacity: 100
  },
  {
    region: "Andijan region",
    name: "Katta Fergana MHP",
    coords: [40.902889, 72.332444],
    status: "planning",
    capacity: 100
  },
  {
    region: "Andijan region",
    name: "Shahrihonsoy MHP",
    coords: [40.714992, 72.835767],
    status: "planning",
    capacity: 100
  },
  {
    region: "Jizak region",
    name: "Eski Tuyatortlar PK170+00  MHP",
    coords: [40.714992, 72.835767],
    status: "planning",
    capacity: 1455
  },
  {
    region: "Jizak region",
    name: "Eski Tuyatortlar PK150+00  MHP",
    coords: [39.858261, 67.574975],
    status: "planning",
    capacity: 930
  },
  {
    region: "Samarkand region",
    name: "Honcharbog  MHP",
    coords: [39.584611, 66.504889],
    status: "planning",
    capacity: 500
  },
  {
    region: "Samarkand region",
    name: "Dargom  MHP-4",
    coords: [39.737353, 66.757550],
    status: "planning",
    capacity: 1000
  },
  {
    region: "Kashkadarya region",
    name: "Aylanma  MHP PK0+00-PK7+00",
    coords: [38.391389, 65.477778],
    status: "planning",
    capacity: 1000
  },
  {
    region: "Kashkadarya region",
    name: "Aylanma  MHP PK0+00-PK7+00",
    coords: [38.395883, 65.471594],
    status: "planning",
    capacity: 1000
  },
  {
    region: "Kashkadarya region",
    name: "Aylanma  MHP",
    coords: [38.416711, 65.443219],
    status: "planning",
    capacity: 500
  },
  {
    region: "Kashkadarya region",
    name: "Oqsuv MHP",
    coords: [39.034686, 67.041000],
    status: "planning",
    capacity: 300
  },
  {
    region: "Navoi region",
    name: "Uzatma-1 MHP",
    coords: [40.197669, 65.467611],
    status: "planning",
    capacity: 100
  },
  {
    region: "Navoi region",
    name: "Shofirkon MHP",
    coords: [40.143808, 64.901772],
    status: "planning",
    capacity: 100
  },
];
