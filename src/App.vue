<template>
	<div id="app">
		<router-view :userInfo="userInfo" />
		<router-view name="Home" :userInfo="userInfo" :articleList="articleList" />
		<router-view name="Article" :userInfo="userInfo" />
		<router-view name="Classify" />
		<router-view name="About" :website="website" />
		<router-view name="Footer" />
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			userInfo: {
				name: '',
				slogan: '',
				inform: '',
				avatar: '',
				bgImg: ''
			},
			articleList: [],
			website: {
				name: '',
				icon: '',
				about: ''
			}
		}
	},
	created() {
		this.updateData()
	},
	watch: {
		$route: 'updateData'
	},
	methods: {
		updateData() {
			let _self = this;
			this.$axios
				.get('/admin/getUserInfo')
				.then(res => {
					for (let i in res.data) {
						this.userInfo[i] = res.data[i]
					}
				})

			this.$axios
				.get('/admin/getArticleList')
				.then(res => {
					_self.articleList = res.data
					console.log('articleList :', _self.articleList);
					// for (let i in res.data) {
					// 	_self.articleList[i] = res.data[i]
					// }
				})

			this.$axios
				.get('/admin/getWebsite')
				.then(res => {
					for (let i in res.data) {
						this.website[i] = res.data[i]
					}
				})
		}
	}
}
</script>

<style lang="less">
html,
body {
	height: 100%;
}
* {
	margin: 0;
	padding: 0;
	list-style: none;
	box-sizing: border-box;
	font-weight: 400;
}
a {
	color: inherit;
	font-size: inherit;
	text-decoration: none;
}
#app {
	height: 100%;
	overflow: auto;
	/*滚动条整体样式*/
	&::-webkit-scrollbar {
		width: 5px;
	}
	/*滚动条滑块*/
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #35b995;
	}
	/*滚动条轨道*/
	&::-webkit-scrollbar-track {
		background: #fff;
	}
}
</style>
