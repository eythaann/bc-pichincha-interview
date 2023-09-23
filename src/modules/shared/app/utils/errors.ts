
const errorsDict = {
  min: 'Minimo ${x} caracteres.',
  max: 'Maximo ${x} caracteres.',
  url: 'Debe ser un url valido',
  time: 'Debe cumplir el formato: DD/MM/YYYY',
  today: 'Debe ser una fecha mayor o igual a hoy',
};

export const getErrorMessage = (type: keyof typeof errorsDict, value?: string | number) => {
  return errorsDict[type].replace('${x}', `${value}`);
};