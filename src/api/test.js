import request from '../util/request.js';
//所有的api请求都封装在这里
// const baseUrl='/api';
export default {
	getlist(){
		const req=request.get('/data.json');
		return req;
	}
}

// request.get('/data.json').then((response)=>{
// 	let data=response.data;
// 	console.log(data);
// }).catch(function (error) {console.log(error);
// }).then(function () { console.log('finally!'); });