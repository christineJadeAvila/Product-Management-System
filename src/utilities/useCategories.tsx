import { useEffect, useState } from "react";
import api from "../api";

interface Category {
    categoryId: number
    category_name: string
    description: string
}

export default function useCategories(): Category[] {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        api
            .get("api/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => alert(err));
    };

    return categories;
}