export default async function fetchProducts() {
    const response = await fetch('/api/v1/shop/products/');
    
    if (response.ok) {
        return await response.json();
    }

    return null
}