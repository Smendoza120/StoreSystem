export let inventory = [];
export let salesHistory = [];

export const generateProductId = () => {
  return Math.random().toString(36).substring(2, 15);
};
