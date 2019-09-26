<template>
  <el-button type="primary" @click="addGoods">添加</el-button>
</template>

<script>
import Detail from "./components/detail";

export default {
  name: "CreateForm",
  components: { Detail },
  methods: {
    addGoods() {
      console.log(this.$store.state)
      var num = this.$store.getters.sidebar.cartNum;
      num++;
      this.$store.state.app.sidebar.cartNum=num;
      
    }
  }
};
</script>

