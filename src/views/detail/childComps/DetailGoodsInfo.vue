<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc clear-fix">
        <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <!--只展示一组数据-->
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <!--<div class="info-list">-->
        <!--<img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad">-->
      <!--</div>-->
      <!--展示多组数据-->
      <div v-for="item in detailInfo.detailImage">
        <div class="info-key">{{item.key}}</div>
        <div class="info-list">
          <img v-for="(item,index) in item.list" :key="index" :src="item" @load="imgLoad">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
        props:{
          detailInfo:{
            type: Object,
            default(){
              return {}
            }
          }
        },
        data(){
          return{
            counter: 0,
            imagesLength: 0
          }
        },
        methods:{
          imgLoad(){
            //判断，所有的图片都加载完了，那么进行一次回调
            //添加判断有可能在图片还没加载完成时会出现滑动卡顿
            // console.log("111");
            if(++this.counter === this.imagesLength){
              this.$emit('imageLoad')
            }
          }
        },
        watch:{
          detailInfo(){
            //获取图片的个数
            this.imagesLength = this.detailInfo.detailImage[0].list.length;
          }
        }
    }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start,
  .info-desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before,
  .info-desc .end::after {
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    content: "";
    background-color: #333333;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    font-size: 14px;
    padding: 15px 0;
  }
  .info-key {
    font-size: 15px;
    margin: 10px 0 10px 15px;
    color: #333333;
  }
  .info-list img {
    width: 100%;
  }
</style>
