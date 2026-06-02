// src/pages/Login.jsx

// useState 用来保存页面数据
import { useState } from 'react'

// useNavigate 用来在 JS 代码里跳转页面
import { useNavigate } from 'react-router-dom'

// 引入请求工具
import request from '../api/request'

function Login() {
	// 保存用户名
	const [username, setUsername] = useState('')

	// 保存密码
	const [password, setPassword] = useState('')

	// 保存提示信息
	const [message, setMessage] = useState('')

	// 保存登录按钮是否正在提交
	// false 表示没有提交中
	const [loading, setLoading] = useState(false)

	// 创建跳转函数
	const navigate = useNavigate()

	// 点击登录按钮后执行
	async function handleLogin(e) {
		// 阻止表单默认刷新
		e.preventDefault()

		// 简单前端校验
		// trim() 是去掉字符串左右两边的空格
		if (!username.trim()) {
			setMessage('请输入用户名')
			return
		}

		if (!password) {
			setMessage('请输入密码')
			return
		}

		try {
			// 开始登录，把按钮改成提交中状态
			setLoading(true)

			// 清空旧提示
			setMessage('')

			// 请求后端登录接口
			const res = await request.post('/api/auth/login', {
				username: username,
				password: password
			})

			// 打印后端返回结果，方便学习
			console.log('登录接口返回结果：', res.data)

			// 你的后端 token 在 res.data.data.token
			const token = res.data.data.token

			// 当前登录用户信息
			const user = res.data.data.user

			// 如果后端没有返回 token，就提示错误
			if (!token) {
				setMessage('登录失败：后端没有返回 token')
				return
			}

			// 保存 token
			localStorage.setItem('token', token)

			// 保存用户信息
			localStorage.setItem('user', JSON.stringify(user))

			// 提示登录成功
			setMessage('登录成功')

			// 登录成功后跳转到商品列表页
			navigate('/products')
		} catch (err) {
			// 打印完整错误
			console.log('登录失败错误：', err)

			// 优先显示后端返回的错误信息
			const errorMessage = err.response?.data?.message || '登录失败，请检查账号密码或后端服务'

			// 显示错误提示
			setMessage(errorMessage)
		} finally {
			// 不管登录成功还是失败，都结束提交状态
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>登录</h1>

			<form onSubmit={handleLogin}>
				<div>
					<input
						type="text"
						placeholder="请输入用户名"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<input
						type="password"
						placeholder="请输入密码"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{/*
          loading 为 true 时，禁用按钮
          这样可以防止用户连续点击多次登录
        */}
				<button type="submit" disabled={loading}>
					{loading ? '登录中...' : '登录'}
				</button>
			</form>

			{/* 有 message 时才显示提示 */}
			{message && <p>{message}</p>}
		</div>
	)
}

export default Login