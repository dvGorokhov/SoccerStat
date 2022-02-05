import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Competitions",
    component: () => import("@/pages/HomePage.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
  {
    path: "/competitions/:id",
    name: "Competition",
    component: () => import("@/pages/competitions/Competition.vue"),
    meta: {
      layout: "DefaultLayout",
    },
    params: true,
    children: [
      {
        path: "teams",
        name: "CompetitionTeams",
        component: () => import("@/pages/competitions/CompetitionTeams.vue"),
        params: true,
      },
      {
        path: "matches",
        name: "CompetitionMatches",
        component: () => import("@/pages/competitions/CompetitionMatches.vue"),
        params: true,
      },
    ],
  },
  {
    path: "/teams/:id/matches",
    name: "TeamMatches",
    component: () => import("@/pages/teams/TeamMatches.vue"),
    meta: {
      layout: "DefaultLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes,
});

export default router;
