<template>
	<div class="adminArticleItem">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-s-order"></i>
				内容管理
			</el-breadcrumb-item>
			<el-breadcrumb-item>
				<router-link to="/admin/articleList">文章列表</router-link>
			</el-breadcrumb-item>
			<el-breadcrumb-item>文章详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<el-form ref="form" :model="article" label-width="80px" size="small">
				<el-form-item label="名称">
					<el-input v-model="article.name"></el-input>
				</el-form-item>
				<el-form-item label="名称背景">
					<el-upload
						class="bgImg-uploader"
						ref="uploadBg"
						v-model="article.titleImg"
						action="string"
						:show-file-list="false"
						:auto-upload="false"
						:http-request="bgRequest"
						:on-change="handleBgrChange"
					>
						<img v-if="article.titleImg" :src="article.titleImg" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="article.classify" placeholder="请选择文章分类">
						<el-option label="手机平板" value="手机平板"></el-option>
						<el-option label="硬件装机" value="硬件装机"></el-option>
						<el-option label="智能穿戴" value="智能穿戴"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="推荐">
					<el-switch v-model="article.top"></el-switch>
				</el-form-item>
				<el-form-item label="聚焦">
					<el-switch v-model="article.focus"></el-switch>
					<el-radio-group v-model="article.focusP" v-show="article.focus">
						<el-radio-button label="左"></el-radio-button>
						<el-radio-button label="中"></el-radio-button>
						<el-radio-button label="右"></el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="热度">
					<el-input v-model.number="article.hot"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<quillEditor class="quillEditor" ref="myEditor" v-model="article.content" :options="editorOption"></quillEditor>
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
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
	name: 'AdminArticleItem',
	data() {
		return {
			article: {
				name: '',
				classify: '',
				content: '',
				titleImg: '',
				hot: 0,
				top: false,
				focus: false,
				focusP: '左'
			},
			editorOption: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'], // toggled buttons
						['blockquote', 'code-block'],
						[{ header: 1 }, { header: 2 }], // custom button values
						[{ list: 'ordered' }, { list: 'bullet' }],
						[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
						[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
						[{ direction: 'rtl' }], // text direction
						[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
						[{ header: [1, 2, 3, 4, 5, 6, false] }],
						[{ color: [] }, { background: [] }], // dropdown with defaults from theme
						[{ font: [] }],
						[{ align: [] }],
						['clean'] // remove formatting button
					]
				},
				placeholder: '写点什么...'
			},
			titleImgFile: false
		}
	},
	mounted() {
		if (this.$route.query.row) {
			for (let i in this.article) {
				this.article[i] = this.$route.query.row[i]
			}
			// 将 string 转化为 boolean
			this.article.top = this.article.top == 'true' ? true : false
			this.article.focus = this.article.focus == 'true' ? true : false
		}
		console.log('this.article :', this.article)
	},
	components: { quillEditor },
	methods: {
		bgRequest(item) {
			this.titleImgFile = item.file // 获取上传文件
		},
		// 处理图片的变化
		proveChange(file, size) {
			const isType = file.raw.type.match(/^image\/(jpeg|png|jpg)$/)
			const isLtSize = file.size / 1024 / 1024 < size // 小于 size M

			if (!isType) {
				this.$message.error('上传图片只支持 JPG/PNG 格式!')
			}
			if (!isLtSize) {
				this.$message.error(`上传图片大小不能超过 ${size}MB!`)
			}
			if (isType && isLtSize) {
				this.article.titleImg = URL.createObjectURL(file.raw)
				this.titleImgFile = true // 有图片上传
				sessionStorage.setItem('articleBg', file.raw)
			} else {
				this.$refs.uploadBg.clearFiles()
			}
		},
		handleBgrChange(file) {
			this.proveChange(file, 10)
		},
		onSubmit() {
			// console.log(
			// 	'article id:',
			// 	this.$route.query.row ? this.$route.query.row.id : 'new'
			// )
			// console.log('this.titleImgFile :', this.titleImgFile)
			if (this.titleImgFile) {
				this.$refs.uploadBg.submit()
				let param = new FormData()
				param.append('img', this.titleImgFile)
				param.append('form', 'article')
				param.append('name', 'titleImg')
				param.append(
					'id',
					this.$route.query.row ? this.$route.query.row.id : 'new'
				)
				this.$axios({
					method: 'post',
					url: '/admin/uploadImg',
					headers: { 'Content-Type': 'multipart/form-data' },
					data: param
				}).then(titleImg => {
					this.article.titleImg = titleImg.data.imgUrl
					this.$axios
						.post('/admin/setArticleItem', {
							id: titleImg.data.id,
							name: this.article.name,
							classify: this.article.classify,
							content: this.article.content,
							titleImg: this.article.titleImg,
							hot: this.article.hot,
							top: this.article.top,
							focus: this.article.focus,
							focusP: this.article.focusP
						})
						.then(res => {
							this.$message.success('提交成功')
							this.$router.push('/admin/articleList')
						})
				})
			} else {
				this.$axios
					.post('/admin/setArticleItem', {
						id: this.$route.query.row.id,
						name: this.article.name,
						classify: this.article.classify,
						content: this.article.content,
						titleImg: this.article.titleImg,
						hot: this.article.hot,
						top: this.article.top,
						focus: this.article.focus,
						focusP: this.article.focusP
					})
					.then(res => {
						this.$message.success('提交成功')
						this.$router.push('/admin/articleList')
					})
			}
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
					this.$router.push('/admin/articleList')
				})
		}
	}
}
</script>

<style lang='less' scoped>
.adminArticleItem {
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