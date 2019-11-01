<template>
	<div class="login">
		<div class="login-box">
			<div class="title">后台管理系统</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="content">
				<el-form-item prop="user">
					<el-input v-model="ruleForm.user" placeholder="请输入账号" clearable prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input
						v-model="ruleForm.pwd"
						placeholder="请输入密码"
						clearable
						show-password
						prefix-icon="el-icon-lock"
						@keyup.enter.native="login"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
			<!-- <p>Tips：admin</p> -->
		</div>
		<div class="login-warn">请使用PC端登陆后台管理系统</div>
		<div class="home">
			<el-tooltip effect="dark" content="返回博客主页" placement="bottom">
				<i class="el-icon-s-home" @click="$router.push('/')"></i>
			</el-tooltip>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			ruleForm: {
				user: '',
				pwd: ''
			},
			rules: {
				user: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
		}
	},
	created() {
		this.$axios
			.post('/admin', { user: localStorage.getItem('adminName') })
			.then(response => {
				if (response.data.includes('existed')) {
					this.$router.push('/admin')
				}
			})
	},
	methods: {
		login() {
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.$axios
						.post('/admin/login', {
							user: this.$data.ruleForm.user,
							pwd: this.$data.ruleForm.pwd
						})
						.then(response => {
							if (response.data.includes('success')) {
								this.$message.success('登录成功')
								localStorage.setItem(
									'adminName',
									this.$data.ruleForm.user
								)
								this.$router.push('/admin')
							} else {
								this.$message.error('登录失败')
							}
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style lang='less' scoped>
.login {
	height: 100%;
	background: url(../../assets/login.jpg) no-repeat center/cover;
	position: relative;

	.login-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 300px;
		width: 400px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 20px;
		padding: 20px;
		.title {
			text-align: center;
			margin-bottom: 20px;
			font-size: 25px;
			color: #606266;
			border-bottom: 2px solid #fff;
			padding-bottom: 20px;
		}
		.content {
			padding: 0 20px;
			> div {
				margin-bottom: 20px;
			}
			button {
				margin-top: 10px;
				width: 100%;
			}
		}
		p {
			position: relative;
			top: -13px;
			left: 20px;
			color: #606266;
			font-size: 12px;
		}
	}
	.login-warn {
		display: none;
	}
	.home {
		position: absolute;
		top: 0;
		right: 0;
		margin: 20px;
		font-size: 25px;
		color: #409eff;
		cursor: pointer;
	}
}
@media screen and (max-width: 992px) {
	.login {
		.login-box {
			display: none;
		}
		.login-warn {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 300px;
			text-align: center;
			background: rgba(255, 255, 255, 0.5);
			border-radius: 10px;
			padding: 10px;
			color: #454749;
			font-size: 20px;
		}
	}
}
</style>