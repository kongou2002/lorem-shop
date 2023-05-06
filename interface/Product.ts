
export interface Product {
    id: string;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    color: string[];
    description: string;
    category: string;
    thumbnail: string;
    image: string [];
    size: string [];
}

export interface category {
    id: String;
    name: string;
}