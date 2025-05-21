export let inventory = [];

export const generateProductId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export let salesHistory = [];