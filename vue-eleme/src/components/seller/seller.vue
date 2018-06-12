<template>
  <!-- <div class=seller>
    商家 
    
  </div> -->
  <!-- <div class="box">
    <span class="item"></span>
    <span class="item"></span>
  </div> -->
  <div class="box">
    <div class="column">
      <span class="item"></span>
      <span class="item"></span>
    </div>
</div>
</template>

<style lang='stylus'>
.box {
  display: flex;
  justify-content: space-between;

  .column {
      display: flex;
  justify-content: space-between;
    .item {
      width: 100px;
      height: 100px;
      background-color: red;
    }
  }
}
</style>
