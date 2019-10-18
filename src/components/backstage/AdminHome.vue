<template>
	<div class="adminHome">
		<div class="content">
			<span>welcome</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminHome',
	data() {
		return {}
	}
}
</script>

<style lang='less' scoped>
.adminHome {
	height: inherit;
	overflow: hidden;
	.content {
		background: #fff;
		padding: 30px;
		border-radius: 5px;
		border: 1px solid #dddddd;
		height: 100%;
		position: relative;

		span {
            font-size: 40px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>