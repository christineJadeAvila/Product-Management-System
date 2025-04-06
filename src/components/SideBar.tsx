
function SideBar() {
  return (<>
    <section className="sidebar-container">
        <section className="header-bar-info-container">
            <div className="user-information-container">
                <h3 className="user-name">User Name</h3>
                <h6 className="user-role">User Role</h6>
            </div>
            <button className="close-button">X</button>
        </section>

        <nav className="navigation-section">
            <a href="" className="sidebar-navigation">Inventory</a>
            <a href="" className="sidebar-navigation">Product</a>
        </nav>

        <footer className="footer-section">
            <button className="logout-button">logout</button>
        </footer>
    </section>
  </>
  )
}

export default SideBar