<template>
  <div class="cart-list">


      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList"
                        :key="index"
                        :item-info="item"></cart-list-item>
      </scroll>
    <!--<scroll class="content"  ref="scroll">-->
      <!--<cart-list-item v-for="(item,index) in cartList"-->
                      <!--:key="index"-->
                      <!--:item-info="item"/>-->
    <!--</scroll>-->
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    import Scroll from "components/common/scroll/Scroll";

    import CartListItem from "./CartListItem";

    export default {
      name: "CartList",
      components: {
        CartListItem,
        Scroll
      },
      computed:{
        ...mapGetters(['cartList'])
      },
      activated(){
        this.$refs.scroll.refresh()
      }
      //
      // activated(){
      //   //页面刷新，没有这个的话可能点添加购物车，购物车里面不会显示数据
      //   this.$refs.scroll.refresh()
      // }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
