<template>
  <svg ref="box" class="box">
<!--    <rect width="100%" height="100%" fill="white" stroke="black" stroke-width="5"/>-->
    <image href="../assets/cuteCloud.png"  height="100"  width="100"
           class="square"
           fill="red"
           :x="square.x"
           :y="square.y"
           :style="cursor"
           @mousedown="drag"
           @mouseup="drop"/>
  </svg>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      square: {
        x: 100,
        y: 100,
      },
      dragOffsetX: null,
      dragOffsetY: null
    }
  },  computed: {
    cursor() {
      return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}`
    },
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

<style>
.box {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>