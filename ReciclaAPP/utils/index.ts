export const getRulles = (action: string) => {
  switch (action) {
    case 'SOFT': {
      return '10';
    }
    case 'EASY': {
      return '10';
    }
    case 'MEDIUM': {
      return '50';
    }
    case 'HARD': {
      return '100';
    }
    case 'D': {
      return '400';
    }
    case 'GOLD': {
      return '1000';
    }
    default: {
      console.log('Invalid choice', action);
      return 0;
    }
  }
};

const mod11 = (num: number) => num % 11
const NOT = (x: any) => !x
const isEqual = (a: any) => (b: any) => b === a
const mergeDigits = (num1: number, num2: number): string => `${num1}${num2}`
const getTwoLastDigits = (cpf: string) => `${cpf[9]}${cpf[10]}`
const getCpfNumeral = (cpf: string) => cpf.substr(0, 9).split('')
const isRepeatingChars = (str: string) => str.split('').every((elem: any) => elem === str[0])
const toSumOfProducts = (multiplier: number) => (result: number, num: number, i: number) => result + (num * multiplier--)
const getSumOfProducts = (list: any, multiplier: number) => list.reduce(toSumOfProducts(multiplier), 0)
const getValidationDigit = (multiplier: number) => (cpf: string[]) => getDigit(mod11(getSumOfProducts(cpf, multiplier)))

const getDigit = (num: number): any =>
  (num > 1)
    ? 11 - num
    : 0

const isRepeatingNumbersCpf = isRepeatingChars

const clean = (cpf: string): string => cpf.replace(/(\.)|(\-)/g, '')

const isValidCPF = (cpf: string): boolean => {
  const CPF = getCpfNumeral(cpf)
  const firstDigit = getValidationDigit(10)(CPF)
  const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit))

  return isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit))
}

export const validateCPF = (CPF: string) => NOT(isRepeatingNumbersCpf(clean(CPF))) && isValidCPF(clean(CPF))

export const generateInitials = (name: string) => {
  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}