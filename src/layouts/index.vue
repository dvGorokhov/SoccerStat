<template>
  <a-layout class="default-layout">
    <a-layout-header class="flex items-center justify-between">
      <img src="@/assets/ball.png" width="40" alt="" />
      <a-button type="link" @click="$router.push('/')">Лиги</a-button>
    </a-layout-header>
    <a-layout-content :style="{ overflow: 'auto', height: '100vh' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {};
</script>

<style lang="scss">
.default-layout {
  .ant-layout-header {
    background: #393e59;
    color: #fff;
  }
  .ant-layout-content {
    background: linear-gradient(180deg, #393e59 0%, #23273d 100%);

    @media screen and (max-width: 500px) {
      padding: 10px 10px;
    }
    @media screen and (max-width: 768px) {
      padding: 10px 12px;
    }

    padding: 10px 50px;
  }
}
</style>
