<template>
  <div class="mt-8">
    <div class="text-center md:text-right">
      <div class="mb-4">Фильтровать по дате</div>
      <a-range-picker :defaultValue="rangeDates" @change="onChange" />
    </div>

    <a-row class="matches__description mt-8">
      <a-col :span="6">дата</a-col>
      <a-col :span="12">Команды</a-col>
      <a-col :span="6">счет</a-col>
    </a-row>

    <div v-if="loading" class="text-center mt-8">
      <a-spin size="large" />
    </div>

    <a-row
      v-else
      class="matches__item mt-4"
      v-for="match in matches"
      :key="match.id"
    >
      <a-col class="matches__open text-xs xl:text-base" :span="6">{{
        match.matchDay
      }}</a-col>
      <a-col :span="12" class="text-xs xl:text-base">
        <div class="truncate">{{ match.homeTeamName }}</div>
        <div class="truncate">{{ match.awayTeamName }}</div>
      </a-col>
      <a-col
        class="matches__open text-xs xl:text-base"
        :span="6"
        v-if="match.matchOpen"
        >Ожидается</a-col
      >
      <a-col :span="6" v-else class="text-xs xl:text-base">
        <div>{{ match.score.homeTeam }}</div>
        <div>{{ match.score.awayTeam }}</div>
      </a-col>
    </a-row>

    <div v-if="!matches.length && !loading" class="mt-4 text-center">
      В данный период матчей нет
    </div>
  </div>
</template>

<script>
import { CompetitionsService } from "@/services";
import { Match } from "@/models";
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      matches: [],
      rangeDates: [],
      dateFrom: null,
      dateTo: null,
    };
  },

  mounted() {
    this.fetchMatches();
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  watch: {
    rangeDates: {
      immediate: true,
      handler(v) {
        if (v.length) {
          this.fetchMatches();
        }
      },
    },

    "$route.query": {
      deep: true,
      immediate: true,
      handler(v) {
        if (v.dateTo && v.dateFrom) {
          this.dateFrom = v.dateFrom;
          this.dateTo = v.dateTo;
          this.rangeDates = [moment(this.dateFrom), moment(this.dateTo)];
        }
      },
    },
  },

  methods: {
    moment,

    async fetchMatches(params) {
      if (!params) params = {};
      if (!params.dateFrom) params.dateFrom = this.dateFrom || null;
      if (!params.dateTo) params.dateTo = this.dateTo || null;

      this.$router.replace({
        name: "CompetitionMatches",
        params: { id: this.id },
        query: { dateFrom: params.dateFrom, dateTo: params.dateTo },
      });

      this.loading = true;
      const result = await CompetitionsService.fetchMatches(this.id, params);
      this.matches = result.data.matches.map((item) => Match.FromApi(item));
      this.loading = false;
    },

    onChange(v) {
      this.dateFrom = moment(v[0]).format("yyyy-MM-DD");
      this.dateTo = moment(v[1]).format("yyyy-MM-DD");
      this.rangeDates = [moment(this.dateFrom), moment(this.dateTo)];
    },
  },
};
</script>
