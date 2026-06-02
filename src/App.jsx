// BrowserRouter：开启前端路由功能
// Routes：包住所有 Route
// Route：配置一个路径对应一个页面
// Navigate：重定向页面
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// 引入导航栏组件
import NavBar from "./components/NavBar"

// 引入受保护的路由组件
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// 引入页面组件
import Login from './pages/Login.jsx'
import ProductList from './pages/ProductList.jsx'
import Cart from './pages/Cart.jsx'
import OrderList  from "./pages/OrderList.jsx";

function App() {
 return (
   <BrowserRouter>
     {/*
        NavBar 放在 Routes 外面
        这样每个页面上方都会显示导航栏
     */}
     <NavBar />

     <Routes>
       {/*
        默认访问 / 时，自动跳转到 /products
        replace 表示替换历史记录
       */}
       <Route path="/" element={<Navigate to="/products" replace />} />

       {/* 登录页 */}
       <Route path="/login" element={<Login />} />

       {/* 商品列表页 */}
       <Route path="/products" element={<ProductList />} />

       {/*
        下面这些页面需要登录才能访问
        ProtectedRoute 负责检查有没有 token
       */}
       <Route element={<ProtectedRoute/>}>
         <Route path="/cart" element={<Cart/>} />
         <Route path="/orders" element={<OrderList />} />
       </Route>

       {/*
            如果用户访问一个不存在的地址
            比如 /abc
            就显示这个简单提示
          */}
       <Route path="*" element={<div>页面不存在</div>} />
     </Routes>
   </BrowserRouter>
 )
}

export default App