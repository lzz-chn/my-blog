<template>
	<div class="adminArticleList">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<i class="el-icon-s-order"></i>
				内容管理
			</el-breadcrumb-item>
			<el-breadcrumb-item>文章列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<el-button
				size="mini"
				type="success"
				icon="el-icon-edit-outline"
				@click="$router.push({path:'/admin/articleItem',query:{row:null}})"
			>新增</el-button>
			<el-table
				:data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
				style="width: 100%"
				stripe
				:default-sort="{prop: 'createtime', order: 'descending'}"
			>
				<el-table-column prop="createtime" label="日期" width="200" sortable></el-table-column>
				<el-table-column
					prop="classify"
					label="分类"
					width="100"
					:filters="[
                        { text: '手机平板', value: '手机平板' }, 
                        { text: '硬件装机', value: '硬件装机' }, 
                        { text: '智能穿戴', value: '智能穿戴' }
                    ]"
					:filter-method="filterTag"
					filter-placement="bottom-end"
				>
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.classify === '手机平板' ? 'primary' : scope.row.classify === '硬件装机' ? 'success' : 'warning'"
							disable-transitions
						>{{scope.row.classify}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="top" label="推荐">
					<template slot-scope="scope">
						<el-tag
							v-if="scope.row.top === 'true' ? true : false"
							type="danger"
							disable-transitions
							effect="dark"
							size="mini"
						>荐</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
				<el-table-column align="right" width="300">
					<template slot="header" slot-scope="scope">
						<el-input v-model="search" size="mini" placeholder="输入文章名称搜索" />
					</template>
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AdminArticleList',
	data() {
		return {
			tableData: [],
			search: ''
		}
	},
	created() {
		this.$axios
			.get('/admin/getArticleList')
			.then(res => {
				if (res.data.length) {
					this.tableData = res.data
				}
			})
	},
	methods: {
		handleEdit(index, row) {
			this.$router.push({
				path: '/admin/articleItem',
				query: { row }
			})
		},
		handleDelete(index, row) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$axios
						.post('/admin/deleteArticleItem', {
							id: row.id,
							img: row.titleImg
						})
						.then(res => {
							console.log('res.data :', res.data)
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							this.$axios
								.get('/admin/getArticleList')
								.then(res => {
									if (res.data.length) {
										this.tableData = res.data
									}
								})
						})
				})
				.catch(() => {
					this.$message({ type: 'info', message: '已取消删除' })
				})
		},
		filterTag(value, row) {
			return row.classify === value
		}
	}
}
</script>

<style lang='less' scoped>
.adminArticleList {
	.content {
		background: #fff;
		margin-top: 10px;
		padding: 30px;
		border-radius: 5px;
		border: 1px solid #dddddd;
	}
}
</style>