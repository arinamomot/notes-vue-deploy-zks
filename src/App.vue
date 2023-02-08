<template>
  <q-layout view="hHh LpR fFf">
    <Header></Header>
  </q-layout>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header
  }
}
</script> 

<style lang="scss">
	*::-webkit-scrollbar {
		width: 8px;


	}
	*::-webkit-scrollbar-track{
		background: black;
	}
	*::-webkit-scrollbar-thumb {
		background: red;
	}
	
</style>