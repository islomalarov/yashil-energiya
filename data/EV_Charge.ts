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
    capacity: 600,
  },
  {
    region: "Tashkent region",
    name: "Paraglider",
    coords: [41.609965, 70.030666],
    status: "running",
    capacity: 480,
  },
  {
    region: "Andijan region",
    name: "Fergana ring road",
    coords: [40.71431, 72.301062],
    status: "construction",
    capacity: 600,
  },
];
