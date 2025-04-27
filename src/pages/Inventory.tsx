import BurgerMenu from "../components/BurgerMenu";
import SearchBar from "../components/SearchBar";
import LogoBanner from "../components/LogoBanner";
import Sales from "../components/Sales";
import Purchased from "../components/Purchased";
import Suppliers from "../components/Suppliers";
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

function Inventory() {
  const [selectedButton, setSelectedButton] = useState<string>('inventory')
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const navigate = useNavigate()
  const add = () => {
    navigate("add-product")
  }
  const update = () => {
    navigate("update-product")
  }

  const [products] = useState<Product[]>([
    { id: 1, name: "Egg", category: "Dessert", price: 180.00, status: "Active", img: "🍰" },
  ]);

  return (
    <>
      <LogoBanner/>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Inventory Management System</h2>
        <button className="add-product" onClick={add}>Add Stock</button>
      </header>
      
      <div className="container">
        <aside className="side-bar">
          <nav className="nav-bar">
            <a className={`nav-elements ${selectedButton==='inventory' ? 'active' : ''}`}
               onClick={() => handleButtonClick('inventory')}>Current Stocks</a>
            <a className={`nav-elements ${selectedButton==='suppliers' ? 'active' : ''}`}
               onClick={() => handleButtonClick('suppliers')}>Suppliers</a>
            <a className={`nav-elements ${selectedButton==='purchase' ? 'active' : ''}`}
               onClick={() => handleButtonClick('purchase')} >Purchased</a>
            <a className={`nav-elements ${selectedButton==='sales' ? 'active' : ''}`}
               onClick={() => handleButtonClick('sales')}>Sales</a>
          </nav>
        </aside>

          {selectedButton === 'inventory' && (
            <main className="products-container">
              {/* Search Bar */}
              <SearchBar/>
              <table className="product-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Date Received</th>
                    <th>Expiry Date</th>
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
            </main>
            )}
            {selectedButton === 'suppliers' && (
              <Suppliers/>
            )}
          {selectedButton === 'purchase' && (
           <Purchased/>
          )}
          {selectedButton === 'sales' && (
            <Sales/>
          )}
      </div>
    </>
  )
}

export default Inventory