<template>
  <h1 class="my-8">Календарь игр {{ teamName }}</h1>

  <div v-if="!matches.length && !loading">
    К сожалению, для выбранной команды нет календаря игр
    <a-button type="link" class="underline" @click="goBack">Назад</a-button>
  </div>

  <search-input
    v-if="matches.length"
    class="w-full"
    v-model="search"
    :loading="loading"
    @clear="search = ''"
  />

  <div class="mt-4" v-if="!searchedMatches.length && matches.length">
    Команды с таким именем нет, очистите поиск...
  </div>

  <div v-if="loading" class="text-center mt-8">
    <a-spin size="large" />
  </div>

  <div
    v-else
    class="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8"
  >
    <a-card v-for="match in searchedMatches" :key="match.id">
      <template v-slot:title>
        {{ match.matchDay }}
      </template>
      <div class="mb-4 underline">
        {{ !match.matchOpen ? "Матч завершен" : "Ожидаем игру" }}
      </div>
      <div class="flex flex-col justify-center">
        <div class="flex justify-between">
          <div
            class="truncate w-min cursor-pointer"
            @click="goTo(match.homeTeam)"
          >
            {{ match.homeTeamName }}
          </div>
          <div v-if="!match.matchOpen">{{ match.score.homeTeam }}</div>
        </div>

        <div class="flex justify-between">
          <div
            class="truncate w-min cursor-pointer"
            @click="goTo(match.awayTeam)"
          >
            {{ match.awayTeamName }}
          </div>
          <div v-if="!match.matchOpen">{{ match.score.awayTeam }}</div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { TeamsService } from "@/services";
import { Match } from "@/models";
import SearchInput from "../../components/SearchInput.vue";
export default {
  components: { SearchInput },
  data() {
    return {
      matches: [],
      search: "",
      loading: false,
      teamName: "",
      searchedMatches: [],
      searchTimeout: null,
    };
  },

  async mounted() {
    this.fetchMatches();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  watch: {
    id(v) {
      if (v) {
        this.fetchMatches();
      }
    },

    search: {
      immediate: true,
      handler(v) {
        this.loading = true;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          if (v && v !== "") {
            this.searchedMatches = this.matches.filter((item) => {
              let isSearched = false;
              if (!isSearched)
                isSearched =
                  item.homeTeam.name.toLowerCase().search(v.toLowerCase()) !==
                  -1;
              if (!isSearched)
                isSearched =
                  item.awayTeam.name.toLowerCase().search(v.toLowerCase()) !==
                  -1;
              return isSearched;
            });
          } else {
            this.searchedMatches = this.matches;
          }
          this.loading = false;
        }, 500);
      },
    },
  },

  methods: {
    async fetchMatches() {
      this.loading = true;
      const result = await TeamsService.fetchMatches(this.id);
      const currentTeam = await TeamsService.fetchById(this.id);
      this.matches = result.data.matches.map((item) => Match.FromApi(item));
      this.teamName = currentTeam.data.name;
      this.loading = false;
    },

    goTo(team) {
      this.search = "";
      this.$router.push(`/teams/${team.id}/matches`);
    },

    goBack() {
      this.$router.back();
    },
  },
};
</script>
