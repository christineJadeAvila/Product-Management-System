import { useNavigate } from "react-router-dom"
import { useState, useEffect  } from "react"
import DateObject from "react-date-object"
import calendar from "../assets/calendar.png"
import clock from "../assets/clock.png"
import BurgerMenu from "../components/BurgerMenu"
import "./styles/AddProducts.scss"

function UpdateProduct() {
  const navigate = useNavigate()
  const back = () => {
    navigate("/")
  }

  // live clock
  const [time, setTime ] = useState(new Date());
  let date = new DateObject()
  useEffect(() => {
      setInterval(() => {
          setTime(new Date())
      }, 1000)
  }, [])
  return (
    <>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Product Management System</h2>
        {/* time and date */}
        <div className="time-n-date">
          <img className="date-time" src={calendar} alt="" />
            <p className="nav-date">{date.format("dddd, DD MMMM YYYY")}</p>
          <img className="date-time" src={clock} alt="" />
            <p>{time.toLocaleString("en-US", {
                timeStyle: "medium",
                hour12: true,
          })} </p>
        </div>
      </header>

      {/* Add product form */}
      <div className="add-product-header">
        <a href="" onClick={back} className="back">back</a>
        <h2>Update Product</h2>
      </div>
      <div className="form-container">
        <form>
          <div className="form-row">
            <label className="form-label required">Product Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Product Name"
              required
            />
          </div>
          
          <div className="form-row">
            <label className="form-label required">Product Price</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="Product Price"
              required
            />
          </div>
          
          <div className="form-row">
            <label className="form-label required">Category</label>
            <select className="form-select" required>
              <option value="" disabled selected>Category</option>
            </select>
          </div>
          
          <div className="form-row">
            <label className="form-label">Media</label>
            <div className="upload-area">
              <input 
                type="file" 
                id="img" 
                name="img" 
                accept="image/*"
                required
              />
              <div className="upload-subtitle">Accepts images in png, jpg, and jpeg</div>
              <div className="image-preview">
                <img alt="Preview" width="100" />
              </div>
            </div>
          </div>

          <button className="action-btns archive-action">Archive Product</button>
          <button className="action-btns submit-action">Update Product</button>
          <button className="action-btns delete-action">Delete Product</button>
        </form>
        
        
      </div>
    </>
  )
}

export default UpdateProduct