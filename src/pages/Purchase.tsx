import { useState } from 'react'

interface PurchaseOrder {
  id: number;
  item_name: string;
  quantity: number;
  supplier: string;
  total: number;
  warehouse: string;
}

function Purchase() {

    const [orders] = useState<PurchaseOrder[]> ([
      { id: 1, item_name: "Beef Meat", quantity: 3, supplier: "Supplier 3", total: 5_250, warehouse: "Warehouse 1"},
      { id: 1, item_name: "Pork Meat", quantity: 3, supplier: "Supplier 3", total: 3_250, warehouse: "Warehouse 1"},
      { id: 1, item_name: "Chicken Meat", quantity: 3, supplier: "Supplier 3", total: 2_250, warehouse: "Warehouse 1"},
    ])
  
  return (
    <table className="product-table">
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Total</th>
                <th>Warehouse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="product-row" key={order.id}>
                  <td><input type="checkbox" /></td>
                  <td>{order.item_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.supplier}</td>
                  <td>{order.total}</td>
                  <td>{order.warehouse}</td>
                  <td className="action-links">
                    <a className="positive-link">Receive</a>
                    <a className="delete-link">Cancel</a>
                  </td>
                </tr>
              ))}
            </tbody>
    </table>
  )
}

export default Purchase