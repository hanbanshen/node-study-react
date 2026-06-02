// src/pages/ProductList.jsx

// useEffect：页面加载后执行代码
// useState：保存页面数据
import { useEffect, useState } from 'react'

// 引入请求工具
import request from '../api/request'

function ProductList() {
	// 保存商品列表
	// 因为商品有多个，所以初始值用空数组 []
	const [products, setProducts] = useState([])

	// 保存加载状态
	// true 表示正在加载
	const [loading, setLoading] = useState(true)

	// 保存错误提示
	const [error, setError] = useState('')

	// useEffect 会在页面加载后执行
	useEffect(() => {
		// 定义一个异步函数，用来请求商品列表
		async function getProducts() {
			try {
				// 请求后端商品接口
				// 注意：这里的 /products 必须和你的后端真实接口一致
				// 如果你的后端是 /api/products，这里要改成 /api/products
				const res = await request.get('/products')

				// 打印后端返回的数据
				// 学习阶段建议保留，方便观察数据结构
				console.log('商品接口返回结果：', res.data)

				// 情况一：后端直接返回数组
				// 例如：[ { id: 1, name: '苹果' } ]
				if (Array.isArray(res.data)) {
					setProducts(res.data)
					return
				}

				// 情况二：后端返回 { data: [...] }
				// 例如：{ code: 200, data: [ { id: 1, name: '苹果' } ] }
				if (Array.isArray(res.data.data)) {
					setProducts(res.data.data)
					return
				}

				// 如果两种都不是，说明后端返回格式和我们预期不一致
				setError('商品数据格式不正确，请查看控制台打印结果')
			} catch (err) {
				// 请求失败时执行这里
				console.log('商品加载失败错误：', err)

				// 修改错误提示
				setError('商品加载失败，请检查接口地址或后端是否启动')
			} finally {
				// 不管成功还是失败，都结束加载状态
				setLoading(false)
			}
		}

		// 调用函数，真正开始请求商品
		getProducts()
	}, [])

	// 如果正在加载，先显示加载提示
	if (loading) {
		return <div>商品加载中...</div>
	}

	// 如果有错误，显示错误信息
	if (error) {
		return <div>{error}</div>
	}

	return (
		<div>
			<h1>商品列表</h1>

			{/*
        products 是数组
        map 的作用是把数组里的每一个商品都渲染成一块页面内容
      */}
			{products.map((product) => (
				<div key={product.id}>
					<h3>{product.name}</h3>
					<p>价格：{product.price}</p>
					<p>库存：{product.stock}</p>
				</div>
			))}
		</div>
	)
}

export default ProductList