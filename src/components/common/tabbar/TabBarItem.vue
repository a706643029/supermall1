<template>
    <div class="tab-bar-item" @click="itemClick">
      <!--不要给插槽定义其他属性，防止插槽在替换的时候改变了属性使定义的属性没效果，要在外面包裹一层div-->
      <div v-if="!isActive" >
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <!--固定写死的style属性-->
      <!--<div :class="{active: isActive}">-->

      <!--可以动态获取style的属性-->
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
          path: String,
          activeColor:{
            //获取的值
            type: String,
            //默认的值
            default: 'red'
          }
        },
        data(){
          return{
            // isActive: true
          }
        },
      computed:{
        isActive(){
          //判断当前活跃的路由是不是点击事件传入得path，实现点击变颜色功能
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
          return this.isActive ? {color: this.activeColor}:{}
        }
      },
        methods:{
          itemClick(){
            // console.log("itemClick")
           return this.$router.replace(this.path)
          },
        }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    /*去掉图片与文字中间自带的三个像素*/
    vertical-align: middle;
    margin-top: 2px;
  }
  /*.active{*/
    /*color: #681599;*/
  /*}*/
</style>
