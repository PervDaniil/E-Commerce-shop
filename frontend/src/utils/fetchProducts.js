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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'category': category })
    });

    if (response.ok) {
        return await response.json();
    }

    return null
}


export async function fetchUserCartProducts(UserAccessJWT) {
    const response = await fetch('/api/v1/shop/user-cart/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${UserAccessJWT}`
        },
    });

    if (response.ok) {
        return await response.json();
    }

    return null
}


export async function addProductToCart(UserAccessJWT, ProductID) {
    const response = await fetch('/api/v1/shop/user-cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserAccessJWT}`
        },
        body: JSON.stringify({ 'productID': ProductID })
    });

    if (response.ok) {
        return await response.json();
    }

    return null
}


export async function deleteProductFromCart(UserAccessJWT, ProductID) {
    const response = await fetch('/api/v1/shop/user-cart/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserAccessJWT}`
        },
        body: JSON.stringify({ 'productID': ProductID })
    });

    if (response.ok) {
        return await response.json();
    }

    return null
}