import { useState } from "react";

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  supplierType: string;
}

function Suppliers() {
    const [suppliers] = useState<Supplier[]>([
        { id: 1, name: "Fresh Farms Co.",contactPerson: "Maria Santos", phone: "0917-111-2233", email: "maria@freshfarms.com", address: "Barangay 2, Davao City", supplierType: "Produce "},
        { id: 2, name: "Meat Central", contactPerson: "Jose Dela Cruz", phone: "0918-222-3344", email: "jose@meatcentral.ph", address: "Agdao, Davao City",supplierType: "Meat & Seafood" },
        { id: 3, name: "Beverage Hub", contactPerson: "Ana Lopez", phone: "0920-333-4455", email: "ana@beveragehub.com", address: "Matina, Davao City", supplierType: "Beverages" },
    ])

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
                <th>Supplier Type</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr className="product-row" key={supplier.id}>
                  <td><input type="checkbox" /></td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contactPerson}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.supplierType}</td>
                </tr>
              ))}
            </tbody>
    </table>
    </>
   
  )
}

export default Suppliers