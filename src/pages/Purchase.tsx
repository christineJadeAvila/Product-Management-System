import useStockOrders from '../hooks/useStockOrders';

function Purchase() {

   const orders = useStockOrders()
  
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
                <tr className="product-row" key={order.purchaseid}>
                  <td><input type="checkbox" /></td>
                  <td>{order.purchaseitemname}</td>
                  <td>{order.quantity}</td>
                  <td>{order.supplierid}</td>
                  <td>{order.total}</td>
                  <td>{order.warehouseid}</td>
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