<template>
  <form @submit.prevent="onSubmit" class="form">
    <label class="form-label">
      Iterations
      <input type="number" min="0" value="1000" name="iterations" required class="form-input" />
    </label>
    <button type="submit" class="form-button">Run</button>
  </form>
</template>

<script setup lang="ts">
defineProps<{ onSubmit: (e: Event) => void }>();
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 0.5rem;
  margin-top: 0.25rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.form-button:hover {
  background-color: #36996d;
}
</style>
