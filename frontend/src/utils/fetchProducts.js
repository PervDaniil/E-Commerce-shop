export default async function fetchProducts() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/shop/products/');
    
    if (response.ok) {
        return await response.json();
    }

    return null
}