<template>
	<div class="article">
		<div class="title-img-wrapper">
			<div
				:class="scale"
				@mouseover="scale = 'title-img title-img-hover'"
				@mouseout="scale = 'title-img'"
				:style="bgImg"
			></div>
			<!-- <p>Akina for Typecho 主题模板context</p> -->
			<p>{{article.name}}</p>
		</div>
		<div class="content">
			<div class="title">
				<!-- <h1>Akina for Typecho 主题模板context</h1> -->
				<h1>{{article.name}}</h1>
				<hr />
			</div>
			<!-- <div class="text">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore repellat velit, expedita ipsam nam totam facere quibusdam. Repellendus veritatis aut, repudiandae, ab blanditiis ipsa laborum reprehenderit eveniet iusto unde architecto.
			</div>-->
			<div class="text" v-html="article.content"></div>
			<div class="footer">
				<div
					class="share"
					@mouseover="socialShare ='social-icon social-icon-hover'"
					@mouseout="socialShare ='social-icon'"
				>
					<ul :class="socialShare">
						<li>
							<a
								:href="`http://qr.liantu.com/api.php?text=${shareUrl}`"
								@click="share"
								target="_blank"
								class="wechat"
								rel="nofollow noopener noreferrer"
							>
								<svg class="icon">
									<use xlink:href="#icon-wechat" />
								</svg>
							</a>
						</li>
						<li>
							<a
								:href="`http://service.weibo.com/share/share.php?url=${shareUrl}/&amp;title=${article.name}`"
								@click="share"
								class="weibo"
								target="_blank"
								rel="nofollow noopener noreferrer"
							>
								<svg class="icon">
									<use xlink:href="#icon-weibo" />
								</svg>
							</a>
						</li>
						<li>
							<a
								:href="`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareUrl}/&amp;title=${article.name}`"
								@click="share"
								class="qzone"
								target="_blank"
								rel="nofollow noopener noreferrer"
							>
								<svg class="icon">
									<use xlink:href="#icon-qzone" />
								</svg>
							</a>
						</li>
						<li>
							<a
								:href="`http://shuo.douban.com/!service/share?${shareUrl}/&amp;title=${article.name}`"
								@click="share"
								class="douban"
								target="_blank"
								rel="nofollow noopener noreferrer"
							>
								<svg class="icon">
									<use xlink:href="#icon-douban" />
								</svg>
							</a>
						</li>
					</ul>
					<i class="el-icon-share"></i>
				</div>
				<div class="zan">
					<i class="el-icon-star-on"></i>
					{{article.hot}}
				</div>
			</div>
			<div class="footer-nav">
				<div class="prev">
					<router-link :to="{ name: 'Article', query: articleList[0]}">
						<div class="mask">
							<h2>PREVIOUS&nbsp;&nbsp;POST</h2>
							<p>{{articleList[0] ? articleList[0].name : '无'}}</p>
						</div>
					</router-link>
				</div>
				<div class="next">
					<router-link :to="{ name: 'Article', query: articleList[1]}">
						<div class="mask">
							<h2>NEXT&nbsp;&nbsp;POST</h2>
							<p>{{articleList[1] ? articleList[1].name : '无'}}</p>
						</div>
					</router-link>
				</div>
			</div>
			<div class="author">
				<img src="@/assets/akinadeaava.jpg" />
				<h3>{{userInfo.name}}</h3>
				<p class="info">
					<i class="el-icon-edit"></i>
					{{userInfo.slogan}}
				</p>
			</div>
			<!-- <div class="comment">
				<div>
					<i class="el-icon-chat-dot-round"></i>
					查看评论
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
export default {
	name: 'Article',
	props: ['userInfo'],
	data() {
		return {
			scale: 'title-img',
			socialShare: 'social-icon',
			// title: 'Akina for Typecho 主题模板context',
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
			articleList: [],
			bgImg: null,
			shareUrl: null
		}
	},
	created() {
		let temp
		// console.log('article:', this.$route)
		// console.log('location.href :', location.href)
		this.shareUrl = location.href
		for (let i in this.article) {
			this.article[i] = this.$route.query[i]
		}

		this.bgImg =
			'background-image: url(' + this.article.titleImg ||
			'../../assets/articleBg.jpg' + ')'

		this.$axios.get('/admin/getArticleList').then(res => {
			for (let i in res.data) {
				if (res.data[i].id == this.$route.query.id) {
					temp = Number(i)
					break
				}
			}
			this.articleList.push(res.data[temp - 1])
			this.articleList.push(res.data[temp + 1])
			// console.log('list:', this.articleList)
		})
		// console.log('this.bgImg :', this.bgImg)
	},
	methods: {
		share(e) {
			// window.open(
			// 	`${e.target.parentElement.href}${e.target.baseURI}/&amp;title=${this.title}`,
			// 	'',
			// 	'width=500,height=600'
			// )
			// window.open(
			// 	e.target.parentElement.href,
			// 	'_blank',
			// 	'width=500,height=600'
			// )
			// console.log('e.target :', e.target)
		}
	}
}
</script>

