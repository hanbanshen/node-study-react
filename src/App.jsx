// src/App.jsx

// 引入登录页面
import Login from './pages/Login'

// 引入商品列表页面
import ProductList from './pages/ProductList'

function App() {
  return (
    <div>
      {/* 显示登录组件 */}
      <Login />

      {/* 分割线，让页面看起来更清楚 */}
      <hr />

      {/* 显示商品列表组件 */}
      <ProductList />
    </div>
  )
}

export default App