//vue.config.js自定义配置选项
module.exports = {
	//选项
	// publicPath:'/demo2',//设置应用部署的根目录==>http://localhost/demo2
	devServer: {
	    // proxy: 'http://localhost:4000',//如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
		host:"localhost",
		port:8888,
		open:true,
		proxy: {
		      [process.env.VUE_APP_API_BASEURL]: {
		        target: process.env.VUE_APP_SERVER_URL,//目标服务器地址，代理访问
		        changeOrigin: true,//开启代理模式
				pathRewrite:{
					['^'+process.env.VUE_APP_API_BASEURL]:'',//将请求地址中/api这段字符串替代为空
				}
		      },
		      // '/foo': {
		      //   target: '<other_url>'
		      // }
		}
	  },
	  lintOnSave:false,//关闭格式检查
	  // outputDir:'dist',//出口文件的目录
	  // assetsDir:'assets',//静态资源文件的目录
	  // indexPath:'out/index.html',//指定index生成后的路径,这个目录是相对于outputDir目录下的
	  productionSourceMap:false,//打包时不会生成map文件
}