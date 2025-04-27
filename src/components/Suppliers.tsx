import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  img: string;
}
function Suppliers() {
    const [archivedProducts] = useState<Product[]>([
      ]);
  return (
    <table className="product-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {archivedProducts.map((product) => (
                <tr className="product-row" key={product.id}>
                  <td><input type="checkbox" /></td>
                  <td><span className="product-icon">{product.img}</span> {product.name}</td>
                  <td>P{product.price}.00</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
                  <td className="action-links">
                    <a className="update-link">Update</a> 
                    <a className="delete-link">Archive</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}

export default Suppliers