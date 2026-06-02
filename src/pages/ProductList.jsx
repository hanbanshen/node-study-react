import { useEffect, useState} from "react";
import request from '../api/request.js'

function ProductList() {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		async function getProducts() {
			try {
				const res = await request.get('/products')
				setProducts(res.data)
			} catch (err) {
				setError('商品加载失败')
			} finally {
				setLoading(false)
			}
		}

		getProducts()
	}, [])

	if (loading) {
		return <div>商品加载中...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div>
			<h1>商品列表</h1>

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