export default async function searchProducts(product) {
    try {
        const response = await fetch(`/api/v1/shop/products/filter/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'search_title' : product})
        });
        
        const products = await response.json();
        console.log(products);
        return products

    } catch (error) {
        console.log(error);
        return null        
    }
}