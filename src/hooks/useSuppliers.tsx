import { useState, useEffect } from "react"
import api from "../api"

interface Supplier {
    supplierid: number
    suppliername: string
    contactperson: string
    phone: number
    email: string
    address: string
    suppliertype: string
}

interface UseSuppliers {
    suppliers: Supplier[]
    loading: boolean
    error: string | null
    addSupplier: (supplierData: Omit<Supplier, 'supplierid'>) => Promise<boolean>
    deleteSupplier: (supplierid: number, suppliername: string) => Promise<boolean>
    updateSupplier: (supplierid: number, supplierData: Omit<Supplier, 'supplierid'>) => Promise<boolean>
    refreshSuppliers: () => void
}

export default function useSuppliers(): UseSuppliers {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get("api/suppliers")
            setSuppliers(response.data)
        } catch (error) {
            setError("failed to fetch suppliers")
            console.error("Error fetching suppliers:", error)
        } finally {
            setLoading(false)
        }
    }

    const addSupplier = async (supplierData: Omit<Supplier, 'supplierid'>): Promise<boolean> => {
        try {
            const response = await api.post("api/createSupplier", supplierData, {
                headers: { "Content-Type": "application/json" }
            })
            
            // Add the new supplier to the existing list
            setSuppliers(prev => [...prev, response.data])
            return true
        } catch (error) {
            console.error("Failed to add supplier:", error)
            setError("Failed to add supplier")
            return false
        }
    }

    const deleteSupplier = async (supplierid: number, supplierName: string): Promise<boolean> => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete "${supplierName}"? This action cannot be undone.`
        )
        
        if (!isConfirmed) return false

        try {
            const response = await api.delete(`api/suppliers/delete/${supplierid}`)
            
            if (response.data.success) {
                // Remove supplier from state
                setSuppliers(prev => prev.filter(supplier => supplier.supplierid !== supplierid))
                return true
            } else {
                setError(response.data.message || "Failed to delete supplier")
                return false
            }
        } catch (error) {
            console.error("Error deleting supplier:", error)
            setError("Failed to delete supplier")
            return false
        }
    }

    const updateSupplier = async (supplierId: number, supplierData: Omit<Supplier, 'supplierid'>): Promise<boolean> => {
        try {
            const response = await api.put(`api/updateSupplier/${supplierId}`, supplierData, {
                headers: { "Content-Type": "application/json" }
            })
            
            // Update supplier in state
            setSuppliers(prev => 
                prev.map(supplier => 
                    supplier.supplierid === supplierId 
                        ? { ...supplier, ...supplierData }
                        : supplier
                )
            )
            return true
        } catch (error) {
            console.error("Failed to update supplier:", error)
            setError("Failed to update supplier")
            return false
        }
    }

    const refreshSuppliers = () => {
        getSuppliers()
    }

    return {
        suppliers,
        loading,
        error,
        addSupplier,
        deleteSupplier,
        updateSupplier,
        refreshSuppliers
    }

}