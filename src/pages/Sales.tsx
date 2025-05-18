import "./styles/SalesDashboard.scss";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const productSalesData = [
  { name: "Dessert", sales: 400 },
  { name: "Snacks", sales: 650 },
  { name: "Shakes", sales: 500 },
  { name: "Pasta", sales: 300 },
  { name: "Shots", sales: 200 },
  { name: "Beers", sales: 550 },
];

function Sales() {
  return (
    <div className="sales-dashboard">
      <div className="header">
        <h2>Sales</h2>
        <select className="date-filter">
          <option>Last 6 Months</option>
          <option>Last Month</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Sales</h3>
          <p className="value">₱0.00</p>
          <span className="change">+0.00</span>
        </div>

        <div className="metric-card">
          <h3>Profit</h3>
          <p className="value">₱0.00</p>
          <span className="change">+0.00</span>
        </div>

        <div className="metric-card">
          <h3>Profit and Loss</h3>
          <p className="value">₱0.00</p>
          <span className="change">+0.00</span>
        </div>
      </div>

      <div className="chart-grid">
        <div className="product-sales-card">
          <h3>Product Sale</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productSalesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="warehouse-capacity-card">
          <h3>Warehouse Capacity</h3>
          <div className="capacity-bar">
            <div className="warehouse1" style={{ width: "50%" }}></div>
            <div className="warehouse2" style={{ width: "50%" }}></div>
            <div className="capacity-label">100%</div>
          </div>
          <p className="low-stock-alert">⚠️ Low Stock Alert: Pasta, Shots</p>
        </div>
      </div>
    </div>
  );
};

export default Sales