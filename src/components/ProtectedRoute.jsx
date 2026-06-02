// src/components/ProtectedRoute.jsx

// Navigate 用来重定向页面
// Outlet 用来显示被保护的子页面
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
	// 从 localStorage 中读取 token
	const token = localStorage.getItem('token')

	// 如果没有 token，说明用户没有登录
	if (!token) {
		// 重定向到登录页
		// replace 的作用是替换当前历史记录
		// 这样用户点击浏览器返回，不会又回到受保护页面
		return <Navigate to="/login" replace />
	}

	// 如果有 token，说明用户已登录
	// Outlet 表示显示它下面配置的子路由页面
	return <Outlet />
}

export default ProtectedRoute