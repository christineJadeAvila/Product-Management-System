import { useState, useEffect } from "react"
import api from "../api"

interface StockItems {
    purchaseid: number
    purchaseitemname: string
    quantity: string
    supplierid: number
    total: number
    warehouseid: number
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