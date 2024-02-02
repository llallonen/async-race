const brands = [
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Cadillac',
  'Chevrolet',
  'Ferrari',
  'Fiat',
  'Ford',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Lada',
  'Land Rover',
  'Lexus',
  'Nissan',
  'Mazda',
  'Mitsubishi',
  'Mercedes',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Rolls Royce',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'UAZ',
  'Volkswagen',
  'Volvo',
];

const models = [
  '2101',
  '2105',
  '2109',
  '540K',
  'C-Class',
  'Camaro',
  'Camry',
  'Carrera GT',
  'Cayenne',
  'Cherokee',
  'Civic',
  'Corvette Stingray',
  'DeVille',
  'E‑PACE',
  'Elantra',
  'Equinox',
  'Explorer',
  'F40',
  'Flying Spur',
  'GLA',
  'GLE',
  'Golf GTI',
  'GR Supra',
  'GT-R',
  'GX',
  'Impreza',
  'Forte',
  'K5',
  'Karmann Ghia',
  'M5',
  'M8',
  'Model X',
  'Model X',
  'Mustang',
  'P1800',
  'Shelby 427',
  'SRX',
  'Thunderbird', 'Type 57',
  'V8',
];

function getRandomIndex(array: string[]): number {
  return Math.floor(Math.random() * array.length);
}

export function createRandomCarName(): string {
  return `${brands[getRandomIndex(brands)]} ${models[getRandomIndex(models)]}`;
}