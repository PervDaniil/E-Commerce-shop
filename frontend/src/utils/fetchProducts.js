export default async function fetchProducts() {
    const response = await fetch('/api/v1/shop/products/');
    
    if (response.ok) {
        return await response.json();
    }

    return null
}


export async function fetchProductsFilteredByCategory(category) {
    const response = await fetch('/api/v1/shop/products/filter/category/', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'category' : category})
    });

    if (response.ok) {
        return await response.json();
    }

    return null
}