import { createApp } from "vue";
import AppComp from "./simple.vue";
import UIPredicateVue from "../modules/ui-predicate-vue3/src/index";

const app = createApp(AppComp);

console.log("UIPredicateVue", UIPredicateVue);
app.use(UIPredicateVue);

// expose for debug purposes
window.UIPredicateVue = UIPredicateVue;

app.mount("#app");