<style lang='less' scoped>
.article {
	.title-img-wrapper {
		overflow: hidden;
		height: 500px;
		position: relative;
		.title-img {
			height: 100%;
			background: url(../../assets/articleBg.jpg) center/cover no-repeat;
			transition: all 0.5s;
		}
		.title-img-hover {
			transform: scale(1.1);
		}
		p {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 28px;
			color: #fff;
			font-weight: 300;
		}
	}
	.content {
		width: 800px;
		margin: 0 auto;
		padding: 0 10px;
		// background: pink;
		.title {
			padding: 80px 0 20px;
			h1 {
				font-size: 22px;
				margin: 15px 0;
				color: #404040;
			}
			hr {
				width: 100%;
				height: 1px;
				border: 0;
				background: #efefef;
				margin: 15px 0;
			}
		}
		.text {
			line-height: 40px;
			font-size: 18px;
		}
		.footer {
			color: #404040;
			margin-top: 30px;
			padding: 20px 10px;
			height: 65px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 16px;
			.share {
				display: flex;
				align-items: center;
				.social-icon {
					display: flex;
					align-items: center;
					opacity: 0;
					transition: all 0.5s;
					li {
						height: 20px;
						.icon {
							height: 20px;
							width: 20px;
							margin: 0 7px;

							&:hover {
								opacity: 0.6;
							}
						}
					}
				}
				.social-icon-hover {
					opacity: 1;
				}
				.el-icon-share {
					cursor: pointer;
				}
				&:hover {
					color: #9fe0dd;
				}
			}
			.zan {
				margin-left: 10px;
				cursor: pointer;
				&:hover {
					color: #9fe0dd;
				}
			}
		}
		.footer-nav {
			margin: 55px 0;
			height: 150px;
			font-size: 0;
			> div {
				display: inline-block;
				width: 50%;
				height: 100%;
				color: #fff;

				.mask {
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.6);
					transition: all 0.3s;
					padding: 40px;
					cursor: pointer;

					&:hover {
						background-color: rgba(0, 0, 0, 0.2);
					}
					h2 {
						font-size: 14px;
						font-weight: 300;
						color: rgba(255, 255, 255, 0.7);
						margin-bottom: 5px;
					}
					p {
						font-size: 16px;
					}
				}
			}
			.prev {
				background: url(../../assets/prev.jpg) center/cover no-repeat;
			}
			.next {
				background: url(../../assets/next.jpg) center/cover no-repeat;
				.mask {
					text-align: end;
				}
			}
		}
		.author {
			text-align: center;
			padding: 50px 12.78%;
			img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				padding: 3px;
				border: 1px solid #ddd;
			}
			h3 {
				font-size: 16px;
				color: #ababab;
			}
			p {
				font-size: 13px;
				line-height: 30px;
				margin: 20px 0 25px;
				color: #7d8588;
				display: inline-block;
				padding: 10px 20px;
				border-top: 1px solid #efefef;
				border-bottom: 1px solid #efefef;

				.el-icon-edit {
					font-size: 16px;
					color: #65c186;
				}
			}
		}
		.comment {
			padding: 0 0 6.39%;
			margin-top: 40px;
			div {
				padding: 17px 32px 15px;
				background: #ffffff;
				color: #6f6f6f;
				width: 160px;
				margin: 0 auto;
				border: 1px solid #c7c7c7;
			}
		}
	}
}
</style>
