<template>
<div class=start @click=start>
  <img :src=src>
  <div>肯德基外卖(大兴店)</div>
</div>

</template>

<script>
import Home from 'components/home/home'
export default {
  data () {
    return {
      src: "http://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg"
    }
  },
  created () {

  },
  methods: {
    start () {
      this.$router.push({
        path: `/home`
      })
    }
  },
  components: {
    Home
  }
}
</script>


<style lang='stylus'>
#app {
  width: 100%;

  .start {
    text-align: center;
    padding-top: 200px;
  }
}
</style>
