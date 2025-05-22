import { useState, useEffect } from "react"
import api from "../api"

interface StockItems {
    purchaseID: number
    purchaseItemName: string
    quantity: string
    supplierID: number
    total: number
    warehouseID: number
}

export default function useStockOrders(): StockItems[] {
    const [stockItems, setStockItems] = useState<StockItems[]>([]);

    useEffect(() => {
        getStockItems();
    }, []);

    const getStockItems = () => {
        api
            .get("api/orders")
            .then((res) => {
                setStockItems(res.data);
            })
            .catch((err) => alert(err));
    };

    return stockItems;
}