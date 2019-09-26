<template>
  <div>
    <svg-icon :icon-class="icon" />
    <span slot="title">{{title}}</span>
    <el-badge
      v-if="badge > 0 && this.$store.getters.sidebar.cartNum>0"
      class="mark"
      :value="this.$store.getters.sidebar.cartNum"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MenuItem",
  //functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    badge: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    })
  }
};
</script>
