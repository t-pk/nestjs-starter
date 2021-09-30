const VN2Normalize = (str: string): string =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// OR: -> str.normalize('NFD').replace(/\p{Diacritic}/gu, '');

export { VN2Normalize };
