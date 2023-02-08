<template>
  <div>
    <q-layout view="hHh LpR fFf">
      <q-drawer show-if-above v-model="left" side="left" elevated>
        <nav>
          <canvas id="canvas" width="400" height="400" style="background-color:#333"></canvas>
          <div id="date">
            <h6>{{ date }}</h6>
          </div>
          <div id="clock">
            <h6>{{ clock }}</h6>
          </div>
          <!--    &lt;!&ndash;        <router-link to="/auth">Auth</router-link> |&ndash;&gt;-->
          <!--    &lt;!&ndash;        <router-link to="/login">Login</router-link>&ndash;&gt;-->
        </nav>
        <!--    &lt;!&ndash; drawer content &ndash;&gt;-->
      </q-drawer>
      <!--&lt;!&ndash;    <q-page-container>&ndash;&gt;-->
      <!--&lt;!&ndash;      <router-view />&ndash;&gt;-->
      <!--&lt;!&ndash;    </q-page-container>&ndash;&gt;-->

    </q-layout>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      clock: "",
      date: ""
    }
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    // this.drawClock();
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  },
  created() {
    setInterval(this.digitalClock, 1000);
    setInterval(this.todayDate, 1000);
    setInterval(this.drawTime, 1000);
    setInterval(this.drawNumbers, 1000);
    setInterval(this.drawTime, 1000);
  },
  methods: {
    // drawClock: function () {
    //   this.drawFace(ctx, radius);
    //   this.drawNumbers(ctx, radius);
    //   this.drawTime(ctx, radius);
    // },
    drawFace: function (ctx, radius) {
      let grad;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();

      grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();
    },
    drawNumbers: function (ctx, radius) {
      let ang;
      let num;
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    },
    drawTime: function (ctx, radius) {
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      //hour
      hour = hour%12;
      hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
      this.drawHand(ctx, hour, radius*0.5, radius*0.07);
      //minute
      minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
      this.drawHand(ctx, minute, radius*0.8, radius*0.07);
      // second
      second = (second*Math.PI/30);
      this.drawHand(ctx, second, radius*0.9, radius*0.02);
    },
    drawHand: function (ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    },
    todayDate: function () {
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
      this.date = "Today " + day + '.' + month + '.' + year;
    },
    digitalClock: function () {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      //* добавление ведущих нулей */
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      this.clock = hours + ":" + minutes + ":" + seconds;
    }
  }
}
</script>

<style scoped>

</style>