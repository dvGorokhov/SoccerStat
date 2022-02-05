import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";

import "@/assets/scss/app.scss";
import "./assets/tailwind.css";
import "./assets/antd-variables.less";

import {
  Layout,
  Button,
  Spin,
  Avatar,
  DatePicker,
  Card,
  Col,
  Row,
  Input,
  Tabs,
} from "ant-design-vue";

const app = createApp(App);
app.config.productionTip = false;

app.use(Layout);
app.use(Button);
app.use(Avatar);
app.use(Spin);
app.use(DatePicker);
app.use(Card);
app.use(Col);
app.use(Row);
app.use(Input);
app.use(Tabs);

app.use(router);
app.mount("#app");
