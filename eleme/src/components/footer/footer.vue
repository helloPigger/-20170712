<template>
  <div class=cart>
    <div class='cart-wrapper'>
      <div class=left>
        <div class=icon>
          <span class='empty-cart-icon' :class="{'cart-icon':totalNum>0}"></span>
          <span class=amount v-show='totalNum>0'>{{totalNum}}</span>
        </div>
        <div class=total>
          <div class=money>
            <span>￥{{totalPrice}}</span>
          </div>
          <div class=kd>配送费￥9</div>
        </div>

      </div>
      <div class='empty-right' :class="{'right':totalNum>0}" >{{text()}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPrice: {
      type: Number,
      default: 0
    },
    totalNum: {
      type: Number,
      default: 0
    }

  },
  methods: {
    text () {
      if (this.totalNum > 0) return '去结算'
      else return '￥0起送'
    },
  },

}
</script>


 <style lang='stylus'>
 .cart {
   width: 100%;
   height: 48px;
   background-color: #ddd;
   position: fixed;
   bottom: 0;
   left: 0;

   .cart-wrapper {
     display: flex;
     height: 100%;

     .left {
       background-color: rgba(61, 61, 63, 0.9);
       width: 70%;
       display: flex;

       .icon {
         width: 100px;
         position: relative;

         .empty-cart-icon {
           display: inline-block;
           width: 44px;
           height: 44px;
           border-radius: 30px;
           background-color: rgba(61, 61, 63, 0.9);
           position: absolute;
           left: 12px;
           top: -10px;
           border: 4px solid #444;

           &:after {
             position: absolute;
             content: '';
             background: url('/static/image/cart-empty.png') 50% no-repeat;
             left: 10px;
             top: 8px;
             width: 28px;
             height: 28px;
           }
         }

         .cart-icon {
           background-color: #3190e8;

           &:after {
             position: absolute;
             content: '';
             background: url('/static/image/cart.png') 50% no-repeat;
             left: 10px;
             top: 8px;
             width: 28px;
             height: 28px;
           }
         }

         .amount {
           position: absolute;
           left: 40px;
           top: -10px;
           background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
           color: #fff;
           padding: 2px;
           font-size: 12px;
           border-radius: 9px;
         }
       }

       .total {
         .money {
           font-size: 16px;
           color: #fff;
           padding-top: 10px;
           padding-bottom: 2px;
           padding-left: 0;
         }

         .kd {
           color: #999;
           font-size: 12px;
         }
       }
     }

     .empty-right {
       flex: 1;
       background-color: rgba(61, 61, 63, 0.9);
       color: #fff;
       font-size: 16px;
       line-height: 48px;
       text-align: center;
       font-weight: bold;
     }

     .right {
       background-color: #4cd964;
     }
   }
 }
</style>
