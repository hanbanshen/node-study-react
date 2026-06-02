import { useState } from "react"
import request from "../api/request.js"

function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")

	async function handleLogin() {
		e.preventDefault()

		try {
			const res = await request.post('/login', {
				username,
				password
			})

			localStorage.setItem("token", res.data.token)
			setMessage('登陆成功')
		} catch (err) {
			setMessage('登陆失败')
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