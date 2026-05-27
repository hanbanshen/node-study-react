import { useState } from 'react'
import './App.css'

function App() {
  // 商品列表数据
  // 现在先用假数据，后面再从后端接口获取
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

  // cartCount 表示购物车里的商品总数量
  // 初始值是 0
  const [cartCount, setCartCount] = useState(0)

  // 点击加入购物车时执行
  // product 表示当前点击的这个商品
  function addToCart(product) {
    console.log('加入购物车的商品：', product)

    // 购物车数量 +1
    setCartCount(cartCount + 1)
  }

  return (
    <div className="app">
      <div className="page-header">
        <div>
          <h1>商品列表</h1>
          <p>点击商品按钮，可以模拟加入购物车。</p>
        </div>

        <div className="cart-box">
          购物车数量：{cartCount}
        </div>
      </div>

      <div className="product-list">
        {products.map(product => {
          return (
            <div className="product-card" key={product.id}>
              <h2>{product.name}</h2>
              <p>分类：{product.category}</p>
              <p>价格：{product.price} 元</p>

              <button onClick={() => addToCart(product)}>
                加入购物车
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App