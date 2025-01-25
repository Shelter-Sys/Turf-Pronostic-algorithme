<template>
  <fieldset role="group">
    <input
      type="text"
      placeholder="Tache a faire">
    <button>ajouter</button>
  </fieldset>
  <div v-if="todos.length === 0">ma bite la </div>
</template>

<script>
  import { ref } from 'vue';

  const todos = ref([])
</script>