<template>
<div class='menu'>
  <scroll class='menu-wrapper'>
    <ul>
      <li 
        v-for='(item,index) in foodsList' 
        :key=index class=item 
        :class="{active:currentIndex === index}" 
        @click=selectMenu(index)
      >
        <span>{{item.name}}</span>
        <span class='classify-amount' v-show='item.activity>0'>{{item.activity}}</span>
      </li>
    </ul>
  </scroll>
  <scroll class='foods-wrapper' ref=foodsWrapper :listenScroll=listenScroll  :probeType = 'probeType' @scroll=scroll>
    <ul ref=foodsUl> 
      <li v-for='(item,index) in foodsList' :key=index class=item ref=item :data-index=index>
        <div class=title><span class='title-name'>{{item.name}}</span><span>{{item.description}}</span></div>
        <ul>
          <li v-for='(food,i) in item.foods' :key=i class=food>
            <div class='img-wrapper'>
              <img :src=src(food)>
            </div>
            <div class='desc-wrapper'>
              <span class=name>{{food.name}}</span>
              <span class=desc>{{food.description}}</span>
              <span class=tips>{{food.tips}}</span>
              <div class=price>
                <div>{{food.specfoods[0].price}}</div>
                <div class='cart-num'>
                  <i class=dic @click=decrease(index,i) v-show='foodsList[index].foods[i].quantity > 0'>-</i>
                  <span v-show='foodsList[index].foods[i].quantity > 0'>{{foodsList[index].foods[i].quantity}}</span>
                  <i class=inc @click=increase(index,i)>+</i>
                </div>

              </div>

            </div>

          </li>
        </ul>
      </li>
    </ul>
  </scroll>
  <menu-footer :totalPrice=totalPrice :totalNum=totalNum></menu-footer>
</div>

   

</template>

<script>
import { menuData } from "api/mock"
import Scroll from "base/scroll"
import Vue from 'vue'
import MenuFooter from "components/footer/footer"
const H = 112
export default {
  data () {
    return {
      foodsList: [],
      currentIndex: 0,
      totalNum: 0,
      totalPrice: 0,
      activityNum: 0,
      scrolly: -1
    }
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
    this.itemHeight = [0]
    this._initMenu()

  },
  mounted () {
    this.$nextTick(() => {
      this._heightArr()
    }, 20);
  },
  methods: {
    src (food) {
      let imagePath1 = food.image_path.slice(0, 1)
      let imagePath2 = food.image_path.slice(1, 3)
      let imagePath3 = food.image_path.slice(3)
      return `https://fuss10.elemecdn.com/${imagePath1}/${imagePath2}/${imagePath3}.jpeg`
    },
    selectMenu (index) {
      let height = 0
      this.currentIndex = index

      for (let i = 0; i < index; i++) {
        height += this.$refs.item[i].offsetHeight
      }

      let foodsEle = this.$refs.foodsUl.getElementsByClassName('item')[index]
      this.$refs.foodsWrapper.scrollToElement(foodsEle, 400)
      // this.$refs.foodsWrapper.scrollTo(0, -height)
    },
    scroll (position) {
      this.scrolly = position.y
    },
    decrease (index, i) {
      this.totalNum--
      if (this.totalNum <= 0) this.totalNum = 0
      this.foodsList[index].foods[i].quantity--
      if (this.foodsList[index].foods[i].quantity <= 0) this.foodsList[index].foods[i].quantity = 0
      this.totalPrice -= this.foodsList[index].foods[i].specfoods[0].price
      this.foodsList[index].activity--
    },
    increase (index, i) {
      this.totalNum++
      if (!this.foodsList[index].foods[i].quantity) {
        Vue.set(this.foodsList[index].foods[i], 'quantity', 1)
      } else {
        this.foodsList[index].foods[i].quantity++
      }
      this.totalPrice += this.foodsList[index].foods[i].specfoods[0].price
      this.foodsList[index].activity++
    },

    _initMenu () {
      this.foodsList = menuData
      this.foodsList.forEach(element => {
        element.activity = 0
      })

    },
    _heightArr () {
      let h = 0
      let list = this.$refs.item
      list.forEach((item, i) => {
        h += list[i].clientHeight
        this.itemHeight.push(h)
      })
      // console.log(this.itemHeight)
    }
  },
  watch: {
    scrolly (newy) {
      if (newy >= 0) this.currentIndex = 0
      let itemHeight = this.itemHeight
      for (let i = 0; i < itemHeight.length - 1; i++) {
        let h1 = itemHeight[i]
        let h2 = itemHeight[i + 1]
        if (-newy >= h1 && -newy < h2) {
          this.currentIndex = i
          return
        }
      }
    }

  },
  components: {
    Scroll,
    MenuFooter
  }


}
</script>
<style scoped lang='stylus'>
.menu {
  display: flex;
  height: 400px;
  overflow: hidden;

  .menu-wrapper {
    width: 70px;
    background-color: #f8f8f8;

    .item {
      position: relative;
      border-bottom: 1px solid #ddd;
      font-size: 12px;
      color: #666;
      padding: 14px;

      .classify-amount {
        position: absolute;
        background: #ff3c15;
        color: #fff;
        top: 2px;
        right: 10px;
        width: 14px;
        text-align: center;
        font-size: 12px;
        border-radius: 4px;
      }
    }

    .active {
      background-color: #fff;
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      color: #999;
      font-size: 12px;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid #ddd;
      padding: 10px;

      .title-name {
        margin-right: 10px;
        font-weight: bold;
        color: #333;
      }
    }

    & .food {
      display: flex;
      padding-top: 10px;

      .img-wrapper {
        img {
          width: 100px;
          height: 100px;
        }
      }

      .desc-wrapper {
        display: flex;
        flex-direction: column;
        width: 200px;

        span {
          margin-top: 10px;
        }

        .name {
          line-height: 24px;
          font-weight: bold;
        }

        .desc {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
        }

        .tips {
          font-size: 14px;
        }

        .price {
          display: flex;
          justify-content: space-between;

          .cart-num {
            margin-right: 10px;

            i {
              display: inline-block;
              display: inline-block;
              width: 20px;
              heo: 20px;
              border-radius: 20px;
              height: 20px;
              border: 1px solid #2395ff;
              font-style: normal;
              text-align: center;
              color: #2395ff;
              font-size: 22px;
              line-height: 18px;
            }

            .inc {
              background-color: #2395ff;
              color: #fff;
            }
          }
        }
      }
    }
  }

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
}
</style>

