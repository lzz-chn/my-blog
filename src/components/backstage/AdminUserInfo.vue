<template>
	<div class="adminUserInfo">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-user-solid"></i>
				用户信息
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<el-form ref="form" :model="userInfo" label-width="80px" size="small">
				<el-form-item label="名称">
					<el-input v-model="userInfo.name"></el-input>
				</el-form-item>
				<el-form-item label="标语">
					<el-input v-model="userInfo.slogan"></el-input>
				</el-form-item>
				<el-form-item label="通知">
					<el-input type="textarea" v-model="userInfo.inform"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-upload
						class="avatar-uploader"
						ref="uploadAvatar"
						v-model="userInfo.avatar"
						action="string"
						:show-file-list="false"
						:auto-upload="false"
						:http-request="avatarRequest"
						:on-change="handleAvatarChange"
					>
						<img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="博客背景">
					<el-upload
						class="bgImg-uploader"
						ref="uploadBg"
						v-model="userInfo.bgImg"
						action="string"
						:show-file-list="false"
						:auto-upload="false"
						:http-request="bgRequest"
						:on-change="handleBgrChange"
					>
						<img v-if="userInfo.bgImg" :src="userInfo.bgImg" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交</el-button>
					<el-button @click="goBack">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminUserInfo',
	data() {
		return {
			userInfo: {
				name: '',
				slogan: '',
				inform: '',
				avatar: '',
				bgImg: ''
			},
			avatarFile: false,
			bgImgFile: false
		}
	},
	mounted() {
		this.$axios
			.get('/admin/getUserInfo')
			.then(res => {
				for (let i in res.data) {
					this.userInfo[i] = res.data[i]
				}
			})
			.catch(error => {
				console.log('error :', error)
				this.$message.error('服务器链接异常')
			})
	},
	methods: {
		avatarRequest(item) {
			// console.log('avatar :', item.file)
			this.avatarFile = item.file // 获取上传文件
		},
		bgRequest(item) {
			// console.log('bg :', item.file)
			this.bgImgFile = item.file // 获取上传文件
		},
		// 处理图片的变化
		proveChange(file, size) {
			const isType = file.raw.type.match(/^image\/(jpeg|png|jpg)$/)
			const isLtSize = file.size / 1024 / 1024 < size // 小于 size M

			// console.log('file :', file)
			if (!isType) {
				this.$message.error('上传图片只支持 JPG/PNG 格式!')
			}
			if (!isLtSize) {
				this.$message.error(`上传图片大小不能超过 ${size}MB!`)
			}
			if (isType && isLtSize) {
				switch (size) {
					case 2:
						this.userInfo.avatar = URL.createObjectURL(file.raw)
						this.avatarFile = true // 有图片上传
						sessionStorage.setItem('avatar', file.raw)
						break
					case 10:
						this.userInfo.bgImg = URL.createObjectURL(file.raw)
						this.bgImgFile = true // 有图片上传
						sessionStorage.setItem('bg', file.raw)
						break
				}
			} else {
				this.$refs.uploadAvatar.clearFiles()
				this.$refs.uploadBg.clearFiles()
			}
		},
		handleAvatarChange(file) {
			this.proveChange(file, 2)
		},
		handleBgrChange(file) {
			this.proveChange(file, 10)
		},
		onSubmit() {
			let paramA = new FormData()
			if (this.avatarFile) {
				this.$refs.uploadAvatar.submit()
				paramA.append('img', this.avatarFile)
				paramA.append('form', 'userInfo')
				paramA.append('name', 'avatar')
				paramA.append('id', '1')
			} else {
				// this.avatarFile = sessionStorage.getItem('avatar')
				paramA.append('img', null)
			}

			const uploadAvatar = () =>
				this.$axios({
					method: 'post',
					url: '/admin/uploadImg',
					headers: { 'Content-Type': 'multipart/form-data' },
					data: paramA
				})

			let paramB = new FormData()
			if (this.bgImgFile) {
				this.$refs.uploadBg.submit()
				paramB.append('img', this.bgImgFile)
				paramB.append('form', 'userInfo')
				paramB.append('name', 'bgImg')
				paramB.append('id', '1')
			} else {
				// this.bgImgFile = sessionStorage.getItem('bg')
				paramB.append('img', null)
			}

			const uploadBgImg = () =>
				this.$axios({
					method: 'post',
					url: '/admin/uploadImg',
					headers: { 'Content-Type': 'multipart/form-data' },
					data: paramB
				})

			const uploadUserInfo = () =>
				this.$axios.post(
					'/admin/setUserInfo',
					this.$qs.stringify({
						name: this.userInfo.name,
						slogan: this.userInfo.slogan,
						inform: this.userInfo.inform,
						avatar: this.userInfo.avatar,
						bgImg: this.userInfo.bgImg
					})
				)

			this.$axios
				.all([uploadAvatar(), uploadBgImg()])
				.then(
					this.$axios.spread((avatar, bg) => {
						if (this.avatarFile) {
							this.userInfo.avatar = avatar.data.imgUrl
						}
						if (this.bgImgFile) {
							this.userInfo.bgImg = bg.data.imgUrl
						}
						console.log('avatar :', avatar.data)
						console.log('bg :', bg.data)
						uploadUserInfo()
							.then(userInfo => {
								console.log('userInfo :', userInfo)
								this.$message.success('提交成功')
								this.$mounted()
							})
							.catch(error => {
								console.log('error :', error)
							})
					})
				)
				.catch(error => {
					console.log('error :', error)
				})
		},
		goBack() {
			this.$confirm(
				'检测到未提交的内容，是否在离开页面前提交修改？',
				'确认信息',
				{
					distinguishCancelAndClose: true,
					confirmButtonText: '提交',
					cancelButtonText: '放弃修改'
				}
			)
				.then(() => {
					this.onSubmit()
				})
				.catch(action => {
					this.$message({
						type: 'info',
						message:
							action === 'cancel'
								? '放弃提交并离开页面'
								: '停留在当前页面'
					})
					this.$router.push('/admin/home')
				})
		}
	}
}
</script>

<style lang='less' scoped>
.adminUserInfo {
	.content {
		background: #fff;
		margin-top: 10px;
		padding: 30px;
		border-radius: 5px;
		border: 1px solid #dddddd;
		.el-form {
			.el-input {
				max-width: 700px;
			}
			.el-textarea {
				max-width: 700px;
			}
			.avatar-uploader {
				display: inline-block;
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				width: 178px;
				height: 178px;
				&:hover {
					border-color: #409eff;
				}
				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 178px;
					line-height: 178px;
					text-align: center;
				}
				.avatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.bgImg-uploader {
				display: inline-block;
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				width: 356px;
				height: 178px;
				&:hover {
					border-color: #409eff;
				}
				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 356px;
					line-height: 178px;
					text-align: center;
				}
				.avatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
}
</style>