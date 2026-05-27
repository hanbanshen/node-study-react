import { useState } from "react"
import './App.css'

function App() {
  // products 保存商品列表数据
  // 这里先写死假数据，后面再改成从后端接口获取
  const [products] = useState([
    {
      id: 1,
      name: '苹果手机',
      category: '数码',
      price: 5999
    },
    {
      id: 2,
      name: '机械键盘',
      category: '配件',
      price: 299
    },
    {
      id: 3,
      name: '男士外套',
      category: '服装',
      price: 199
    }
  ])

  return (
    <div className="App">
      <h1>商品列表</h1>

      <p>这是用 React 数组渲染出来的商品列表。</p>

      <div className="product-list ">
        {products.map(product => {
          return (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <p>分类：{product.category}</p>
              <p>价格：{product.price}</p>
              <button>加入购物车</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App