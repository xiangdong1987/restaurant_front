<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="菜品">
        <template slot-scope="scope">
          <span>{{ scope.row.dish_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="餐桌">
        <template slot-scope="scope">
          <span>{{ scope.row.table_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-check" circle @click="makingDone(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchKitchenOrder } from '@/api/order'
import { makingDone } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      table_name: ''
    }
  },
  created() {
    this.getList(0)
  },
  methods: {
    makingDone(id){
      this.$confirm('确定出餐？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        makingDone(id).then(() => {
          this.freshTable()
          this.$message({
            type: 'success',
            message: '出餐成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '出餐已取消'
        })
      })
    },
    getList(status) {
      this.listLoading = true
      fetchKitchenOrder(status, this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        this.table_name = response.data.table_name
      })
    },
    freshTable(){
      this.getList(0)
    },
    goBack() {
      console.log('go back')
    }
  }
}
</script>
