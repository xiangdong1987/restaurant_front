<template>
  <admin-detail :is-edit="true" />
</template>

<script>
import AdminDetail from './components/AdminDetail'

export default {
  name: 'EditForm',
  components: { AdminDetail }
}
</script>

