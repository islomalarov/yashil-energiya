type Plant = {
  region: string;
  name: string;
  coords: [number, number];
  status: string;
  capacity: number;
};

// Зарядки
export const plants: Plant[] = [
  {
    region: "Tashkent city",
    name: "Yangi Toshkent",
    coords: [41.302759, 69.478892],
    status: "running",
    capacity: 480,
  },
  {
    region: "Tashkent region",
    name: "Paraglider",
    coords: [41.609965, 70.030666],
    status: "running",
    capacity: 600,
  },
  {
    region: "Andijan region",
    name: "Fergana ring road",
    coords: [40.71431, 72.301062],
    status: "construction",
    capacity: 600,
  },
  {
    region: "Kashkadarya region",
    name: "Khudoyzod MFY",
    coords: [38.861416, 65.828307],
    status: "running",
    capacity: 160,
  },
  {
    region: "Kashkadarya region",
    name: "Oydin MFY",
    coords: [38.833640, 65.819040],
    status: "commissioning",
    capacity: 160,
  },
  {
    region: "Jizzakh region",
    name: "Olmachi M39",
    coords: [40.083741, 67.932456],
    status: "running",
    capacity: 120,
  },
  {
    region: "Jizzakh region",
    name: "Zamin Hotel",
    coords: [39.946916, 68.391591],
    status: "running",
    capacity: 120,
  },
  {
    region: "Tashkent city",
    name: "D. I. Mendeleev University",
    coords: [41.364751, 69.393601],
    status: "commissioning",
    capacity: 120,
  },
  {
    region: "Tashkent city",
    name: "Minvuz Parking",
    coords: [41.348144, 69.208862],
    status: "running",
    capacity: 120,
  },
  {
    region: "Tashkent city",
    name: "IT Park 01",
    coords: [41.340841, 69.336031],
    status: "running",
    capacity: 80,
  },
  {
    region: "Tashkent city",
    name: "IT Park 02",
    coords: [41.342180, 69.335940],
    status: "running",
    capacity: 80,
  },
  {
    region: "Bukhara region",
    name: "M39 Gazli MFY",
    coords: [40.148662, 63.445194],
    status: "commissioning",
    capacity: 240,
  },
];
