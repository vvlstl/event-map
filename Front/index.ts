import {createApp} from 'vue';
import {vfmPlugin} from 'vue-final-modal';
import App from "~/js/components/App.vue";
import '~/css/styles.less';

const app = createApp(App);

app.use(vfmPlugin);
app.mount('#app');