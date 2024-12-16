export default async function searchProducts(product) {
    try {
        const response = await fetch(`/api/v1/shop/products/filter/search/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'query' : product})
        });
        
        const products = await response.json();
        console.log(products);
        return products

    } catch (error) {
        console.log(error);
        return null        
    }
}