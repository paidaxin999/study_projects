import axios from 'axios';
//用于封装axios对象


const request=axios.create({
	baseURL:process.env.VUE_APP_API_BASEURL,
	// baseURL:'/',
	timeout:5000
});

export default request;