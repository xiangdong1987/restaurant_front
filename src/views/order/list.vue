<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="餐桌">
        <template slot-scope="scope">
          <span>{{ scope.row.table_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="菜数">
        <template slot-scope="scope">
          <span>{{ scope.row.dish_num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="消费金额">
        <template slot-scope="scope">
          <span>${{ scope.row.total_amount }}</span>
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
          <router-link :to="'/order/detail/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">详情</el-button>
          </router-link>
          <el-button type="primary" size="small" icon="el-icon-printer" @click="printOrder(scope.row.id)">打印</el-button>
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
import { fetchList, getAllSubOrder } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getLodop } from '@/assets/LodopFuncs.js'
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getDetail(id) {

    },
    printOrder(id) {
      // 获取订单详情
      this.listLoading = true
      var list = []
      getAllSubOrder(id).then(response => {
        list = response.data.list
        var dateTime = response.data.orderTime
        var total_amount = response.data.total
        console.log(list)
        var listStr = ''
        list.forEach(function(item, index) {
          listStr += '<div class="detail font8 clearfloat">\n' +
            '            <span class="left">' + item.dish_name + '*' + item.num + '</span>\n' +
            '            <span class="right">' + item.sub_total + '元</span>\n' +
            '      </div>\n'
        })
        this.printTmp(dateTime, listStr, total_amount)
      })
    },
    printTmp(dateTime, content, total_amount) {
      const LOOP = getLodop()
      if (LODOP) {
        var ShopName = '餐馆'
        var strFormHtml = '<!DOCTYPE html> <html> <head> <meta charset="utf-8" />\n' +
          '        <style type="text/css">\n' +
          '            body {\n' +
          '                margin: 0;\n' +
          '                padding: 0;\n' +
          '                width: 100%; \n' +
          '            }\n' +
          '            .clearfloat {\n' +
          '                overflow: hidden;\n' +
          '            }\n' +
          '            .left{\n' +
          '                float:left;\n' +
          '            }\n' +
          '            .right{\n' +
          '                float:right;\n' +
          '            }\n' +
          '            .font10 {\n' +
          '                font-size: 14px;\n' +
          '            }\n' +
          '            .fontW {\n' +
          '                font-weight:bold;\n' +
          '            }\n' +
          '            .font8 {\n' +
          '                font-size: 12px;\n' +
          '            }\n' +
          '\n' +
          '            .margin2{\n' +
          '                margin: 2px 0;\n' +
          '            }\n' +
          '            .margin5{\n' +
          '                margin: 5px 0 !important;\n' +
          '            }\n' +
          '\n' +
          '            .printer{\n' +
          '                width: 174px;\n' +
          '            }\n' +
          '            .title {\n' +
          '                text-align: center;\n' +
          '                width:90%;\n' +
          '                margin:auto;\n' +
          '                padding: 5px 0;\n' +
          '            }\n' +
          '            .divide {\n' +
          '                text-align:center;\n' +
          '                margin:auto;\n' +
          '            }\n' +
          '            .detail {\n' +
          '                margin: 2px 0;\n' +
          '            }\n' +
          '            .detail>.left {\n' +
          '                margin-left: 10px;\n' +
          '            }    \n' +
          '            .quan>.left {\n' +
          '                margin-left: 10px;\n' +
          '            }    \n' +
          '            .bottom{\n' +
          '                width:100%;\n' +
          '                height:200px;\n' +
          '                background:pink;\n' +
          '                clear:both;/* 位于上方写了float的div，下面这个div必须加这一句 */\n' +
          '            }\n' +
          '\n' +
          '        </style>\n' +
          '    </head>\n' +
          '    <body>\n' +
          '        <div class="printer">\n' +
          '            <div class="title font10 fontW">\n' +
          '                <div>' + ShopName + '</div>\n' +
          '                <div style="margin-top:2px;">订单详情</div>\n' +
          '            </div>\n' +
          '            <div class="divide">===================</div>\n' +
          '            <div class="haha clearfloat font8">\n' +
          '                <span class="left">订单日期:</span>\n' +
          '                <span class="right">' + dateTime + '</span>\n' +
          '            </div>\n' +
          '            <div class="content">\n' +
          '                <div class="divide">-----------------------------</div>\n' +
          content +
          '                <div class="head font8 clearfloat fontW">\n' +
          '                    <span class="left">总金额:</span>\n' +
          '                        <span class="right">' + total_amount + '元</span>\n' +
          '                </div>\n' +
          '                <div class="divide margin5">>>>>>>>>>>>>>>>>>></div>\n' +
          '            </div>\n' +
          '        <div>\n' +
          '    </body>\n' +
          '</html>' // 获取打印内容
        LODOP.PRINT_INIT('') // 初始化
        LODOP.SET_PRINT_PAGESIZE(3, '58mm', 20, '')
        LODOP.ADD_PRINT_HTM('', '', '100%', '100%', strFormHtml) // 设置打印内容
        LODOP.PREVIEW()
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
