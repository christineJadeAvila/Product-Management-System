import { HashRouter, Routes, Route } from "react-router-dom"
import ProductsList from "./pages/ProductsList"
import AddProduct from "./pages/AddProduct"
import UpdateProduct from "./pages/UpdateProduct"


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ProductsList/>}></Route>
          <Route path="/add-product" element={<AddProduct/>}></Route>
          <Route path="/update-product" element={<UpdateProduct/>}></Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
