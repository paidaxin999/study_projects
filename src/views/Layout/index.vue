<template>
	<div class="Apphome">
		<app-header></app-header>
		<app-left></app-left>
		<app-main></app-main>
	</div>
</template>

<script>
	import AppHeader from '../../components/AppHeader/index.vue';
	import AppLeft from '../../components/AppLeft/index.vue';
	import AppMain from '../../components/AppMain/index.vue';
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		components:{
			AppHeader,
			AppLeft,
			AppMain
		}
	}
</script>

<style scoped="scoped">
	#home{
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.AppHeader{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-color: #2d3a4b;
		overflow: hidden;
		text-align: center;
	}
	.AppLeft{
		position: absolute;
		top: 60px;
		bottom: 0;
		background-color: #545c64;
		width: 240px;
		text-align: center;
		overflow-y: auto;
		line-height: 60px;
		
	}
	.AppMain{
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 240px;
		right: 0;
		text-align: left;
		/* overflow: hidden; */
		overflow-y: auto;
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}
</style>
