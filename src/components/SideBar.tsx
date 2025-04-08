import "./styles/SideBar.scss"
import logout from "../assets/logout-btn.svg"
import xbtn from "../assets/x-btn.svg"

type Props = {
    onClose: () => void
}

function SideBar({onClose}: Props) {
  return (<>
    <div className="section-container">
        <div className="sidebar-container">
            <section className="header-bar-info-container">
                <div className="user-information-container">
                    <h3 className="user-name">User Name</h3>
                    <h6 className="user-role">User Role</h6>
                </div>
                <div className="close-button" onClick={onClose}><img src={xbtn} alt="" /></div>
            </section>
            <nav className="navigation-section">
                <a href="" className="sidebar-navigation inventory">Inventory</a>
                <a href="" className="sidebar-navigation product">Product</a>
            </nav>
            <footer className="footer-section">
                <p className="logout-label">Log out</p>
                <img src={logout} alt="" className="logout-button" />
            </footer>
        </div>
        <div className="background-opacity">{/* background color */}</div>
    </div>
  </>
  )
}

export default SideBar