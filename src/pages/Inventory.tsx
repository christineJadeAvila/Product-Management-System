import BurgerMenu from "../components/BurgerMenu";
import SearchBar from "../components/SearchBar";
import LogoBanner from "../components/LogoBanner";
import Sales from "../components/Sales";
import Purchased from "../components/Purchased";
import Suppliers from "../components/Suppliers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/ProductsList.scss";
import "./styles/Modal.scss"


interface Product {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  date: string;
  expiryDate: string;
  supplier: string;
  archived: boolean;
}

function Inventory() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState<string>('');
  const [newProductImage, setNewProductImage] = useState<string>('');
  const [newProductQuantity, setNewProductQuantity] = useState<string>('0');
  const [newProductExpiryDate, setNewProductExpiryDate] = useState<string>('');
  const [newProductSupplier, setNewProductSupplier] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentEditProduct, setCurrentEditProduct] = useState<Product | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
    setNewProductName('');
    setNewProductImage('');
    setNewProductQuantity('0');
    setNewProductExpiryDate('');
    setNewProductSupplier('');
  };

  const openEditProductModal = (product: Product) => {
    setCurrentEditProduct(product);
    setNewProductName(product.name);
    setNewProductImage(product.imageUrl);
    setNewProductQuantity(product.quantity.toString());
    setNewProductExpiryDate(product.expiryDate);
    setNewProductSupplier(product.supplier);
    setIsEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    setIsEditProductModalOpen(false);
    setCurrentEditProduct(null);
    setNewProductName('');
    setNewProductImage('');
    setNewProductQuantity('0');
    setNewProductExpiryDate('');
    setNewProductSupplier('');
  };

  const handleAddProduct = () => {
    if (newProductName.trim() === '') {
      alert('Please enter a product name');
      return;
    }

    const quantity = parseInt(newProductQuantity) || 0;
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const newProduct: Product = {
      id: Date.now(),
      name: newProductName,
      imageUrl: newProductImage || '/api/placeholder/100/100', // Use placeholder if no image provided
      quantity: quantity,
      date: currentDate,
      expiryDate: newProductExpiryDate,
      supplier: newProductSupplier,
      archived: false
    };

    setProducts([...products, newProduct]);
    closeAddProductModal();
  };

  const handleUpdateProduct = () => {
    if (!currentEditProduct) return;

    if (newProductName.trim() === '') {
      alert('Please enter a product name');
      return;
    }

    const quantity = parseInt(newProductQuantity) || 0;

    const updatedProducts = products.map(product => {
      if (product.id === currentEditProduct.id) {
        return {
          ...product,
          name: newProductName,
          imageUrl: newProductImage || product.imageUrl,
          quantity: quantity,
          expiryDate: newProductExpiryDate,
          supplier: newProductSupplier
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    closeEditProductModal();
  };

  const handleArchiveProduct = (productId: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, archived: true };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleUnarchiveProduct = (productId: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, archived: false };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(file);
      setNewProductImage(imageUrl);
    }
  };

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

  return (
    <>
      <LogoBanner/>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Inventory Management System</h2>
        <button className="add-product" onClick={openAddProductModal}>Add Stock</button>
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
              <h3 className="section-title">Current Stocks</h3>
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
                  {products.map((product) => (
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

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Add New Product</h2>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Enter product name"    
                />
              </div>
              <div className="form-group">
                <label htmlFor="productQuantity">Quantity:</label>
                <input
                  type="number"
                  id="productQuantity"
                  value={newProductQuantity}
                  min="0"
                  onChange={(e) => setNewProductQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productExpiryDate">Expiry Date:</label>
                <input
                  type="date"
                  id="productExpiryDate"
                  value={newProductExpiryDate}
                  onChange={(e) => setNewProductExpiryDate(e.target.value)}
                />
              </div>
              
             
              <div className="form-group">
                <label htmlFor="productImage">Product Image:</label>
                <div className="image-upload-container">
                  {newProductImage ? (
                    <img src={newProductImage} alt="Product preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">No image selected</div>
                  )}
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button className="modal-button cancel" onClick={closeAddProductModal}>
                  Cancel
                </button>
                <button className="modal-button submit" onClick={handleAddProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditProductModalOpen && currentEditProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Edit Product</h2>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="editProductName">Product Name:</label>
                <input
                  type="text"
                  id="editProductName"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editProductQuantity">Quantity:</label>
                <input
                  type="number"
                  id="editProductQuantity"
                  value={newProductQuantity}
                  min="0"
                  onChange={(e) => setNewProductQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editProductExpiryDate">Expiry Date:</label>
                <input
                  type="date"
                  id="editProductExpiryDate"
                  value={newProductExpiryDate}
                  onChange={(e) => setNewProductExpiryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editProductSupplier">Supplier:</label>
                <input
                  type="text"
                  id="editProductSupplier"
                  value={newProductSupplier}
                  onChange={(e) => setNewProductSupplier(e.target.value)}
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editProductImage">Product Image:</label>
                <div className="image-upload-container">
                  {newProductImage ? (
                    <img src={newProductImage} alt="Product preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">No image selected</div>
                  )}
                  <input
                    type="file"
                    id="editProductImage"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button className="modal-button cancel" onClick={closeEditProductModal}>
                  Cancel
                </button>
                <button className="modal-button submit" onClick={handleUpdateProduct}>
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  )
}

export default Inventory