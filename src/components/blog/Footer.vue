<template>
	<div class="footer">
		<div class="content">
			Copyright © 2019 by
			<a href>Hobbs</a> . All rights reserved. | Theme :
			<a href>Akina For Typecho .</a>
		</div>
		<div class="icp">黔ICP备00000000号</div>
		<transition name="fade">
			<div class="back-top" @click="backTop()" v-show="btn">
				<i class="el-icon-caret-top"></i>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			btn: false
		}
	},
	mounted() {
		window.addEventListener('scroll', this.scrollToTop)
	},
	destroyed() {
		window.removeEventListener('scroll', this.scrollToTop)
	},
	methods: {
		// 点击图片回到顶部方法，加计时器是为了过渡顺滑
		backTop() {
			let timer = setInterval(() => {
				if (document.documentElement.scrollTop > 0) {
					document.documentElement.scrollTop -= 50
				} else {
					clearInterval(timer)
				}
			}, 10)
		},

		// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
		scrollToTop() {
			let scrollTop = document.documentElement.scrollTop
			// let scrollTop =
			// 	window.pageYOffset ||
			// 	document.documentElement.scrollTop ||
			// 	document.body.scrollTop
			this.btn = scrollTop > 600 ? true : false
		}
	}
}
</script>

<style lang='less' scoped>
.footer {
	border-top: 1px solid #b9b9b9;
	padding: 25px;
	height: 110px;
	position: relative;
	font-size: 13px;
	.content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		color: #b9b9b9;
		a {
			color: #848484;
		}
	}
	.icp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		color: #848484;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.7s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	.back-top {
		cursor: pointer;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		background: #a0dad0;
		position: fixed;
		right: 30px;
		bottom: 30px;
		display: flex;
		&:hover {
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
		}
		.el-icon-caret-top {
			margin: auto;
			color: #fff;
			font-size: 22px;
		}
	}
}
@media screen and (max-width: 992px) {
	.footer {
		height: 150px;
		padding: 25px 0;
		.content {
			width: 74%;
			text-align: center;
			line-height: 20px;
		}
		.icp {
			top: 50%;
		}
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity 0.7s;
		}
		.fade-enter,
		.fade-leave-to {
			opacity: 0;
		}
		.back-top {
			cursor: pointer;
			height: 40px;
			width: 40px;
			border-radius: 50%;
			background: #a0dad0;
			position: fixed;
			right: 30px;
			bottom: 30px;
			display: flex;
			&:hover {
				box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
			}
			.el-icon-caret-top {
				margin: auto;
				color: #fff;
				font-size: 22px;
			}
		}
	}
}
</style>