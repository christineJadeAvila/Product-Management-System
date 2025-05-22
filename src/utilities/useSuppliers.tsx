import { useState, useEffect } from "react"
import api from "../api"

interface Supplier {
    supplierID: number
    supplierName: string
    contactPerson: string
    phone: number
    email: string
    address: string
    supplierType: string
}

export default function useSuppliers(): Supplier[] {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = () => {
        api
            .get("api/suppliers")
            .then((res) => {
                setSuppliers(res.data);
            })
            .catch((err) => alert(err));
    };

    return suppliers;
}