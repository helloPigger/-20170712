<template>
<!-- <scroll> -->
  <div class='m-header'>
    <div class=back>
      <i class=icon @click=back>返回</i>
    </div>
    <div class='top-header' @click=showShopDetail>
      <img :src=src>
      <div><span class='pinpai-tag'>品牌</span><h3>{{shopDetailList.name}}</h3></div>
      <div class=yuexiao>{{yuexiao}}</div>
      <div class=notice>{{shopDetailList.promotion_info}}</div>
    </div>
    <div class='shop-detail' v-show=shopDetailshowTag>
      <div class='sd-content'>
        <div><span class='tag'>品牌</span><h2>{{shopDetailList.name}}</h2></div>
        <div class='detail-list'>
          <div>
            <span class=span1>5</span>
            <span class=span2>评分</span>
          </div>
          <div>
            <span class=span1>x单</span>
            <span class=span2>月售</span>
          </div>
          <div>
            <span class=span1>商家配送</span>
            <span class=span2>约30分钟</span>
          </div>
          <div>
            <span class=span1>x元</span>
            <span class=span2>配送费</span>
          </div>
          <div>
            <span class=span1>x米</span>
            <span class=span2>距离</span>
          </div>
        </div>
        <h3>公告</h3>
        <div class='shop-alert'>{{shopDetailList.promotion_info}}</div>
        
      </div>
      <div class='sd-close' @click=close>X</div>
    </div>
    <div class=discount>
      <div class='dl-top'>
        <span class='caidan-tag'>菜单</span>
        <span class='discount-list' @click=discountList>{{activities[0].num}}</span>
      </div>
    </div>

    <div class=bgc v-show='shopDetailshowTag || showDiscountListTag' @click=hidden></div>
    <div class='dl-content'  v-show=showDiscountListTag>
      <h2>优惠活动</h2>
      <scroll class='discount-wrapper' :data=activities>  
        <ul class='dl-list'>
          <li v-for='(item,index) in activities' :key=index class=activities>
            <span class=icon :class='iconClass(item)'>{{item.icon_name}}</span>
            <span class=desc>{{item.description}}</span>
          </li>
        </ul>
      </scroll>
  
  
    </div>


  </div>
  <!-- </scroll> -->
</template>

<script>
import { getRatings, shopDetail } from 'api/ratings'
import { shopDetailData } from 'api/mock'
import Scroll from 'base/scroll'
export default {
  data () {
    return {
      src: 'http://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg',
      yuexiao: '月销200单 商家配送 约30分钟 距离 800米',
      shopDetailshowTag: false,
      showDiscountListTag: false,
      shopDetailList: [],
      activities: []
    }

  },
  created () {
    this._shopDetail()
  },
  methods: {
    back () {
      this.$router.push({
        path: `/start`
      })
    },
    showShopDetail () {
      this.shopDetailshowTag = true;
    },
    close () {
      this.shopDetailshowTag = false;
    },
    discountList () {
      this.showDiscountListTag = true;
    },
    hidden () {
      this.shopDetailshowTag = false;
      this.showDiscountListTag = false;
    },
    iconClass (item) {
      return {
        'icon-first': item.icon_name === '首单',
        'icon-tejia': item.icon_name === '特价',
        'icon-manjian': item.icon_name === '满减'
      }
    },

    _shopDetail () {
      this.shopDetailList = shopDetailData
      this.activities = shopDetailData.activities
    }

  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang='stylus'>
.m-header {
  width: 100%;

  .back {
    background-color: #BAAFBF;
    height: 80px;

    .icon {
      color: #000;
      font-style: normal;
      font-size: 14px;
    }
  }

  .top-header {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 36px;

    img {
      width: 20%;
      height: auto;
      top: 26px;
      position: fixed;
    }

    div {
      display: flex;

      .pinpai-tag {
        color: #6a3709;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        background: #fff100;
        line-height: 20px;
        height: 20px;
        margin-right: 4px;
      }
    }

    .yuexiao {
      margin-top: 10px;
      font-size: 12px;
      color: #333;
    }

    .notice {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
      width: 240px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .shop-detail {
    z-index: 2;
    position: fixed;

    .sd-content {
      height: 200px;
      background-color: #fff;
      margin: 0 auto;
      width: 94%;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 60px;

        .tag {
          color: #6a3709;
          font-style: normal;
          font-weight: 700;
          font-size: 12px;
          background: #fff100;
          line-height: 20px;
          height: 20px;
          margin-right: 4px;
        }
      }

      .detail-list {
        display: flex;
        justify-content: space-around;

        div {
          display: flex;
          flex-direction: column;
          align-items: center;

          .span1 {
            color: #333;
            font-size: 16px;
            height: 20px;
            line-height: 20px;
          }

          .span2 {
            font-size: 12px;
            height: 19px;
            line-height: 19px;
            color: #999;
          }
        }
      }

      & > h3 {
        text-align: center;
        color: #999;
        font-size: 12px;
        line-height: 40px;
      }

      .shop-alert {
        font-size: 12px;
        color: #333;
        line-height: 16px;
        width: 90%;
        margin: 0 auto;
      }
    }

    .sd-close {
      width: 32px;
      margin: 40px auto;
      border-radius: 16px;
      border: 1px solid #333;
      text-align: center;
      line-height: 32px;
    }
  }

  .discount {
    margin-top: 16px;
    display: flex;
    align-items: baseline;
    justify-content: center;

    .dl-top {
      border: 1px solid #ddd;
      padding: 2px;
      padding-right: 16px;

      .caidan-tag {
        background: #70bc46;
        color: #fff;
        font-size: 12px;
        width: 36px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-right: 10px;
      }

      .discount-list {
        font-size: 12px;
        color: #333;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          border: 4px solid transparent;
          border-top: 4px solid #666;
          top: 6px;
          right: -12px;
        }
      }
    }
  }

  .bgc {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }

  .dl-content {
    width: 100%;
    height: 300px;
    background-color: #ddd;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2;
    background: #f5f5f5;
    transition: transform 0.3s;

    & > h2 {
      text-align: center;
      line-height: 40px;
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
    }

    .discount-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      height: 100%;

      .dl-list {
        .activities {
          font-size: 14px;
          line-height: 20px;
          margin-left: 40px;
          display: flex;
          margin-bottom: 10px;

          .icon {
            margin-right: 20px;
            text-align: center;
            width: 30px;
            color: #fff;
          }

          .icon-first {
            background-color: rgb(112, 188, 70);
          }

          .icon-manjian {
            background-color: rgb(240, 115, 115);
          }

          .icon-tejia {
            background-color: rgb(240, 115, 115);
          }
        }
      }
    }
  }
}
</style>

