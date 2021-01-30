<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll">
        <!--<ul>-->
          <!--<li v-for="item in $store.state.cartList">-->
            <!--{{item}}-->
          <!--</li>-->
        <!--</ul>-->
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>
        <goods-list ref="recommend" :goods="recommends"/>
      </scroll>

      <detail-bottom-bar @addCart="addToCart"/>
      <back-top @click.native="backClick()" v-show="isShowBackTop"/>
      <toast :message="message" :show="show"/>
    </div>
</template>

<script>
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
    import {imgListenerMixin, backTopMixin} from "common/mixin";
    import {debounce} from "common/utils";
    import {mapActions} from "vuex"
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import Toast from "components/common/toast/Toast";

    import GoodsList from "components/content/goods/GoodsList";

    export default {
        name: "Detail",
      components: {
        Toast,
        DetailBottomBar,
        GoodsList,
        DetailCommentInfo,
        DetailParamInfo,
        DetailGoodsInfo,
        DetailShopInfo,
        DetailBaseInfo,
        DetailSwiper,
        DetailNavBar,
        Scroll,
      },
      mixins:[imgListenerMixin, backTopMixin],
      data(){
          return{
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs:[],
            getThemeTopYs: [],
            currentIndex: 0,
            message: '',
            show: false
          }
        },
      created(){
          //1.保存传入的iid
          this.iid = this.$route.params.iid;

          //2.根据iid请求详情数据
          getDetail(this.iid).then(res =>{
            const data = res.result;
            // console.log(res);
            //1.获取顶部的图片轮播数据
            this.topImages = data.itemInfo.topImages;

            //2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

            //3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo);

            //4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            //5.取出参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);

            //6.获取商评论信息
            if(data.rate.cRate !== 0){
              this.commentInfo = data.rate.list[0];
            }

            //获取不到图片的值
            //$nextTick可以在页面接收到数据后，再获取数据
            //获取导航栏上需要跳转的位置的值
            // this.$nextTick(() =>{
            //   this.themeTopYs = [];
            //   this.themeTopYs.push(0);
            //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //   // console.log(this.themeTopYs);
            // })

          })

          //3.请求推荐数据

          getRecommend().then(res => {
            // console.log(res);
            this.recommends = res.data.list
          })

          //用来获取头部点击事件所对应的位置的y值
          //4.给getThemeTopYs赋值，并进行防抖

          this.getThemeTopYs = debounce(() =>{
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //添加最大值Number.MAX_VALUE
            //
            this.themeTopYs.push(Number.MAX_VALUE);

            console.log(this.themeTopYs);
          },100)
        },
      methods:{
        ...mapActions(['addCart']),
          imageLoad(){
            this.newRefresh()
            // this.$refs.scroll.refresh()
            //前面防抖后获取头部点击事件所对应的位置的y值
            this.getThemeTopYs()
          },
          titleClick(index){
            // console.log(index);
            this.$refs.scroll.scrollTo(0,- this.themeTopYs[index],100)
          },
          contentScroll(position){
            // 1. 获取y值

            const positionY = -position.y;
            // 2. positionY和主题中的值进行对比
            let length = this.themeTopYs.length;
            for (let i = 0; i < length-1; i++) {

              // if(this.currentIndex !== i &&
              //   ((i < length - 1 && positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i + 1]) ||
              //     (i === length - 1 && positionY >= this.themeTopYs[i]))){
              //       this.currentIndex = i;
              //       // console.log(this.currentIndex);
              //       this.$refs.nav.currentIndex = this.currentIndex;
              // }

              if((positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i + 1])){
                this.currentIndex = i;
                // console.log(this.currentIndex);
                this.$refs.nav.currentIndex = this.currentIndex;
              }
            }

            //
            this.isShowBackTop = (-position.y) > 1000
          },
          addToCart(){
            //1.获取购物车需要展示的信息

            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            //2.将商品添加到购物车
            // this.$store.commit('addCart',product)
            this.addCart(product).then( res =>{
              // console.log(res);
              this.$toast.show(res,1500)
            })
            // this.$store.dispatch('addCart',product).then(res =>{
            //   // this.show = true;
            //   // this.message = res;
            //   // setTimeout(() =>{
            //   //   this.show = false;
            //   //   this.message = '';
            //   // },1500)
            //   // console.log(res);
            //
            //   this.$toast.show(res,1500)
            // })


          }
      },
      destroyed(){
          //取消全局事件的监听
          this.$bus.$off('itemImageLoad',this.itemImgListener);
      },
      mounted(){
        // console.log('mounted');
      }
    }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
    /*background-color: #fff;*/
  }
</style>
