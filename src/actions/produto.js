export const STORE_PRODUCT = 'STORE_PRODUCT';
export const FILL_PRODUCTS = 'FILL_PRODUCTS';

export const storeProduct = productName => (
    {
        type: STORE_PRODUCT,
        productName
    }
);

export const fillProducts = products => ({
    type: FILL_PRODUCTS,
    products
});

