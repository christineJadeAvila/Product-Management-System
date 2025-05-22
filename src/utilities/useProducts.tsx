import { useEffect, useState } from "react";
import api from "../api";

interface Product {
    productID: number
    product_name: string
    categoryid: number
    price: number
    is_archived: boolean
}

export default function useProducts(): Product[] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        api
            .get("api/products")
            .then((res) => {
                const activeProducts: Product[] = res.data.filter(
                    (product: Product) => !product.is_archived
                );
                setProducts(activeProducts);
            })
            .catch((err) => alert(err));
    };

    return products;
}

