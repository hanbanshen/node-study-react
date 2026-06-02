// src/api/request.js

// 引入 axios，用它来请求后端接口
import axios from 'axios'

// 创建一个 axios 实例
// 以后所有接口请求都通过 request 来发
const request = axios.create({
	// 后端服务器地址
	// 如果你的后端是 localhost:3000，就写这个
	baseURL: 'http://localhost:3000',

	// 请求超时时间，单位是毫秒
	// 5000 表示 5 秒内后端没响应，就认为请求失败
	timeout: 5000
})

// 请求拦截器
// 作用：每次请求发出去之前，先经过这里
request.interceptors.request.use(
	(config) => {
		// 从浏览器本地存储中取出 token
		const token = localStorage.getItem('token')

		// 如果 token 存在，说明用户之前登录过
		if (token) {
			// 把 token 放进请求头
			// 后端可以通过 Authorization 判断用户身份
			config.headers.Authorization = `Bearer ${token}`
		}

		// 必须 return config
		// 不 return 的话，请求发不出去
		return config
	},
	(error) => {
		// 如果请求发送前就出错，直接返回错误
		return Promise.reject(error)
	}
)

// 响应拦截器
// 作用：后端返回结果之后，先经过这里
request.interceptors.response.use(
	(response) => {
		// 正常返回时，直接把 response 返回给页面
		return response
	},
	(error) => {
		// 请求失败时，在控制台打印详细错误，方便学习和排查
		console.log('接口请求失败：', error)

		// 把错误继续抛给页面的 catch 去处理
		return Promise.reject(error)
	}
)

// 导出 request，其他页面才能 import 使用
export default request