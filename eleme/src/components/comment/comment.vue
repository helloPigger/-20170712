<template>
  <div class=comment>
    <div class='comment-wrapper'>
      <div class=score>
        <div class=left>
          <p class=text1>{{text1()}}</p>
          <p class=text2>综合评价</p>
          <p class=text3>高于周边商家84.0%</p>
        </div>
        <div class=right>
          <ul>
            <li>
              <span>服务态度</span>
              <span>{{commentList.rating.body.service_score.toFixed(1)}}</span>
            </li>
            <li>
              <span>菜品评价</span>
              <span>{{commentList.rating.body.food_score.toFixed(1)}}</span>
            </li>
            <li>
              <span>送达时间</span>
              <span>{{commentList.rating.body.deliver_time}}分钟</span>
            </li>
          </ul>
        </div>
      </div>
      <scroll class='text-wrapper' :listenScroll=listenScroll :probeType=probeType @scroll=scroll1 ref=textWrapper>
        <div class=text>
          <div class=tag>
            <span v-for='(item,index) in commentList.tags.body' 
              :key=index
              :class='{unsatisfied: item.unsatisfied === true, select: currentIndex === index}'
              @click=selectList(item,index)
            >
            {{item.name}} {{item.count}}
            </span>
          </div>
          <scroll class='scroll-wrapper' ref=commentsWrapper :listenScroll=listenScroll :probeType=probeType @scroll=scroll2>
            <ul>
              <li v-for='(com,index) in commentList.comments.body' :key=index class=list
              :class='{rating5:com.rating === 5, rating4: com.rating === 4,rating3: com.rating === 3,rating2: com.rating === 2}'>
                <img  class=picture src='/static/image/e.png'>
                <div class=content>
                  <p class=user>
                    <span>{{com.username}}</span>
                    <span>{{com.rated_at}}</span>
                  </p>
                  <p class=star>
                    <i v-show='com.rating >1'></i>
                    <i v-show='com.rating >1'></i>
                    <i v-show='com.rating >2'></i>
                    <i v-show='com.rating >3'></i>
                    <i v-show='com.rating >4'></i>
                    {{text(com,index)}}
                  </p>
                  <p class='rating-text' v-show='com.rating_text'>{{com.rating_text}}</p>
                  <p v-for='(img,i) in com.order_images' :key=i class=img> <img :src=src(img) alt="" v-show='img.image_hash'></p>
                  <p class='rate-name'>
                    <!-- <i></i> -->
                    <span  v-for='(tag,j) in com.food_ratings' :key=j>{{tag.rate_name}}</span>
                  </p>
                </div>

              </li>
            </ul>
          </scroll>
        </div>
      </scroll>

    </div>
  </div>
</template>

<script>
import { commentData } from 'api/mock'
import Scroll from "base/scroll"
export default {
  created () {
    this.listenScroll = true
    this.probeType = 3

    this._initComment()
  },
  data () {
    return {
      commentList: [],
      currentIndex: 0,
      ratingText: [
        "超赞",
        "满意",
        "一般",
        "较差"
      ],
      scrolly1: -1,
      scrolly2: -1
    }
  },
  methods: {
    src (img) {
      let imgHash = img.image_hash
      let imagePath1 = imgHash.slice(0, 1)
      let imagePath2 = imgHash.slice(1, 3)
      let imagePath3 = imgHash.slice(3)
      return `//fuss10.elemecdn.com/${imagePath1}/${imagePath2}/${imagePath3}.jpeg`
    },
    text (com, index) {
      if (com.rating === 5) return this.ratingText[0]
      else if (com.rating === 4) return this.ratingText[1]
      if (com.rating === 3) return this.ratingText[2]
      if (com.rating === 2) return this.ratingText[3]
    },
    text1 () {
      return this.commentList.rating.body.overall_score.toFixed(1)
    },
    selectList (item, index) {
      this.$refs.commentsWrapper.scrollTo(0, 0)
      this.currentIndex = index
    },
    scroll1 (position) {
      this.scrolly1 = position.y
    },
    scroll2 (position) {
      this.scrolly2 = position.y
    },
    _initComment () {
      this.commentList = commentData
    }
  },
  watch: {
    scrolly1 (newy1) {
      // console.log('newy1:' + newy1)
      const OFFSET = 381
      if (-newy1 >= OFFSET) {
         this.$refs.textWrapper.scrollTo(0, -OFFSET)
        this.$refs.textWrapper.disable()
      }
    },
    scrolly2 (newy2) {
      // console.log('newy2:' + newy2)
      const OFFSET = 381
      if (-newy2 < OFFSET) {
        this.$refs.textWrapper.enable()
      }
    }

  },
  components: {
    Scroll
  }

}
</script>


<style lang='stylus'>
.comment {
  display: flex;

  .comment-wrapper {
    width: 100%;

    .score {
      display: flex;
      border-bottom: 8px solid #eee;
      margin-top: 20px;
      padding-bottom: 20px;

      .left {
        width: 140px;
        text-align: center;
        border-right: 1px solid #ddd;

        p {
          margin-top: 6px;
        }

        .text1 {
          font-size: 1.4rem;
          line-height: 1;
          color: #ff6000;
          font-weight: 700;
          margin-top: 0;
        }

        .text2 {
          font-size: 0.8rem;
        }

        .text3 {
          font-size: 0.27rem;
          color: #999;
        }
      }

      .right {
        flex: 1;
        margin-left: 20px;
        font-size: 0.32rem;
        color: #999;

        ul {
          li {
            margin-top: 6px;
          }
        }
      }
    }

    .text-wrapper {
      height: 400px;

      .text {
        padding: 4vw;
        background: #fff;

        .tag {
          display: flex;
          color: #666;
          font-size: 12px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;

          span {
            background-color: #ebf5ff;
            padding: 6px;
            margin-right: 10px;
          }

          .unsatisfied {
            background-color: #eee;
          }

          .select {
            background-color: #0097ff;
            color: #fff;
          }
        }

        .scroll-wrapper {
          height: 700px;
          overflow: hidden;

          .list {
            display: flex;
            font-size: 12px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;

            .picture {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              margin-top: 10px;
            }

            .content {
              flex: 1;
              padding-left: 10px;

              .user {
                display: flex;
                justify-content: space-between;
                padding: 12px 0 8px 0;
              }

              .star {
                margin: 2px 0 8px 0;
                display: flex;

                i:after {
                  content: '';
                  display: flex;
                  width: 16px;
                  height: 16px;
                  background: url('/static/image/star24_on@2x.png') no-repeat;
                  background-size: 14px;
                }

                i:after {
                }
              }

              .rating-text {
                font-size: 14px;
                margin: 8px 0;
              }

              .img {
                width: 140px;
                padding: 0 0 10px 0;

                img {
                  width: 100%;
                }
              }

              .rate-name {
                display: flex;
                flex-wrap: wrap;

                span {
                  padding: 6px 2px;
                  background: #ebf5ff;
                  margin-right: 6px;
                  margin-bottom: 4px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
