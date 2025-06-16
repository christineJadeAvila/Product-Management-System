import { useState, FormEvent } from "react"
import api from "../api"
import BurgerMenu from "../components/BurgerMenu"
import BackButton from "../components/BackButton"
import TimeAndDate from "../components/TimeAndDate"
import useSuppliers from "../hooks/useSuppliers"

import "./styles/AddProducts.scss"

function AddSupplier() {
  const supp = useSuppliers()
  const [supplierName, setSupplierName] = useState<string>("")
  const [contactPerson, setContactPerson] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [selectedSupplierType, setSelectedSupplierType] = useState<string>("")

  const handleAddSupplier = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData()
      
      formData.append("suppliername", supplierName)
      formData.append("contactperson", contactPerson)
      formData.append("phone", phoneNumber)
      formData.append("email", email)
      formData.append("address", address)
      formData.append("suppliertype", selectedSupplierType)
      
      try {
          const addResponse = await api.post("api/createSupplier", formData, {
              headers: { "Content-Type": "application/json" },
          })

          alert("Supplier Added Successfully!")
          console.log(addResponse.data)

          setSupplierName("")
          setContactPerson("")
          setPhoneNumber("")
          setEmail("")
          setAddress("")
          setSelectedSupplierType("")

      } catch (error) {
          console.error("Failed to add supplier:", error)
          alert("Failed to add supplier")
      }
  }

  return (
    <>
      <header className="header-bar">
        <BurgerMenu/>
        <h2 className="page-title">Inventory Management System</h2>
        {/* time and date */}
        <TimeAndDate/>
      </header>

      {/* Add product form */}
      <div className="add-product-header">
        <BackButton/>
        <h2>Add Supplier</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleAddSupplier}>
          <div className="form-row">
            <label className="form-label required">Supplier Name</label>
            <input type="text" className="form-input" placeholder="Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} required/>
          </div>
          
          <div className="form-row">
            <label className="form-label required">Contact Person</label>
            <input type="text" className="form-input" placeholder="Contact Person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} required/>
          </div>

          <div className="form-row">
            <label className="form-label required">Phone Number</label>
            <input type="number" className="form-input" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
          </div>

          <div className="form-row">
            <label className="form-label required">Email</label>
            <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="form-row">
            <label className="form-label required">Address</label>
            <input type="text" className="form-input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
          </div>

          <div className="form-row">
            <label className="form-label required">Supplier</label>
            <select className="form-select" value={selectedSupplierType} onChange={(e) => setSelectedSupplierType(e.target.value)} required>
              <option value="" disabled>Supplier</option>
              {supp.map((supplier)=>(
                <option key={supplier.supplierid} value={supplier.supplierid}>
                  {supplier.suppliertype}
                </option>
              ))}
            </select>
          </div>
          
          <button className="action-btns submit-action" type="submit">Add Supplier</button>
        </form>
      </div>
    </>
  )
}

export default AddSupplier