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
		setTimeout(() => {
			this.$router.replace(sessionStorage.getItem('path'))
		}, 1000)
	}
}
</script>

<style lang='less' scoped>
.loading {
	height: 100%;
	background: url(../../assets/load.gif) no-repeat center;
}
</style>