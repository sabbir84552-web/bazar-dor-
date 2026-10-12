export const fetchProducts = async () => {
  try {
    // Ekdom ashol API link ta ekhane dite hobe
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
      cache: 'no-store',
    });
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};