<template>
  <div class="app-container">
    <el-tag style="margin-bottom: 10px">餐桌：{{ table_name }}</el-tag>
    <el-table :data="tableData" border style="width: 100%" @selection-change="selected">
      <el-table-column type="selection" width="50" />
      <el-table-column label="商品名称" >
        <template slot-scope="scope">
          <div style="float: left;">
            <img :src="scope.row.goods.img" style="height: 50px;width: 50px">
          </div>
          <div style="float: left;padding-left: 10px;padding-top: 15px;">
            <span>{{ scope.row.goods.descript }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单价" width="100" prop="price" />
      <el-table-column label="数量" width="200">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.number" @change="handleInput(scope.row)">
              <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus" /></el-button>
              <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus" /></el-button>
            </el-input>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="小计" prop="goodTotal" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除<i class="el-icon-delete2 el-icon--right" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-button type="info" style="float: right">{{ "商品总额：" + moneyTotal }}</el-button>
    <el-button type="primary" style="float: left" @click="order">下单</el-button>
  </div>
</template>

<script>
import { makeOrder } from '@/api/order'
const defaultForm = {
  imgs: '',
  password: ''
}

export default {
  name: 'CartList',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: this.$store.getters.cart.add,
      moneyTotal: 0,
      multipleSelection: [],
      table_name: '',
      table_id:''
    }
  },
  created() {
    this.table_name=this.$store.getters.cart.table_name
    this.table_id=this.$store.getters.cart.table_id
    this.tableData = this.$store.getters.cart.add
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数组中指定的元素
        //删除商品
        this.$store.dispatch('cart/deleteToShop',row)
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleInput: function(value) {
      if (value.number === null || value.number === '') {
        value.number = 1
      }
      // 保留两位小数
      value.goodTotal = (value.number * value.price).toFixed(2)
      // 增加商品数量也需要重新计算商品总价
      this.selected(this.multipleSelection)
    },
    add: function(addGood) {
      // 输入框输入值变化时会变为字符串格式返回到js
      // 此处要用v-model，实现双向数据绑定
      if (typeof addGood.number === 'string') {
        addGood.number = parseInt(addGood.number)
      }
      addGood.number += 1
      this.$store.dispatch('cart/updateGood', addGood)
    },
    del: function(delGood) {
      if (typeof delGood.number === 'string') {
        delGood.number = parseInt(delGood.number)
      }
      if (delGood.number > 1) {
        delGood.number -= 1
      }
      this.$store.dispatch('cart/updateGood', delGood)
    },
    // 返回的参数为选中行对应的对象
    selected: function(selection) {
      this.multipleSelection = selection
      this.moneyTotal = 0
      // 此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        // 判断返回的值是否是字符串
        if (typeof selection[i].goodTotal === 'string') {
          selection[i].goodTotal = parseInt(selection[i].goodTotal)
        }
        this.moneyTotal += selection[i].goodTotal
      }
    },
    // 下订单
    order: function() {
      var selection=this.multipleSelection
      if (selection.length > 0) {
        this.$confirm('确定下单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let order={}
          order.table_id = this.table_id
          let foods=[]
          for (var i = 0; i < selection.length; i++) {
            let one={}
            one.dish_id=selection[i].id
            one.num=selection[i].number
            foods[i]=one
          }
          order.foods=foods
          //清空购物车
          this.tableData=[]
          this.$store.dispatch('cart/clearToCart')
          makeOrder(order).then(() => {
            this.$message({
              type: 'success',
              message: '下单成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }else{
        this.$message({
          type: 'warning',
          message: '请选择需要的菜品'
        })
      }
    }
  }
}
</script>

