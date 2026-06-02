// src/pages/Cart.jsx

function Cart() {
	return (
		<div>
			<h1>购物车</h1>

			{/*
        这一节先只做页面入口
        后面我们再接购物车接口：
        GET /api/cart
        POST /api/cart
        PUT /api/cart/:id
        DELETE /api/cart/:id
      */}
			<p>这里以后显示当前用户的购物车商品。</p>
		</div>
	)
}

export default Cart