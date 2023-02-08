<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title>
          <img src="../assets/pencil.png" alt="logo"/>
        </q-toolbar-title>

        <nav class="nav-mobile">
          <q-btn-dropdown label="Menu" flat>
            <div class="row no-wrap q-pa-md">
              <div class="column" >
                <router-link to="/">Home</router-link>
                <router-link to="/auth">Auth</router-link>
                <router-link to="/notes">Notes</router-link>
                <router-link to="/about">About the site</router-link>
                <p class="sound">Sound: </p>
                <RockerSwitch size="medium" @change="changeSwitch"/>
              </div>
            </div>
          </q-btn-dropdown>
        </nav>

        <nav class="nav-desktop">
          <router-link to="/">Home</router-link>
          <router-link to="/auth">Auth</router-link>
          <router-link to="/notes">Notes</router-link>
          <router-link to="/about">About the site</router-link>

          <q-btn-dropdown label="Settings" flat>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6">Sound</div>
                <RockerSwitch size="medium" @change="changeSwitch"/>
              </div>
            </div>
          </q-btn-dropdown>
        </nav>
      </q-toolbar>

      <q-drawer v-model="left" side="left" elevated>
        <q-btn class="menu-hidden" dense flat round icon="menu" @click="left = !left"/>
        <br/>
        <p id="status">Your status: {{ status }}</p>
        <q-separator spaced="30px"></q-separator>
        <p>{{ date }}</p>
        <canvas id="canvas" width="300" height="300"/>
        <p>{{ clock }}</p>
      </q-drawer>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import RockerSwitch from "vue-rocker-switch";
import "vue-rocker-switch/dist/vue-rocker-switch.css";

export default {
  name: "Header",
  components: {
    RockerSwitch,
  },
  data() {
    return {
      left: false,
      date: "",
      clock: "",
      status: "Online",
      // statusAudio: status,
      audio: new Audio('./assets/music.mp3')
    };
  },
  mounted() {
    this.changeColor();
  },
  created() {
    setInterval(this.digitalClock, 1000);
    setInterval(this.todayDate, 1000);
    setInterval(this.drawClock, 1000);
    window.addEventListener("online", () => ((this.status = "Online") && (document.getElementById("status").style.color = "green")));
    window.addEventListener("offline", () => ((this.status = "Offline") && (document.getElementById("status").style.color = "red")));
  },
  methods: {
    changeSwitch(status) {
      if (status === true) {
        this.audio.play();
      } else if (status === false) {
        this.audio.pause();
      }
    },
    changeColor: function () {
      if (this.status === "Online") document.getElementById("status").style.color = "green";
      if (this.status === "Offline") document.getElementById("status").style.color = "red";
    },
    todayDate: function () {
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth() + 1;
      let year = today.getFullYear();
      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;
      this.date = "Today " + day + "." + month + "." + year;
    },
    digitalClock: function () {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      this.clock = "Time: " + hours + ":" + minutes + ":" + seconds;
    },
    drawClock: function () {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 30;

      //Circle of the clock
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = "#ffffff";
      context.fill();

      const gradience = context.createRadialGradient(centerX, centerY, radius - 30, centerX, centerY, radius);
      gradience.addColorStop(0, "#ffffff");
      gradience.addColorStop(1, "#000000");
      context.strokeStyle = gradience;
      context.lineWidth = radius * 0.08;
      context.stroke();
      context.closePath();

      context.restore();

      //A small circle in the middle
      context.beginPath();
      context.arc(centerX, centerY, 10, 0, 2 * Math.PI);
      context.stroke();
      context.fillStyle = "#000000";
      context.fill();
      context.closePath();

      context.restore();
      context.strokeStyle = "#000000";
      context.translate(centerX, centerY);

      //Numbers for the clock
      let ang, num;
      context.font = radius * 0.15 + "px arial";
      context.textBaseline = "middle";
      context.textAlign = "center";
      for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        context.rotate(ang);
        context.translate(0, -radius * 0.85);
        context.rotate(-ang);
        context.fillText(num.toString(), 0, 0);
        context.rotate(ang);
        context.translate(0, radius * 0.85);
        context.rotate(-ang);
      }

      const now = new Date();
      const hrs = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      //Second hand
      let sangle = (Math.PI / 30) * sec;
      let sX = Math.sin(sangle) * (radius - 30);
      let sY = -Math.cos(sangle) * (radius - 30);

      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(0, 0);
      context.lineTo(sX, sY);
      context.stroke();
      context.closePath();

      //Minute hand
      context.beginPath();
      context.lineWidth = 4;
      sangle = (Math.PI / 30) * (min + sec / 60);
      sX = Math.sin(sangle) * (radius - 40);
      sY = -Math.cos(sangle) * (radius - 40);
      context.moveTo(0, 0);
      context.lineTo(sX, sY);
      context.stroke();
      context.closePath();

      //Hour hand
      context.beginPath();
      context.lineWidth = 6;
      sangle = (Math.PI / 6) * (hrs + min / 60 + sec / 3600);
      sX = Math.sin(sangle) * (radius - 70);
      sY = -Math.cos(sangle) * (radius - 70);
      context.moveTo(0, 0);
      context.lineTo(sX, sY);
      context.stroke();
      context.closePath();

      context.restore();
      context.translate(-centerX, -centerY);
    },
  },
};
</script>

<style lang="scss">

nav {
  a {
    margin: 0 10px 0 10px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: lightgray;
    }
  }
}

.nav-desktop {
  .glossy {
    font-weight: bold;
    font-size: 16px;
    color: white;
  }
}

.nav-mobile {
  visibility: hidden;
}

p {
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  margin-bottom: 0 !important;
  margin-top: 5px !important;
}

img {
  width: 35px;
  margin-top: 5px;
}

@media (max-width: 620px) {
  .menu-hidden {
    color: black !important;
    visibility: visible;
    margin-top: 10px;
    margin-left: 10px;
  }

  img {
    width: 25px;
    margin-top: 5px;
  }

  .nav-desktop {
    display: none;
  }

  .nav-mobile {
    visibility: visible;
  }

  .sound {
    font-size: 18px;
  }

  .column {
    text-align: center;

    a {
      margin: 0 10px 0 10px;
      font-weight: bold;
      font-size: 18px;
      color: black;
      text-decoration: none;

      &.router-link-exact-active {
        color: gray;
      }
    }
  }
}
</style>
