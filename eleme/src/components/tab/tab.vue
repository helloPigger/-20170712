<template>
  <div class='tab'>
    <router-link tag=div to='/home/menu'>
      <span>点餐</span>
    </router-link>
   <router-link  tag=div to='/home/comment'>
      <span>评价</span>
    </router-link>   
    <!-- <router-link tag=div to='/home/seller'>
      <span>商家</span>
    </router-link> -->
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='stylus'>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #666;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  margin-top: 12px;

  .router-link-active {
    & > span {
      color: #000;
      font-weight: bold;
      position: relative;

      &:after {
        content: '';
        background-color: #2395ff;
        position: absolute;
        height: 2px;
        width: 36px;
        top: 30px;
        left: 0;
      }
    }
  }
}
</style>