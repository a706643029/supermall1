<template>
    <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <cart-list/>
      <cart-bottom-bar/>
    </div>
    <!--<div class="cart">-->
      <!--&lt;!&ndash;导航&ndash;&gt;-->
      <!--<nav-bar class="nav-bar">-->
        <!--&lt;!&ndash;<div slot="center">购物车({{cartLength}})</div>&ndash;&gt;-->
        <!--<div slot="center">购物车({{length}})</div>-->
      <!--</nav-bar>-->

      <!--商品的列表-->
      <!--<cart-list />-->

      <!--&lt;!&ndash;底部的汇总&ndash;&gt;-->
      <!--<cart-bottom-bar/>-->
    <!--</div>-->
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'

    import { mapGetters } from 'vuex'

    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    export default {
      name: "shopcart",
      components: {
        CartBottomBar,
        NavBar,
        CartList
      },
      computed:{
        //第一种方法
        // cartLength(){
        //   return this.$store.getters.cartLength
        // }

        //第二种方法
        ...mapGetters(['cartLength'])

        // 第三种方法
        // ...mapGetters({
        //   length: 'cartLength'
        // })
      },

    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
