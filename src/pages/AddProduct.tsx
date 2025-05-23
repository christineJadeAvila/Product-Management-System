import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import api from "../api"
import BurgerMenu from "../components/BurgerMenu"
import BackButton from "../components/BackButton"
import TimeAndDate from "../components/TimeAndDate"
import useCategories from "../utilities/useCategories"
import "./styles/AddProducts.scss"

function AddProduct() {
  const categ = useCategories()
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]); 
      }
  }

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append("product_name", productName)
      formData.append("price", price)
      formData.append("categoryid", selectedCategory)
      if (image) {
        formData.append("image", image)
      }

      try {
          const addResponse = await api.post("api/createProduct", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          })

          alert("Product Added Successfully!")
          console.log(addResponse.data)

          setProductName("")
          setPrice("")
          setSelectedCategory("")
          setImage(null)

      } catch (error) {
          console.error("Failed to add product:", error)
          alert("Failed to add product")
      }
  }


  return (
    <>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Product Management System</h2>
        {/* time and date */}
        <TimeAndDate/>
      </header>

      {/* Add product form */}
      <div className="add-product-header">
        <BackButton/>
        <h2>Add Product</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleAddProduct}>
          <div className="form-row">
            <label className="form-label required">Product Name</label>
            <input type="text" className="form-input" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
          </div>
          
          <div className="form-row">
            <label className="form-label required">Product Price</label>
            <input type="number" className="form-input" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)}required/>
          </div>
          
          <div className="form-row">
            <label className="form-label required">Category</label>
            <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
              <option value="" disabled selected>Category</option>
              {categ.map((category)=>(
                <option key={category.categoryid} value={category.categoryid}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label className="form-label">Media</label>
                <div className="upload-area">
                  <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange}/>
                <div className="upload-subtitle">Accepts images in png, jpg, and jpeg</div>
                  {image && (
                    <div className="image-preview">
                        <img src={URL.createObjectURL(image)} alt="Preview" width="100" />
                    </div>
                  )}
            </div>
          </div>
          <button className="action-btns submit-action" type="submit">Add Product</button>
          
        </form>
      </div>
    </>
  )
}

export default AddProduct