<template>
  <cart-list :is-edit="false" />
</template>

<script>
import CartList from './components/CartList'

export default {
  name: 'CreateForm',
  components: { CartList }
}
</script>

