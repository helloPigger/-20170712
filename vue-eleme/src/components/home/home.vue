<template>

    <div class='home-wrapper'>
      <!-- <scroll ref=home> -->
        <div class=home>
          <m-header></m-header>
          <tab></tab>
          <keep-alive>
             <router-view></router-view>
          </keep-alive>

        </div>
      <!-- </scroll> -->

      
    </div>

  

</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Scroll from "base/scroll"
import MenuFooter from "components/footer/footer"

export default {
  created () {
    this._initScroll()
  },
  methods: {
    _initScroll () {

    }

  },
  components: {
    MHeader,
    Tab,
    Scroll,
    MenuFooter
  }

}
</script>

<style scoped lang='stylus'>
.home-wrapper {
  background: #fff;

  .home {
    position: fixed;
    width: 100%;
  }
}
</style>

