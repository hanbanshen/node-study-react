// src/components/NavBar.jsx

// Link 是 React Router 提供的跳转组件
// 它的作用类似于 HTML 里的 a 标签，但不会刷新整个页面
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
	// useNavigate 用来通过 JS 代码跳转页面
	const navigate = useNavigate()

	// 从 localStorage 里取 token
	// 如果有 token，说明用户已经登录过
	const token = localStorage.getItem('token')

	// 点击退出登录时执行
	function handleLogout() {
		// 删除本地保存的 token
		localStorage.removeItem('token')

		// 删除本地保存的用户信息
		localStorage.removeItem('user')

		// 退出后跳转到登录页
		navigate('/login')
	}

	return (
		<div>
			<h2>node-study-react</h2>

			{/*
        Link 用来跳转页面
        to="/products" 表示点击后跳转到 /products
      */}
			<Link to="/products">商品列表</Link>
			{' | '}
			<Link to="/cart">购物车</Link>
			{' | '}
			<Link to="/orders">订单</Link>
			{' | '}

			{/*
        如果没有 token，显示登录按钮
        如果有 token，显示退出登录按钮
      */}
			{!token ? (
				<Link to="/login">登录</Link>
			) : (
				<button onClick={handleLogout}>退出登录</button>
			)}

			<hr />
		</div>
	)
}

export default NavBar