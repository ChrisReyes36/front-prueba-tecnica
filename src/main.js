/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dialog from 'primevue/dialog'
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import Menu from 'primevue/menu'
import MultiSelect from 'primevue/multiselect'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import ProgressSpinner from 'primevue/progressspinner'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'

import '@/assets/styles.scss'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  ripple: true,
  locale: {
    startsWith: 'Comience con',
    contains: 'Contenga',
    notContains: 'No contenga',
    endsWith: 'Termine con',
    equals: 'Igual a',
    notEquals: 'Diferente a',
    noFilter: 'Sin filtro',
    lt: 'Menor que',
    lte: 'Menor o igual a',
    gt: 'Mayor que',
    gte: 'Mayor o igual a',
    dateIs: 'Fecha igual a',
    dateIsNot: 'Fecha diferente a',
    dateBefore: 'Fecha antes de',
    dateAfter: 'Fecha después de',
    custom: 'Personalizar',
    clear: 'Limpiar',
    apply: 'Aplicar',
    matchAll: 'Coincida todo',
    matchAny: 'Coincida cualquiera',
    addRule: 'Agregar regla',
    removeRule: 'Eliminar regla',
    accept: 'Sí',
    reject: 'No',
    choose: 'Escoger',
    upload: 'Subir',
    cancel: 'Cancelar',
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    today: 'Hoy',
    weekHeader: 'Sem',
    firstDayOfWeek: 1,
    dateFormat: 'dd/mm/yy',
    weak: 'Débil',
    medium: 'Medio',
    strong: 'Fuerte',
    passwordPrompt: 'Escriba una contraseña',
    emptyFilterMessage: 'Sin opciones disponibles',
    emptyMessage: 'No se han encontrado resultados',
    aria: {
      trueLabel: 'Verdadero',
      falseLabel: 'Falso',
      nullLabel: 'No seleccionado',
      pageLabel: 'Página',
      firstPageLabel: 'Primera Página',
      lastPageLabel: 'Última Página',
      nextPageLabel: 'Página Siguiente',
      previousPageLabel: 'Página Anterior',
      selectLabel: 'Seleccione',
      unselectLabel: 'Deseleccionar',
      expandLabel: 'Expandir',
      collapseLabel: 'Contraer'
    }
  }
})

app.use(ConfirmationService)
app.use(DialogService)
app.use(ToastService)

app.directive('badge', BadgeDirective)

app.component('Badge', Badge)
app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('DataTable', DataTable)
app.component('DataView', DataView)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('Menu', Menu)
app.component('MultiSelect', MultiSelect)
app.component('PanelMenu', PanelMenu)
app.component('Password', Password)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)

app.mount('#app')
