import useSuppliers from "../hooks/useSuppliers"

function Suppliers() {
  const { suppliers, loading, error, deleteSupplier, refreshSuppliers} = useSuppliers()

  const handleDelete = async (supplierid: number, supplierName: string) => {
        const success = await deleteSupplier(supplierid, supplierName)
        if (success) {
            alert('Supplier deleted successfully!')
        }
    }

    if (loading) return <div>Loading suppliers...</div>
    if (error) return <div style={{color: 'red'}}>Error: {error}</div>

  return (
    <>
     <table className="product-table">
            <thead>
              <tr>
                <th></th>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Supplier Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr className="product-row" key={supplier.supplierid}>
                  <td><input type="checkbox" /></td>
                  <td>{supplier.suppliername}</td>
                  <td>{supplier.contactperson}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.suppliertype}</td>
                  <td className="action-links">
                    <a onClick={() => console.log('Edit supplier:', supplier.supplierid)} className="update-link">Update</a> 
                    <a onClick={() => handleDelete(supplier.supplierid, supplier.suppliername)} className="delete-link">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
    </table>
    </>
   
  )
}

export default Suppliers