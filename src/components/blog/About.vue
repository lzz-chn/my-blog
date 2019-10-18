<template>
	<div class="about">
		<div class="title-img-wrapper">
			<div
				:class="scale"
				@mouseover="scale = 'title-img title-img-hover'"
				@mouseout="scale = 'title-img'"
			></div>
			<p>关于</p>
		</div>
		<div class="content">
			<div class="title">
				<h1>关于</h1>
				<hr />
			</div>
			<div class="text">
				<mavon-editor
					:value="website.about"
					:defaultOpen="preview"
					:subfield="false"
					:boxShadow="false"
					:toolbarsFlag="false"
					:editable="false"
					style="min-height: auto"
				></mavon-editor>
			</div>
		</div>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
	name: 'About',
	props: ['website'],
	components: { mavonEditor },
	data() {
		return {
			scale: 'title-img',
			markdownOption: {
				// bold: true, // 粗体
				// toolbarsFlag: false,
				// subfield: false,
				// defaultOpen: 'preview'
			},
			preview: 'preview'
		}
	},
	created() {
		// console.log('website :', this.website)
	}
}
</script>

<style lang='less' scoped>
.about {
	.title-img-wrapper {
		overflow: hidden;
		height: 500px;
		position: relative;
		.title-img {
			height: 100%;
			background: url(../../assets/centerBg.jpg) center/cover no-repeat;
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
			margin-bottom: 40px;
		}
	}
}
</style>