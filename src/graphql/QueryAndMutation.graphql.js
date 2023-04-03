export const QuerySchema = `
    getProducts: [Product]
    getProductById(_id: ID): Product
    getCart(_id: ID): Cart
    `;

export const MutationSchema = `
    createProduct(name: String, price: Int, thumbnail: String): Product
    deleteProductById(_id: ID): Product
    createCart: Cart
`;
