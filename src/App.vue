<template>
  <component :is="Layout" v-if="Layout">
    <router-view />
  </component>
  <router-view v-else />
</template>

<script>
import DefaultLayout from "@/layouts/index.vue";
export default {
  components: {
    DefaultLayout,
  },
  computed: {
    Layout() {
      return this.$route.meta.layout;
    },
  },
};
</script>
