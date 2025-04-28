import { useState } from "react";
import SearchBar from "./SearchBar";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  img: string;
}

function Purchased() {
  const [archivedProducts] = useState<Product[]>([
    ]);
  return (<>
    <main className="products-container">
              {/* Search Bar */}
              <h3 className="section-title">Purchased </h3>
              <SearchBar/>
              <table className="product-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Date Received</th>
                    <th>Expiry Date</th>
                    <th>Supplier</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {products.map((product) => (
                    <tr className="product-row" key={product.id}>
                      <td><input type="checkbox" /></td>
                      <td className="product-image-cell">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-table-image"
                                onError={(e) => {
                                  // Handle image loading error by replacing with N/A text
                                  const target = e.target as HTMLImageElement;
                                  const parent = target.parentNode as HTMLElement;
                                  if (parent) {
                                    parent.innerHTML = '<div class="product-image-placeholder">N/A</div>';
                                  }
                                }}
                              />
                            ) : (
                              <div className="product-image-placeholder">N/A</div>
                            )}
                      </td>
                      <td>{product.name}</td>
                      <td>P{product.quantity}.00</td>
                      <td>{product.date}</td>
                      <td>{product.expiryDate}</td>
                      <td>{product.supplier}</td>
                      <td className="action-links">
                        <a className="update-link" onClick={() => openEditProductModal(product)}>Update</a> 
                        <a className="delete-link">Archive</a>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </main>
  </>
  )
}

export default Purchased