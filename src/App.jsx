import { Routes, Route } from "react-router-dom";
import Layout from "./pages/_Layout";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AgentProfile from "./pages/admin/AgentProfile";
import CustomerLogin from "./pages/clients/CustomerLogin";
import CustomerSignUp from "./pages/clients/CustomerSignUp";
import CustomerHome from "./pages/clients/Home";
import ProductPage from "./pages/clients/Products";
import ClientOrders from "./pages/clients/Orders";
import UserProfile from "./pages/clients/UserProfile";
import UserSubscribe from "./pages/clients/Subscribe";
import Flavours from "./pages/clients/BubbliFlavours";
import NotFound from "./pages/404";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/agent/profile" element={<AgentProfile />} />
        <Route path="/clients/login" element={<CustomerLogin />} />
        <Route path="/clients/signup" element={<CustomerSignUp />} />
        <Route path="/clients/home" element={<CustomerHome />} />
        <Route path="/clients/products" element={<ProductPage />} />
        <Route path="/clients/orders" element={<ClientOrders />} />
        <Route path="/clients/profile" element={<UserProfile />} />
        <Route path="/clients/subscribe" element={<UserSubscribe />} />
        <Route path="/clients/bubbli/flavours" element={<Flavours />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
