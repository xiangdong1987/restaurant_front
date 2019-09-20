<template>
  <tables-detail :is-edit="true" />
</template>

<script>
import TablesDetail from './components/TablesDetail'

export default {
  name: 'EditForm',
  components: { TablesDetail }
}
</script>