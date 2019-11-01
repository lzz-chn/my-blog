<template>
	<div class="classify">
		<div class="results">
			搜索结果: “<router-view />{{name|| $route.query.type}}” 下的文章
		</div>
		<p class="wu" v-if="!articleList.length">无</p>
		<ArticleInfo :articleList="articleList" />
	</div>
</template>

<script>
import ArticleInfo from '@/components/blog/ArticleInfo'
export default {
	name: 'Classify',
	data() {
		return { articleList: [], name: null }
	},
	components: { ArticleInfo },
	created() {
		// console.log('classify :', this.$route.query.type)
		// console.log('name :', this.$route.query.name)
		this.name = this.$route.query.name
			? this.$route.query.name.replace(/'/g, '')
			: null

		this.$axios
			.get('/admin/getClassify', {
				classify: this.$route.query.type,
				name: this.name
			})
			.then(res => {
				this.articleList = res.data
			})
	}
}
</script>

<style lang='less' scoped>
.classify {
	width: 800px;
	margin: 80px auto 0;
	padding: 0 10px;
	.results {
		font-size: 20px;
		font-weight: 300;
		text-align: center;
		border: 1px dashed #ddd;
		padding: 10px 15px;
		color: #828282;
		margin-bottom: 30px;
		div {
			font-size: inherit;
			font-weight: inherit;
			display: inline-block;
		}
	}
	.wu {
		text-align: center;
		color: #828282;
		margin-bottom: 30px;
	}
}
@media screen and (max-width: 992px) {
	.classify {
		width: 95%;
		margin: 20px auto 0;
		.results {
			font-size: 16px;
		}
		.wu {
			text-align: center;
			color: #828282;
			margin-bottom: 30px;
		}
	}
}
</style>