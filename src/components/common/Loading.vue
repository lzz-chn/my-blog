<template>
	<div class="loading"></div>
</template>

<script>
export default {
	name: 'Loading ',
	data() {
		return {}
	},
	mounted() {
		// console.log('loading:', sessionStorage.getItem('params'))
		setTimeout(() => {
			// this.$router.push({
			// 	name: sessionStorage.getItem('path'),
			// 	params: sessionStorage.getItem('params')
			// })
			this.$router.push(sessionStorage.getItem('path'))
		}, 2000)
	}
}
</script>

<style lang='less' scoped>
.loading {
	height: 100%;
	background: url(../../assets/load.gif) no-repeat center;
}
</style>