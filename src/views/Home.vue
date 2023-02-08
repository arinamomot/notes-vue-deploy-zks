<template>
  <div class="home">
    <svg ref="box" class="box">
      <image id="cloud" href="../assets/cuteCloud.png" height="100" width="100"
             class="square"
             :x="square.x"
             :y="square.y"
             :style="cursor"
             @mousedown="drag"
             @mouseup="drop"/>
      <router-link to="/notes?new">
        <image id="plus" href="../assets/plus3.png"/>
      </router-link>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      search: '',
      current: 5,
      square: {
        x: 60,
        y: 60,
      },
      dragOffsetX: null,
      dragOffsetY: null,
    }
  },
  computed: {
    cursor() {
      return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}`
    }
  },
  methods: {
    drag({offsetX, offsetY}) {
      this.dragOffsetX = offsetX - this.square.x;
      this.dragOffsetY = offsetY - this.square.y;
      this.$refs.box.addEventListener('mousemove', this.move)
    },
    drop() {
      this.dragOffsetX = this.dragOffsetY = null;
      this.$refs.box.removeEventListener('mousemove', this.move)
    },
    move({offsetX, offsetY}) {
      this.square.x = offsetX - this.dragOffsetX;
      this.square.y = offsetY - this.dragOffsetY;
    }
  }
}


</script>

<style scoped>

h3 {
  text-align: center;
}

.box {
  background-color: lightblue;
  width: 100%;
  height: 100vh;
  display: block;
  z-index: -1;
}

#plus {
  cursor: pointer;
  width: 500px;
  height: 150px;
  min-width: 100vw;
  x: 30%;
  y: 30%;
}

@media (max-width: 800px) {
  #plus{
    width: 400px;
    height: 150px;
  }
}

@media (max-width: 600px) {
  #cloud {
    height: 70px;
    width: 70px;
    y: 20px;
    x: 20px;
  }
  #plus{
    height: 80px;
    width: 250px;
    x: 15%;
    y: 30%;
  }


}
</style>