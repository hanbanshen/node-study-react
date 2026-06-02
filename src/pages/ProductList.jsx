// src/pages/ProductList.jsx

// useEffect：页面加载后自动执行代码
// useState：保存页面数据
import { useEffect, useState } from 'react'

// 引入封装好的请求工具
import request from '../api/request'

function ProductList() {
	// products 保存商品数组
	// 因为商品列表是多个商品，所以初始值用 []
	const [products, setProducts] = useState([])

	// loading 表示是否正在加载
	// 页面刚打开时，要先请求后端，所以初始值是 true
	const [loading, setLoading] = useState(true)

	// error 保存错误提示
	// 一开始没有错误，所以是空字符串
	const [error, setError] = useState('')

	// useEffect 会在组件第一次显示到页面后执行
	useEffect(() => {
		// 请求商品列表的函数
		async function getProducts() {
			try {
				// 调用后端商品 API
				// 你的 app.js 挂载的是 /api/products
				// productApiRoutes.js 里面 router.get('/') 表示根路径
				// 所以完整路径是 /api/products
				const res = await request.get('/api/products')

				// 打印后端返回数据，方便你学习和排查
				console.log('商品接口返回结果：', res.data)

				// 你的后端返回结构是：
				// {
				//   message: '查询商品列表成功',
				//   data: {
				//     total,
				//     page,
				//     pageSize,
				//     list: [...]
				//   }
				// }
				// 所以真正的商品数组是 res.data.data.list
				const list = res.data.data.list

				// 判断 list 是不是数组
				// 如果是数组，说明数据格式正确，可以保存到 products
				if (Array.isArray(list)) {
					setProducts(list)
					return
				}

				// 如果不是数组，说明后端返回格式不是我们预期的格式
				setError('商品数据格式不正确，请查看控制台')
			} catch (err) {
				// 请求失败会进入这里
				console.log('商品加载失败错误：', err)

				// 优先显示后端返回的错误 message
				const errorMessage = err.response?.data?.message || '商品加载失败，请检查接口地址或后端是否启动'

				// 把错误信息显示到页面
				setError(errorMessage)
			} finally {
				// finally 不管成功还是失败都会执行
				// 请求结束后，把 loading 改成 false
				setLoading(false)
			}
		}

		// 调用函数，真正开始请求商品数据
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

			{/* 如果没有商品，给用户一个提示 */}
			{products.length === 0 && <p>暂无商品</p>}

			{/*
        products 是数组
        map 的作用：把数组里的每一个商品都变成一块页面内容
      */}
			{products.map((product) => (
				<div key={product.id}>
					<h3>{product.name}</h3>

					{/* category 是商品分类 */}
					<p>分类：{product.category}</p>

					{/* price 是商品价格 */}
					<p>价格：{product.price}</p>
				</div>
			))}
		</div>
	)
}

export default ProductList