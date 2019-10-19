<template>
	<div class="home">
		<div class="message">
			<i class="el-icon-s-comment"></i>
			{{this.userInfo.inform||': Lorem ipsum dolor sit amet consectetur adipisicing elit.'}}
		</div>
		<div class="focus">
			<div class="title">聚焦</div>
			<div class="features">
				<router-link v-for="v in focusData" :key="v.id" :to="{ name: 'Article', query: v}">
					<div class="feature-hover">
						<h4>{{v.name}}</h4>
					</div>
					<img :src="v.titleImg" />
				</router-link>
				<!-- <router-link to="/">
					<div class="feature-hover">
						<h4>feature1</h4>
					</div>
					<img src="@/assets/feature1.jpg" />
				</router-link>
				<router-link to="/">
					<div class="feature-hover">
						<h4>feature2</h4>
					</div>
					<img src="@/assets/feature2.jpg" />
				</router-link>
				<router-link to="/">
					<div class="feature-hover">
						<h4>feature3</h4>
					</div>
					<img src="@/assets/feature3.jpg" />
				</router-link>-->
			</div>
		</div>
		<div class="recent">
			<div class="title">近况</div>
			<ArticleInfo :articleList="articleList" />
		</div>
	</div>
</template>

<script>
import ArticleInfo from '@/components/blog/ArticleInfo'
export default {
	name: 'Home',
	props: ['userInfo', 'articleList'],
	components: { ArticleInfo },
	data() {
		return { focusData: [] }
	},
	created() {
		let tmp = []

		for (let i of this.articleList) {
			if (i.focus == 'true') {
				tmp.push(i)
			}
		}
		this.focusData[0] = tmp.find((v, i) => v.focusP == '左')
		this.focusData[1] = tmp.find((v, i) => v.focusP == '中')
		this.focusData[2] = tmp.find((v, i) => v.focusP == '右')
	}
}
</script>

<style lang='less' scoped>
.title() {
	padding: 0 0 15px;
	margin: 11px 0;
	color: #757575;
	border-bottom: 1px dashed #ececec;
}
.home {
	width: 800px;
	margin: 0 auto;
	padding: 0 10px;
	// background-color: rgb(228, 211, 214);

	.message {
		background-color: #fbfbfb;
		padding: 20px;
		margin: 60px 0;
		.el-icon-s-comment {
			font-size: 20px;
			color: #a0dad0;
			position: relative;
			top: 2px;
		}
	}
	.focus {
		.title {
			.title();
		}

		.features {
			display: flex;
			justify-content: space-between;
			a {
				position: relative;
				.feature-hover {
					opacity: 0;
					display: flex;
					background-color: #bbe2db;
					position: absolute;
					width: 100%;
					height: 160px;
					h4 {
						margin: auto;
						color: #fff;
					}
				}
				&:hover .feature-hover {
					opacity: 1;
					transition: all 0.5s;
				}
				img {
					height: 160px;
				}
			}
		}
	}
	.recent {
		padding: 80px 0 0;
		.title {
			.title();
		}
	}
}
</style>