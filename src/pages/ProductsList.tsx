import BurgerMenu from "../components/BurgerMenu";
import SearchBar from "../components/SearchBar";
import LogoBanner from "../components/LogoBanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/ProductsList.scss";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: string;
  img: string;
}

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

  const [products] = useState<Product[]>([
    { id: 1, name: "Banana Split", category: "Dessert", price: 180.00, status: "Active", img: "🍰" },
    { id: 2, name: "Buko Pandan", category: "Dessert", price: 140.00, status: "Active", img: "🥥" },
    { id: 3, name: "Pinoy Halo-Halo", category: "Dessert", price: 230.00, status: "Active", img: "🍧" },
  ]);

  const [archivedProducts] = useState<Product[]>([
  ]);

  return (
    <>
      <LogoBanner/>
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
          {selectedButton === 'products' && (
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
              {products.map((product) => (
                <tr className="product-row" key={product.id}>
                  <td><input type="checkbox" /></td>
                  <td><span className="product-icon">{product.img}</span> {product.name}</td>
                  <td>P{product.price}.00</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
                  <td className="action-links">
                    <a className="update-link" onClick={update}>Update</a> 
                    <a className="delete-link">Archive</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )} 
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
              {archivedProducts.map((product) => (
                <tr className="product-row" key={product.id}>
                  <td><input type="checkbox" /></td>
                  <td><span className="product-icon">{product.img}</span> {product.name}</td>
                  <td>P{product.price}.00</td>
                  <td>{product.category}</td>
                  <td>{product.status}</td>
                  <td className="action-links">
                    <a className="update-link" onClick={update}>Update</a> 
                    <a className="delete-link">Archive</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </main>
        </div>
    </>
  )
}

export default ProductsList