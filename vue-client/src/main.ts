import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPenToSquare, faTrash, faRightFromBracket, faCirclePlus, faLeftLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import { key, store } from './store';

library.add(faPenToSquare, faTrash, faRightFromBracket, faCirclePlus, faLeftLong);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(store, key)
  .mount('#app');
