const timer = {
  data(){
    return{
      tSwitch: false,
      hours: 0,
      minutes: 0
    }
  },
  template: `
    <video id="timervideo" width="320" height="240" volume=".1">
      <source src="movie.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div id="controls">
      <uparrows @updateTime="updateTime"></uparrows>
      <timesection :hrs="hours" :mns="minutes"></timesection>
      <downarrows @updateTime="updateTime"></downarrows>
      <timerswitch @switchTimer="switchTimer" :swtext="tSwitch"></timerswitch>
    </div>`,
  methods: {
    updateTime(time, hours){
      if(hours){
        this.hours = parseInt(this.hours) + time
      } else {
        this.minutes = parseInt(this.minutes) + time
      }
      if(this.minutes > 59){
        this.hours++
        this.minutes -= 60
      }
      if(this.minutes < 0){
        this.hours--
        this.minutes += 60
      }
      if(this.hours > 23){
        this.hours -= 24
      }
      if(this.hours < 0){
        this.hours += 24
      }
      localStorage.setItem('timerHours', this.hours)
      localStorage.setItem('timerMinutes', this.minutes)
    },
    switchTimer(){
      this.tSwitch = !this.tSwitch
      if(!this.tSwitch){
        const timerVideo = document.getElementById('timervideo')
        timerVideo.pause()
      }
    }
  },
  mounted(){
    setInterval(()=>{
      const timerVideo = document.getElementById('timervideo')
      let t = new Date()
      if(this.tSwitch && this.hours == t.getHours() && this.minutes == t.getMinutes()){
        if(timerVideo.paused){
          timerVideo.currentTime = 0
          timerVideo.play()
        }
      } else {
        timerVideo.pause()
      }
    }, 10000)
    this.$data.hours = parseInt(localStorage.getItem('timerHours')) || 12
    this.$data.minutes = parseInt(localStorage.getItem('timerMinutes')) || 0
  }
}

const uarrows = {
  template: `
    <div class="timebuttons">
      <div class="timebutton" @click="$emit('updateTime', 10, true)">+</div>
      <div class="timebutton" @click="$emit('updateTime', 1, true)">+</div>
      <div class="timebutton" @click="$emit('updateTime', 10, false)">+</div>
      <div class="timebutton" @click="$emit('updateTime', 1, false)">+</div>
    </div>
  `
}

const darrows = {
  template: `
    <div class="timebuttons">
      <div class="timebutton" @click="$emit('updateTime', -10, true)">-</div>
      <div class="timebutton" @click="$emit('updateTime', -1, true)">-</div>
      <div class="timebutton" @click="$emit('updateTime', -10, false)">-</div>
      <div class="timebutton" @click="$emit('updateTime', -1, false)">-</div>
    </div>
  `
}

const timesection = {
  template: `
    <div id="time">
      <div>{{parseInt(hrs/10)}}</div>
      <div>{{hrs%10}}</div>
      <div>:</div>
      <div>{{parseInt(mns/10)}}</div>
      <div>{{mns%10}}</div>
    </div>
  `,
  props: ['hrs', 'mns']
}

const timerSwitch = {
  props: ['swtext'],
  template: `<div id="timerswitch" @click="$emit('switchTimer')">{{swtext ? 'On' : 'Off'}}</div>`,
}
