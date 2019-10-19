<template>
	<div class="admin">
		<div class="header">
			<div class="left">
				<div class="btn" @click="isCollapse=!isCollapse">
					<i class="el-icon-s-fold" v-if="!isCollapse"></i>
					<i class="el-icon-s-unfold" v-if="isCollapse"></i>
				</div>
				<router-link to="/admin">后台管理系统</router-link>
			</div>
			<div class="right">
				<img src="../../assets/hobbs.png" class="avatar" />
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						admin
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<router-link to="/admin/userInfo">
							<el-dropdown-item>用户信息</el-dropdown-item>
						</router-link>
						<router-link to="/admin/adminAbout">
							<el-dropdown-item>关于</el-dropdown-item>
						</router-link>
						<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-tooltip effect="dark" content="返回博客主页" placement="bottom">
					<i class="el-icon-s-home" @click="$router.push('/')"></i>
				</el-tooltip>
			</div>
		</div>
		<div class="sidebar">
			<el-menu
				default-active="/admin/home"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				background-color="#05668d"
				text-color="#fff"
				active-text-color="#ffd04b"
				:collapse="isCollapse"
				router
			>
				<el-menu-item index="/admin/home">
					<i class="el-icon-house"></i>
					<span slot="title">系统主页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-s-order"></i>
						<span>内容管理</span>
					</template>
					<el-menu-item index="/admin/articleList">文章管理</el-menu-item>
				</el-submenu>
				<!-- <el-menu-item index="3">
					<i class="el-icon-menu"></i>
					<span slot="title">导航管理</span>
				</el-menu-item>-->
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-s-tools"></i>
						<span>网站设置</span>
					</template>
					<el-menu-item index="/admin/adminWebsite">关于页面</el-menu-item>
				</el-submenu>
				<el-menu-item index="/admin/userInfo">
					<i class="el-icon-user-solid"></i>
					<span slot="title">用户信息</span>
				</el-menu-item>
				<el-menu-item index="/admin/adminAbout">
					<i class="el-icon-info"></i>
					<span slot="title">关于</span>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content" :style="isCollapse?'margin-left: 64px':''">
			<router-view />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Admin',
	data() {
		return {
			isCollapse: false,
			content: 'content contentCollapse'
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},

		handleCommand(command) {
			console.log('command :', command)
			if (command == 'logout') {
				localStorage.removeItem('adminName')
				this.$message.success('退出成功')
				this.$router.push('/admin/login')
			}
		}
	},
	created() {
		this.$axios
			.post('/admin', { user: localStorage.getItem('adminName') })
			.then(response => {
				if (response.data.includes('not found')) {
					this.$router.push('/admin/login')
				} else {
					this.$router.push('/admin/home')
				}
			})
	}
}
</script>

<style lang='less' scoped>
.admin {
	height: 100%;
	position: relative;
	padding-top: 70px;
	overflow: hidden;
	.header {
		position: absolute;
		height: 70px;
		width: 100%;
		top: 0;
		z-index: 1;
		background: #028090;
		color: #fff;
		padding: 0 20px;
		.left {
			display: flex;
			float: left;
			align-items: center;
			height: 100%;
			font-size: 22px;
			.btn {
				padding-right: 20px;
				cursor: pointer;
			}
		}
		.right {
			font-size: 22px;
			float: right;
			display: flex;
			align-items: center;
			height: 100%;
			.el-icon-s-home {
				margin-left: 15px;
				cursor: pointer;
				&:hover {
					color: #324157;
				}
			}
			.avatar {
				height: 35px;
				margin-right: 10px;
				border-radius: 10px;
			}
			.el-dropdown-link {
				cursor: pointer;
				color: #fff;
			}
		}
	}
	.sidebar {
		position: absolute;
		left: 0;
		top: 70px;
		height: 100%;
		// background: #05668d;
		.el-menu-vertical-demo {
			height: 100%;
			&:not(.el-menu--collapse) {
				width: 250px;
			}
			// i {
			// 	color: #fff;
			// }
		}
	}
	.content {
		margin-left: 250px;
		height: 100%;
		padding: 10px;
		background: #f0f0f0;
		transition: all 0.3s ease-in-out;
		overflow-y: scroll;
	}
}
</style>