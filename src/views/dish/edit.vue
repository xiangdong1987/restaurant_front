<template>
  <detail :is-edit="true" />
</template>

<script>
import Detail from './components/detail'

export default {
  name: 'EditForm',
  components: { Detail }
}
</script>