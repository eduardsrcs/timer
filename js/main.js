
const app = Vue.createApp(timer)
  .component('uparrows', uarrows)
  .component('downarrows', darrows)
  .component('timesection', timesection)
  .component('timerswitch', timerSwitch)
  .mount('#timer')
