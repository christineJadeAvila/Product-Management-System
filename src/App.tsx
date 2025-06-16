import { HashRouter, Routes, Route } from "react-router-dom"
import InventoryList from "./pages/InventoryList"
import ProductsList from "./pages/ProductsList"
import AddProduct from "./forms/AddProduct"
import AddSupplier from "./forms/AddSupplier"
import UpdateProduct from "./forms/UpdateProduct"


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ProductsList/>}></Route>
          <Route path="/add-product" element={<AddProduct/>}></Route>
          <Route path="/update-product" element={<UpdateProduct/>}></Route>
          <Route path="/inventory" element={<InventoryList/>}></Route>
          <Route path="/add-supplier" element={<AddSupplier/>}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
