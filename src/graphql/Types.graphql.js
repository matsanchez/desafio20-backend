export const TypesSchema = `
    type Product {
        _id: ID!
        name: String
        price: Int
        thumbnail: String
    }
    type Cart {
        _id: ID!
        email: String
        name: String
        products: [Product]
    }
`;
