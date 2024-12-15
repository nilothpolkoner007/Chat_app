export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidAge = (age: number): boolean => {
  return age >= 13 && Number.isInteger(age);
};

export const isValidString = (str: string): boolean => {
  return typeof str === 'string' && str.trim().length > 0;
};