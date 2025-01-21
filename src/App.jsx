import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css'
import Layout from "./pages/_Layout";
import Landing from "./pages/Landing";
import Admin from "./pages/admin/AdminLogin";
import CustomerLogin from "./pages/clients/CustomerLogin";
import CustomerHome from "./pages/clients/Home";
import ProductPage from "./pages/clients/Products"
import ClientOrders from "./pages/clients/Orders"
import UserProfile from "./pages/clients/UserProfile"
import UserSubscribe from "./pages/clients/Subscribe";
import Flavours from './pages/clients/BubbliFlavours'
import NotFound from "./pages/404";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/clients/login" element={<CustomerLogin />} />
          <Route path="/clients/home" element={<CustomerHome />} />
          <Route path="/clients/products" element={<ProductPage />} />
          <Route path="/clients/orders" element={<ClientOrders />} />
          <Route path="/clients/profile" element={<UserProfile />} />
          <Route path="/clients/subscribe" element={<UserSubscribe />} />
          <Route path="/clients/bubbli/flavours" element={<Flavours />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
