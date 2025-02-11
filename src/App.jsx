import { Routes, Route } from "react-router-dom";
import Layout from "./pages/_Layout";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminHome from "./pages/admin/AdminHome";
import AgentProfile from "./pages/admin/AgentProfile";
import CustomerLogin from "./pages/clients/CustomerLogin";
import CustomerSignUp from "./pages/clients/CustomerSignUp";
import CustomerHome from "./pages/clients/Home";
import ProductPage from "./pages/clients/Products";
import ClientOrders from "./pages/clients/Orders";
import UserProfile from "./pages/clients/UserProfile";
import SubscriptionOnboarding from "./pages/clients/Subscribe";
import UserSubscriptions from "./pages/clients/UserSubscription.jsx";
import Flavours from "./pages/clients/BubbliFlavours";
import CommunityRewards from "./pages/clients/CommunityRewards";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/404";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/registration" element={<AdminRegistration />} />
        <Route path="/admin/agent/profile" element={<AgentProfile />} />
        <Route path="/clients/login" element={<CustomerLogin />} />
        <Route path="/clients/signup" element={<CustomerSignUp />} />
        <Route path="/clients/subscribe" element={<SubscriptionOnboarding />} />
        <Route path="/clients/home" element={<CustomerHome />} />
        <Route path="/clients/products" element={<ProductPage />} />
        <Route path="/clients/orders" element={<ClientOrders />} />
        <Route path="/clients/profile" element={<UserProfile />} />
        <Route path="/clients/profile/subscriber" element={<UserSubscriptions />} />
        <Route path="/clients/bubbli/flavours" element={<Flavours />} />
        <Route path="/clients/rewards" element={<CommunityRewards />} />
        <Route path="/denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
