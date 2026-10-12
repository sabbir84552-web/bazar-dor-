export const fetchProducts = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor', {
      cache: 'no-store', // সর্বদা লেটেস্ট ডেটা দেখানোর জন্য
    });
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};