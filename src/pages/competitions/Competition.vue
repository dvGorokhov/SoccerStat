<template>
  <div
    class="flex flex-col md:flex-row justify-between xl:justify-around items-center"
  >
    <div class="w-52 h-52 p-4 bg-white rounded-full flex justify-center">
      <div
        :style="{
          'background-image': `url(${competition.imgUrl})`,
        }"
        class="bg-center bg-contain bg-no-repeat w-3/5 h-full"
      />
    </div>

    <div class="my-4 text-center xl:text-justify">
      <div class="text-xl font-bold">
        {{ competition.name }}
      </div>
      <div class="font-bold mt-2">
        <span> Даты проведения: </span>
        <span class="block xl:inline-block xl:mt-4">
          {{ season.startDate }} — {{ season.endDate }}
        </span>
      </div>
    </div>
  </div>

  <div class="mt-8 md:mt12 xl:mt-20">
    <a-tabs :active-key="activeTab" @change="onChange">
      <a-tab-pane v-for="item in routes" :key="item.key" :tab="item.title" />
    </a-tabs>
  </div>

  <router-view />
</template>

<script>
import { Competition } from "@/models";
import { CompetitionsService } from "@/services";

export default {
  data() {
    return {
      competition: {},
      season: {},
      activeTab: "matches",
      routes: [
        {
          key: "teams",
          title: "Команды",
        },
        {
          key: "matches",
          title: "Матчи",
        },
      ],
    };
  },

  async mounted() {
    const result = await CompetitionsService.fetchById(this.id);
    this.season = result.data.currentSeason;
    this.competition = Competition.FromApi(result.data);
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  watch: {
    "$route.path": {
      deep: true,
      immediate: true,
      handler(v) {
        this.activeTab = v.split("/").pop();
      },
    },
  },

  methods: {
    onChange(name) {
      this.activeTab = name;
      this.$router.push(`/competitions/${this.id}/${name}`);
    },
  },
};
</script>
