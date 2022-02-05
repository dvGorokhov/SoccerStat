<template>
  <div v-if="loading" class="text-center">
    <a-spin size="large" />
  </div>

  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 md:mt-8 xl:mt-8"
  >
    <div class="p-2" v-for="team in teams" :key="team.id">
      <div class="inline-flex items-center cursor-pointer" @click="goTo(team)">
        <a-avatar :src="team.crestUrl" :size="30" />
        <span class="ml-4">{{ team.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { CompetitionsService } from "@/services";
export default {
  data() {
    return {
      teams: [],
      competition: {},
      season: {},
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const result = await CompetitionsService.fetchTeams(this.id);
    this.teams = result.data.teams;
    this.loading = false;
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    goTo(team) {
      this.$router.push(`/teams/${team.id}/matches`);
    },
  },
};
</script>
