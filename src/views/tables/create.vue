<template>
  <tables-detail :is-edit="false" />
</template>

<script>
import TablesDetail from './components/TablesDetail'

export default {
  name: 'CreateForm',
  components: { TablesDetail }
}
</script>

