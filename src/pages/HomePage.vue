<template>
  <h1 class="mt-8 mb-16 text-center">Лиги</h1>
  <div
    class="px-8 md:px-20 lg:px-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
  >
    <div
      @click="goTo(league)"
      v-for="league in competitions"
      :key="league.id"
      class="p-4 h-40 bg-white w-40 flex flex-col items-center justify-end rounded-full cursor-pointer"
    >
      <div
        :style="{
          'background-image': `url(${league.imgUrl})`,
        }"
        class="bg-center bg-contain bg-no-repeat w-full h-full"
      />
      <span class="p-1 text-black text-center text-xs w-4/5">{{
        league.name
      }}</span>
    </div>
  </div>
</template>

<script>
import { CompetitionsService } from "@/services";
import { Competition } from "@/models";

export default {
  data() {
    return {
      competitions: [],
    };
  },

  async mounted() {
    const result = await CompetitionsService.fetchAll();
    this.competitions = result.data.competitions.map((item) =>
      Competition.FromApi(item)
    );
  },

  methods: {
    goTo(v) {
      this.$router.push(`/competitions/${v.id}/teams`);
    },
  },
};
</script>
