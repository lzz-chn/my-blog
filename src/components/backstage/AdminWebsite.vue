<template>
	<div class="adminWebsite">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-s-tools"></i>
				网站设置
			</el-breadcrumb-item>
			<el-breadcrumb-item>关于页面</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<el-form ref="form" :model="website" label-width="100px" size="small">
				<!-- <el-form-item label="网站名称">
					<el-input v-model="website.name"></el-input>
				</el-form-item>
				<el-form-item label="网站图标">
					<el-upload
						class="bgImg-uploader"
						ref="uploadBg"
						v-model="website.icon"
						action="string"
						:show-file-list="false"
						:auto-upload="false"
						:http-request="bgRequest"
						:on-change="handleBgrChange"
					>
						<img v-if="website.icon" :src="website.icon" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>-->
				<el-form-item label="关于页面内容">
					<mavon-editor
						style="min-height: 600px"
						ref="md"
						:toolbars="markdownOption"
						v-model="website.about"
						@change="mavon"
					></mavon-editor>
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
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
	name: 'AdminWebsite',
	data() {
		return {
			website: {
				name: '',
				icon: '',
				about: ''
			},
			titleImgFile: false,
			markdownOption: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				imagelink: false, // 图片链接
				code: true, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true // 预览
			}
		}
	},
	components: { mavonEditor },
	mounted() {
		this.$axios
			.get('/admin/getWebsite')
			.then(res => {
				for (let i in res.data) {
					this.website[i] = res.data[i]
				}
			})
			.catch(error => {
				console.log('error :', error)
				this.$message.error('服务器链接异常')
			})
	},
	methods: {
		// bgRequest(item) {
		// 	this.titleImgFile = item.file // 获取上传文件
		// },
		// // 处理图片的变化
		// proveChange(file, size) {
		// 	const isType = file.raw.type.match(/^image\/(x-icon)$/)
		// 	const isLtSize = file.size / 1024 / 1024 < size // 小于 size M

		//     console.log('file :', file);
		// 	if (!isType) {
		// 		this.$message.error('上传图片只支持 ICO 格式!')
		// 	}
		// 	if (!isLtSize) {
		// 		this.$message.error(`上传图片大小不能超过 ${size}MB!`)
		// 	}
		// 	if (isType && isLtSize) {
		// 		this.website.icon = URL.createObjectURL(file.raw)
		// 		this.titleImgFile = true // 有图片上传
		// 		sessionStorage.setItem('articleBg', file.raw)
		// 	} else {
		// 		this.$refs.uploadBg.clearFiles()
		// 	}
		// },
		// handleBgrChange(file) {
		// 	this.proveChange(file, 2)
		// },
		mavon(value, render) {
			this.website.about = render
		},
		onSubmit() {
			// console.log('this.titleImgFile :', this.titleImgFile)
			// if (this.titleImgFile) {
			// 	this.$refs.uploadBg.submit()
			// 	let param = new FormData()
			// 	param.append('img', this.titleImgFile)
			// 	param.append('form', 'website')
			// 	param.append('name', 'icon')
			// 	param.append('id', '1')
			// 	this.$axios({
			// 		method: 'post',
			// 		url: '/admin/uploadImg',
			// 		headers: { 'Content-Type': 'multipart/form-data' },
			// 		data: param
			// 	})
			// 		.then(titleImg => {
			// 			this.website.icon = titleImg.data.imgUrl
			// 			this.$axios
			// 				.post(
			// 					'/admin/setWebsite',
			// 					this.$qs.stringify({
			// 						name: this.website.name,
			// 						icon: this.website.icon,
			// 						about: this.website.about
			// 					})
			// 				)
			// 				.then(res => {
			// 					this.$message.success('提交成功')
			// 				})
			// 		})
			// 		.catch(error => {
			// 			console.log('error :', error)
			// 			this.$message.error('服务器链接异常')
			// 		})
			// } else {
			// 	this.$axios
			// 		.post(
			// 			'/admin/setWebsite',
			// 			this.$qs.stringify({
			// 				name: this.website.name,
			// 				icon: this.website.icon,
			// 				about: this.website.about
			// 			})
			// 		)
			// 		.then(res => {
			// 			this.$message.success('提交成功')
			// 		})
			// 		.catch(error => {
			// 			console.log('error :', error)
			// 			this.$message.error('服务器链接异常')
			// 		})
			// }
			this.$axios
				.post(
					'/admin/setWebsite',
					this.$qs.stringify({
						about: this.website.about
					})
				)
				.then(res => {
					this.$message.success('提交成功')
				})
				.catch(error => {
					console.log('error :', error)
					this.$message.error('服务器链接异常')
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
.adminWebsite {
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
			.bgImg-uploader {
				display: inline-block;
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				width: 78px;
				height: 78px;
				&:hover {
					border-color: #409eff;
				}
				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 78px;
					line-height: 78px;
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