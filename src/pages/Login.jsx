// src/pages/Login.jsx

// useState 用来保存页面上的数据
// 比如用户名、密码、提示信息
import { useState } from 'react'

// 引入封装好的 axios 请求工具
import request from '../api/request'

function Login() {
	// username 保存用户输入的用户名
	const [username, setUsername] = useState('')

	// password 保存用户输入的密码
	const [password, setPassword] = useState('')

	// message 保存页面提示，比如“登录成功”或“登录失败”
	const [message, setMessage] = useState('')

	// 用户点击登录按钮后，会执行这个函数
	async function handleLogin(e) {
		// 阻止表单默认刷新页面
		// React 项目里一般不希望表单提交后刷新整个页面
		e.preventDefault()

		try {
			// 调用后端登录接口
			// 你的后端 app.js 挂载的是 /api/auth
			// authApiRoutes.js 里面写的是 /login
			// 所以完整接口路径是 /api/auth/login
			const res = await request.post('/api/auth/login', {
				username: username,
				password: password
			})

			// 打印后端返回结果，学习阶段建议保留
			// 你可以在浏览器控制台看到 res.data 的真实结构
			console.log('登录接口返回结果：', res.data)

			// 你的后端统一返回格式是：
			// {
			//   message: '登陆成功',
			//   data: {
			//     token: 'xxx',
			//     user: {...}
			//   }
			// }
			// 所以 token 在 res.data.data.token 里面
			const token = res.data.data.token

			// user 是当前登录用户信息
			const user = res.data.data.user

			// 如果没有 token，说明后端返回结构不符合预期
			if (!token) {
				setMessage('登录失败：后端没有返回 token')
				return
			}

			// 把 token 保存到浏览器本地
			// 后面访问购物车、订单等需要登录的接口时会用到
			localStorage.setItem('token', token)

			// 顺便把用户信息也保存起来，后面可以显示用户名、判断角色
			localStorage.setItem('user', JSON.stringify(user))

			// 修改页面提示
			setMessage('登录成功')
		} catch (err) {
			// 如果接口请求失败，会进入这里
			console.log('登录失败错误：', err)

			// err.response?.data?.message 是后端返回的错误原因
			// 比如：用户名或密码错误
			const errorMessage = err.response?.data?.message || '登录失败，请检查账号密码或后端服务'

			// 把错误信息显示到页面上
			setMessage(errorMessage)
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