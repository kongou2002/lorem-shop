// id                 String         @id @default(cuid())
//   title              String
//   price              Float
//   discountPercentage Float
//   rating             Float
//   stock              Int
//   brand              String
//   color              String
//   description        String
//   category           String
//   thumbnail          String
//   Cart               Cart[]
//   detailsImage       detailsImage[]
//   Order              Order[]
//size                String



export interface Product {
    id: String;
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