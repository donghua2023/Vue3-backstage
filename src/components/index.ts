import PageSearch from "./page-search/page-search.vue";
import PageContent from "./page-content/page-content.vue";

export default {
  install(app:any) {
    app.component('PageSearch', PageSearch).component('PageContent', PageContent)
  }
}
