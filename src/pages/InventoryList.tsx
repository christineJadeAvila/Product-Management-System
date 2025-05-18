import BurgerMenu from "../components/BurgerMenu";
import SearchBar from "../components/SearchBar";
import Sales from "./Sales";
import Suppliers from "./Suppliers";
import Purchase from "./Purchase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/ProductsList.scss";

interface StockItem {
  id: number;
  item_name: string;
  quantity: number;
  date_received: string;
  expiry_date: string;
  warehouse: string;
  supplier: string;
}

function InventoryList() {
  const [openedModal, setOpenedModal] = useState<string>('add')
  const [selectedButton, setSelectedButton] = useState<string>('current')
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

  const [stocks] = useState<StockItem[]>([
      { id: 1, item_name: "Egg", quantity: 30, date_received: "10:23-24", expiry_date: "1-23-25", warehouse: "Warehouse 1", supplier: "Supplier 1" },
      { id: 2, item_name: "Salt", quantity: 10, date_received: "10:23-24", expiry_date: "1-23-25", warehouse: "Warehouse 1", supplier: "Supplier 1" },
      { id: 3, item_name: "Pepper", quantity: 20, date_received: "10:23-24", expiry_date: "1-23-25", warehouse: "Warehouse 1", supplier: "Supplier 1" },
  ]);
  

  return (
    <>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Inventory Management System</h2>
        
        <button className="add-product" onClick={add}>Add Stocks</button>
      </header>
      
      <div className="container">
        <aside className="side-bar">
          <nav className="nav-bar">
            <a className={`nav-elements ${selectedButton==='current' ? 'active' : ''}`}
               onClick={() => handleButtonClick('current')}>Current Stocks</a>
            <a className={`nav-elements ${selectedButton==='suppliers' ? 'active' : ''}`}
               onClick={() => handleButtonClick('suppliers')}>Suppliers</a>
            <a className={`nav-elements ${selectedButton==='purchased' ? 'active' : ''}`}
               onClick={() => handleButtonClick('purchased')}>Purchased</a>
            <a className={`nav-elements ${selectedButton==='sales' ? 'active' : ''}`}
               onClick={() => handleButtonClick('sales')}>Sales</a>
          </nav>
        </aside>
        <main className="products-container">
          {/* Search Bar */}
          <SearchBar/>
          {/* ALL STOCKS TEMPLATE */}
          {selectedButton === 'current' && (
          <table className="product-table">
            <thead>
              <tr>
                <th></th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date Received</th>
                <th>Expiry Date</th>
                <th>Warehouse</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((item) => (
                <tr className="product-row" key={item.id}>
                  <td><input type="checkbox" /></td>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.date_received}</td>
                  <td>{item.expiry_date}</td>
                  <td>{item.warehouse}</td>
                  <td>{item.supplier}</td>
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
          {selectedButton === 'suppliers' && (
            <Suppliers/>
          )}
          {selectedButton === 'purchased' && (
            <Purchase/>
          )}
          {selectedButton === 'sales' && (
            <Sales/>
          )}
        </main>
        </div>
    </>
  )
}

export default InventoryList