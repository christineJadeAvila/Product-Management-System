import BurgerMenu from "../components/BurgerMenu";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useProducts from "../utilities/useProducts";
import "./styles/ProductsList.scss";


function ProductsList() {
  const [openedModal, setOpenedModal] = useState<string>('add')
  const [selectedButton, setSelectedButton] = useState<string>('products')
  const handleOpenModal = (buttonName: string) => {
    setOpenedModal(buttonName)
  }
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const navigate = useNavigate()
  
  const add = () => {
    navigate("/add-product")
  }
  const update = () => {
    navigate("/update-product")
  }

  const products = useProducts()

  // const [archivedProducts] = useState<Product[]>([
  // ]);

  return (
    <>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Product Management System</h2>
        
        <button className="add-product" onClick={add}>Add Product</button>
      </header>
      
      <div className="container">
        <aside className="side-bar">
          <nav className="nav-bar">
            <a className={`nav-elements ${selectedButton==='products' ? 'active' : ''}`}
               onClick={() => handleButtonClick('products')}>Products</a>
            <a className={`nav-elements ${selectedButton==='archived' ? 'active' : ''}`}
               onClick={() => handleButtonClick('archived')}>Archived Products</a>
          </nav>
        </aside>
        <main className="products-container">
          {/* Search Bar */}
          <h3 className="section-title">All Products </h3>
          <SearchBar/>
          {/* ALL PRODUCTS TEMPLATE */}
          {selectedButton === 'products' && (
          <table className="product-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="product-row" key={product.productID}>
                  <td><input type="checkbox" /></td>
                  <td><span className="product-icon"></span> {product.product_name}</td>
                  <td>P{product.price}</td>
                  <td>{product.categoryid}</td>
                  <td className="action-links">
                    <a className="update-link" onClick={update}>Update</a> 
                    <a className="delete-link">Archive</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )} 
          {/* ARCHIVED PRODUCTS TEMPLATE */}
          {selectedButton === 'archived' && (
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
              
            </tbody>
          </table>
          )}
        </main>
        </div>
    </>
  )
}

export default ProductsList