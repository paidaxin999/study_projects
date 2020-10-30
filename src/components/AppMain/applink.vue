<template>
	<el-breadcrumb separator-class="el-icon-arrow-right" v-show="($route.path)!=='/home'">
	  <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta['title']}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
</script>

<style>
</style>
