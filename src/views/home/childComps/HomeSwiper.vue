<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from "components/common/swiper"
    export default {
        name: "HomeSwiper",
        props:{
          banners:{
            type:Array,
            default(){
              return []
            }
          }
        },
        data(){
          return{
            isLoad: false
          }
        },
        components:{
          Swiper,
          SwiperItem
        },
        methods:{
          imageLoad(){
            // console.log("-----");
            //只需要请求一次获取一张图片的位置
            //不添加则会有几张图片调用几次
            if(!this.isLoad){
              this.$emit('swiperImageLoad')
              this.isLoad = true
            }
          }
        }
    }
</script>

<style scoped>

</style>
