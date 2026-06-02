// src/pages/Login.jsx

// useState 用来保存页面中的数据
import { useState } from 'react'

// 引入自己封装好的请求工具
import request from '../api/request'

function Login() {
	// 保存用户名
	const [username, setUsername] = useState('')

	// 保存密码
	const [password, setPassword] = useState('')

	// 保存页面提示信息
	const [message, setMessage] = useState('')

	// 点击登录按钮后执行这个函数
	async function handleLogin(e) {
		// 阻止表单默认刷新页面
		// 如果不写，点击登录后页面会刷新，React 状态会丢失
		e.preventDefault()

		try {
			// 向后端发送登录请求
			// 注意：这里的 /login 必须和你的后端真实接口一致
			// 如果你的后端是 /api/login，这里就要改成 /api/login
			const res = await request.post('/login', {
				username: username,
				password: password
			})

			// 打印后端返回的数据
			// 学习阶段非常重要，可以帮你看清楚 res.data 长什么样
			console.log('登录接口返回结果：', res.data)

			// 假设后端返回的是 { token: 'xxx' }
			// 那么这里就从 res.data.token 里取 token
			const token = res.data.token

			// 如果后端没有返回 token，给出提示
			if (!token) {
				setMessage('登录接口成功了，但后端没有返回 token')
				return
			}

			// 把 token 保存到浏览器本地
			// 以后请求购物车、订单接口时可以自动带上 token
			localStorage.setItem('token', token)

			// 修改页面提示
			setMessage('登录成功')
		} catch (err) {
			// 如果请求失败，执行这里
			console.log('登录失败错误：', err)

			// 修改页面提示
			setMessage('登录失败，请检查接口地址、账号密码或后端是否启动')
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

				<button type="submit">登录</button>
			</form>

			<p>{message}</p>
		</div>
	)
}

export default Login