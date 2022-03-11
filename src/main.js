import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// icons libraries
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAddressCard, faBell, faCheck, faCog, faDollarSign, faFileAlt, faFileInvoice, faFolderPlus, faHardHat, faHome, faMapMarkerAlt, faPencilAlt, faPlus, faPlusCircle, faPrint, faSave, faSignOutAlt, faTrashAlt, faTruckLoading, faTruckMoving, faUndoAlt, faUserPlus, faUsers, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// icons
library.add(faUserSecret)
library.add(faAddressCard)
library.add(faUsers)
library.add(faTruckMoving)
library.add(faTruckLoading)
library.add(faMapMarkerAlt)
library.add(faFileInvoice)
library.add(faSignOutAlt)
library.add(faTrashAlt)
library.add(faPencilAlt)
library.add(faPlus)
library.add(faUndoAlt)
library.add(faSave)
library.add(faHardHat)
library.add(faDollarSign)
library.add(faHome)
library.add(faCheck)
library.add(faCog)
library.add(faUsers)
library.add(faFileAlt)
library.add(faPrint)
library.add(faFolderPlus)
library.add(faPlusCircle)
library.add(faUserPlus)
library.add(faBell)

createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
