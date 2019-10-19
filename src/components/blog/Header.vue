<template>
	<div class="header">
		<div class="nav">
			<router-link to="/">
				<img src="@/assets/akina.png" alt="logo" class="logo" />
			</router-link>
			<div class="icons">
				<div class="menu">
					<ul>
						<li>
							<router-link to="/">首页</router-link>
						</li>
						<li>
							<router-link to="/classify/phone?type='手机平板'">手机平板</router-link>
						</li>
						<li>
							<router-link to="/classify/pc?type='硬件装机'">硬件装机</router-link>
						</li>
						<li>
							<router-link to="/classify/wear?type='智能穿戴'">智能穿戴</router-link>
						</li>
						<li>
							<router-link to="/about">关于</router-link>
						</li>
					</ul>
					<i class="el-icon-menu"></i>
				</div>
				<div class="search">
					<i class="el-icon-search"></i>
					<input
						v-model="searchData"
						class="inp"
						type="text"
						placeholder="Search..."
						@keyup.enter="search"
					/>
				</div>
				<router-link to="/admin/login">
					<i class="el-icon-user"></i>
				</router-link>
			</div>
		</div>
		<div
			class="centerBg"
			v-if="$route.name == 'Home'|| $route.name == 'ClassifyBase'"
			:style="bgImg"
		>
			<div class="userInfo">
				<!-- <img class="user" src="@/assets/akinadeaava.jpg" /> -->
				<img class="user" :src="userInfo.avatar || '@/assets/akinadeaava.jpg '" />
				<!-- <div class="info">Carpe Diem and Do what I like</div> -->
				<div
					class="info"
				>{{this.userInfo.slogan ||" Carpe Diem and Do what I like"}}</div>
				<ul class="share">
					<li>
						<a href="https://weibo.com" title="weibo" target="_blank">
							<img src="@/assets/sina.png" />
						</a>
						<a href="https://im.qq.com" title="qq" target="_blank">
							<img src="@/assets/qq.png" />
						</a>
						<a href="https://qzone.qq.com" title="qzone" target="_blank">
							<img src="@/assets/qzone.png" />
						</a>
						<a href="https://github.com" title="github" target="_blank">
							<img src="@/assets/github.png" />
						</a>
					</li>
				</ul>
			</div>
			<div class="slant slant-left"></div>
			<div class="slant slant-right"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Heder',
	props: ['userInfo'],
	data() {
		return {
			centerBgStatus: true,
			bgImg: null,
			searchData: ''
		}
	},
	created() {
		this.bgImg =
			'background-image: url(' + this.userInfo.bgImg ||
			'../../assets/centerBg.jpg' + ')'
	},
	methods: {
		search() {
			this.$router.push(
				`/classify/name?type='name'&name='${this.searchData}'`
			)
		}
	}
}
</script>

<style lang='less' scoped>
.header {
	// height: 630px;
	// overflow: hidden;
	.nav {
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		padding: 0 60px;

		.icons {
			font-size: 30px;
			color: #b7b7b7;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			i {
				margin: 0 5px;
			}

			.menu {
				display: flex;
				height: 40px;
				justify-content: space-between;
				align-items: center;
				ul {
					opacity: 0;
					color: #545454;
					font-size: 16px;
					li {
						display: inline-block;
						margin: 5px;

						&:hover {
							color: #a6dcd3;
						}
					}
				}
				&:hover ul {
					opacity: 1;
					transition: 0.7s;
				}
				.el-icon-menu {
					cursor: pointer;
				}
			}
			.search {
				display: flex;
				align-items: center;
				transition: all 0.3s;
				.el-icon-search {
					cursor: pointer;
				}
				.inp {
					height: 30px;
					width: 0;
					border: none;
					border-bottom: 1px solid #ddd;
					outline: none;
					font-size: 16px;
					transition: all 0.3s;
				}
				// &:hover .el-icon-search {
				// 	padding-right: 200px;
				// }
				&:hover .inp {
					width: 200px;
					padding: 5px;
				}
			}
		}
	}

	.centerBg {
		height: 550px;
		overflow: hidden;
		background: no-repeat center/cover;
		// background: url(../../assets/centerBg.jpg) no-repeat center/cover;
		position: relative;
		display: flex;

		.userInfo {
			margin: 140px auto;
			.user {
				height: 80px;
				border-radius: 50%;
				border: 3px solid rgba(255, 255, 255, 0.3);
				position: relative;
				left: 50%;
				transform: translateX(-50%);
			}
			.info {
				color: #fff;
				line-height: 30px;
				padding: 20px 120px;
				background-color: rgba(0, 0, 0, 0.5);
				margin: 30px 0;
			}
			.share {
				img {
					background-color: #fff;
					height: 30px;
					border-radius: 50%;
					margin: 0 3px;
				}
				display: inline-block;
				position: relative;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.slant {
			position: absolute;
			bottom: -60px;
			width: 60%;
			height: 120px;
			background-color: #fff;
		}

		.slant-left {
			left: -20px;
			transform: rotate(7deg);
		}

		.slant-right {
			right: -20px;
			transform: rotate(-7deg);
		}
	}
}
</style>