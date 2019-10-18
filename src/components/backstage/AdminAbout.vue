<template>
	<div class="adminAbout">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-info"></i>
				关于
			</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			此后台管理系统界面基于 Vue.js 使用 Vue-Cli3 脚手架，UI部分使用 Element UI组件库。
			<br />后端功能基于 Node.js 使用 Express 框架，数据管理使用 MySQL 管理系统。
			<br />GitHub：
			<br />&nbsp;&nbsp;&nbsp;&nbsp;博客及后台界面：
			<a
				href="https://github.com/lzz-chn/my-blog"
				target="_blank"
			>https://github.com/lzz-chn/my-blog</a>
			<br />&nbsp;&nbsp;&nbsp;&nbsp;后台功能：
			<a
				href="https://github.com/lzz-chn/my-blog-backstage"
				target="_blank"
			>https://github.com/lzz-chn/my-blog-backstage</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminAbout',
	data() {
		return {}
	}
}
</script>

<style lang='less' scoped>
.adminAbout {
	.content {
		background: #fff;
		margin-top: 10px;
		padding: 30px;
		border-radius: 5px;
		border: 1px solid #dddddd;
		line-height: 35px;
		a {
			text-decoration: underline;
			&:hover {
				color: #028090;
			}
		}
	}
}
</style>