import "./styles/SideBar.scss"

type Props = {
    onClose: () => void
}

function SideBar({onClose}: Props) {
  return (<>
    <section className="sidebar-container">
        <section className="header-bar-info-container">
            <div className="user-information-container">
                <h3 className="user-name">User Name</h3>
                <h6 className="user-role">User Role</h6>
            </div>
            <div className="close-button" onClick={onClose}>X</div>
        </section>
        <nav className="navigation-section">
            <a href="" className="sidebar-navigation inventory">Inventory</a>
            <a href="" className="sidebar-navigation product">Product</a>
        </nav>
        <footer className="footer-section">
            <button className="logout-button">logout</button>
        </footer>
    </section>
  </>
  )
}

export default SideBar