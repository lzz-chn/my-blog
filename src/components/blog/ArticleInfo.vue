<template>
	<div class="article-info">
		<div v-for="v in articleList" :key="v.id">
			<div class="article-left" v-if="v.id % 2 ==0">
				<router-link :to="{ name: 'Article', query: v}">
					<img :src="v.titleImg" class="user" />
					<div class="title" :v-if="v.id % 2 == 0">
						<h2>
							<span v-if="v.top == 'true' ? true : false">[推荐]</span>
							{{v.name}}
						</h2>
						<div class="time">
							<i class="el-icon-time"></i>
							<span>{{new Date(v.createtime).toLocaleDateString() }}</span>
						</div>
					</div>
				</router-link>
				<p class="left-content">{{v.content | ellipsis}}</p>
				<div class="more">
					<span class="border-line"></span>
					<router-link :to="{ name: 'Article', query: v}">
						<i class="el-icon-more"></i>
					</router-link>
				</div>
				<div class="article-hover">
					<p>
						<i class="el-icon-view"></i>
						<span>{{v.hot}}热度</span>
					</p>
				</div>
			</div>
			<div class="article-right" v-else>
				<router-link :to="{ name: 'Article', query: v}">
					<img :src="v.titleImg" class="user" />
				</router-link>
				<div class="article-content">
					{{v.content | ellipsis}}
					<div>
						<div class="time">
							<i class="el-icon-time"></i>
							<span>{{new Date(v.createtime).toLocaleDateString() }}</span>
						</div>
					</div>
				</div>
				<div class="more">
					<span class="border-line"></span>
				</div>
				<div class="article-hover">
					<p>
						<i class="el-icon-view"></i>
						<span>{{v.hot}}热度</span>
					</p>
					<p class="top" v-if="v.top == 'true' ? true : false">
						<i class="el-icon-thumb"></i>
						<span>推荐</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ArticleInfo',
	props: ['articleList'],
	filters: {
		ellipsis(value) {
			let text = value.replace(/(<p(\w|\W)*?>|<\/p>)/g, ''),
				maxLength =
					document.documentElement.offsetWidth > 992 ? 150 : 120
			if (!text) {
				return ''
			}
			if (text.length > maxLength) {
				return text.slice(0, maxLength) + '...'
			}
			return text
		}
	},
	data() {
		return {
			textMaxLength: 0
		}
	},
	created() {}
}
</script>

<style lang='less' scoped>
.article-info {
	.article-left {
		margin-bottom: 31px;
		position: relative;
		.user {
			float: left;
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-right: 35px;
			margin-top: 7px;
			padding: 2px;
			border: 1px solid #dadada;
		}
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 50px;
			h2 {
				font-size: 20px;
				color: #504e4e;
				span {
					color: #ff6d6d;
				}
				&:hover {
					color: #a0dad0;
				}
			}
			.time {
				font-size: 12px;
				color: #989898;
			}
		}
		.left-content {
			color: #232323;
			line-height: 30px;
			font-size: 15px;
		}
		.more {
			margin-top: 10px;
			height: 30px;
			.border-line {
				display: inline-block;
				width: 234px;
				height: 1px;
				background-color: #efefef;
				position: relative;
				left: 50%;
				top: 15px;
				transform: translateX(-50%);
			}
			.el-icon-more {
				font-size: 24px;
				float: right;
				color: #a0dad0;
			}
			&::after {
				content: '';
				display: block;
				clear: both;
			}
		}
		&::after {
			content: '';
			display: block;
			clear: both;
		}
		.article-hover {
			position: absolute;
			top: 20%;
			opacity: 0;
			left: 0;
			border-top: 1px solid #dddddd;
			padding-top: 5px;
			p {
				color: #b3b3b3;
				font-size: 13px;
				line-height: 27px;
				i {
					margin-right: 7px;
					font-size: 16px;
				}
			}
		}
		&:hover .article-hover {
			opacity: 1;
			left: -100px;
			transition: all 0.7s;
		}
	}
	.article-right {
		margin-left: 16px;
		margin-bottom: 31px;
		position: relative;
		.article-content {
			background-color: #fbfbfb;
			padding: 15px 30px;
			margin-right: 110px;
			color: #232323;
			line-height: 30px;
			font-size: 15px;
			div {
				.time {
					float: right;
					font-size: 12px;
					line-height: 30px;
					color: #989898;
				}
				&::after {
					content: '';
					display: block;
					clear: both;
				}
			}
		}
		.user {
			float: right;
			width: 64px;
			height: 64px;
			border-radius: 50%;
			margin-left: 35px;
			margin-top: 27px;
			padding: 2px;
			border: 1px solid #dadada;
		}
		.more {
			margin-top: 10px;
			height: 30px;
			.border-line {
				display: inline-block;
				width: 234px;
				height: 1px;
				background-color: #efefef;
				position: relative;
				left: 50%;
				top: 15px;
				transform: translateX(-50%);
			}
		}
		.article-hover {
			position: absolute;
			top: 20%;
			opacity: 0;
			left: 0;
			border-top: 1px solid #dddddd;
			padding-top: 5px;
			p {
				color: #b3b3b3;
				font-size: 13px;
				line-height: 27px;
				i {
					margin-right: 7px;
					font-size: 16px;
				}
			}
			.top {
				color: #ff6d6d;
			}
		}
		&:hover .article-hover {
			opacity: 1;
			left: -100px;
			transition: all 0.7s;
		}
	}
	.load-more {
		cursor: pointer;
		display: inline-block;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		padding: 13px 35px;
		margin: 78px 0;
		border: 1px solid #d6d6d6;
		border-radius: 50px;
		color: #adadad;
		font-size: 16px;

		&:hover {
			transition: all 0.3s;
			border: 1px solid #a0dad0;
			color: #a0dad0;
		}
	}
}
@media screen and (max-width: 992px) {
	.article-info {
		.article-left {
			margin-bottom: 20px;
			.user {
				margin-right: 7px;
				margin-top: 7px;
			}
			.title {
				line-height: 30px;
			}
			.left-content {
				line-height: 20px;
				font-size: 14px;
			}
			.more {
				margin: 0;
				height: 20px;
				.border-line {
					top: 4px;
				}
				.el-icon-more {
					font-size: 20px;
				}
			}
			&:hover .article-hover {
				opacity: 0;
			}
		}
		.article-right {
			margin-left: 10px;
			margin-bottom: 20px;
			.article-content {
				padding: 15px;
				margin-right: 70px;
				font-size: 14px;
			}
			.user {
				margin-left: 0;
			}
			.more {
				margin: 0;
				height: 10px;
				.border-line {
					top: 0;
				}
			}
			&:hover .article-hover {
				opacity: 0;
			}
		}
	}
}
</style>