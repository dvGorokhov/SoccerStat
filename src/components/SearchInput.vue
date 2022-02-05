<template>
  <div class="flex">
    <a-input-search
      class="w-full"
      :value="modelValue"
      :loading="loading"
      placeholder="Поиск команды..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <a-button class="ml-2 md:ml-4" @click="$emit('clear')">x</a-button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: "",
    };
  },
};
</script>
