<template>
    <div id="home">
      <nav-bar class="home-nav">
        <div slot="center"> 购物街</div>
      </nav-bar>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control"
                   v-show="isTabFixed"/>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <home-recommends :recommends="recommends" />
        <feature-views/>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"
                     :class="{fixed: isTabFixed}"/>
        <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick()" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {debounce} from "common/utils";
    import {imgListenerMixin,backTopMixin} from "common/mixin";

    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommends from "./childComps/HomeRecommends";
    import FeatureViews from "./childComps/FeatureViews";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "home",
        components: {
          HomeRecommends,
          HomeSwiper,
          FeatureViews,
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
        },
        mixins:[imgListenerMixin,backTopMixin],
        data(){
          return{
            // result:null
            banners:[],
            recommends: [],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]}
            },
            //设定默认值
            currentType: 'pop',
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
            isFirstTime: true
          }
        },
        computed:{
          showGoods(){
            return this.goods[this.currentType].list
          }
        },
        //销毁函数
        destroyed(){
          console.log("home destroyed");
        },
        //进页面时执行
        activated(){
          //刷新
          this.$refs.scroll.refresh()
          //滚动到原来保存的位置
          this.$refs.scroll.scrollTo(0,this.saveY,0)
          if(!this.isFirstTime){
            this.$bus.$on('itemImgLoad', this.itemImgListener)
          }

        },
        //离开页面时执行
        deactivated(){
          //获取到页面y的值
          //实现跳转页面时数据，home页面的页面还是之前停留的位置
          this.saveY = this.$refs.scroll.getScrollY()

          //取消全局事件的监听
          this.$bus.$off('itemImageLoad',this.itemImgListener)
          this.isFirstTime = false
        },
        //生命周期函数
        created(){
          //1.请求多个数据
          this.getHomeMultidata()

          //2.请求商品数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')

        },
        mounted(){
          //此代码被抽到混入mixin中
          //1.监听item中的图片是否加载完成
          //防抖操作
          //如果我们直接执行refresh，那么refresh函数就会被执行30次
          // 可以将refresh函数传入到debounce函数中，生成一个新的函数
          // 之后在调用非常频繁的时候，就会使用新生成的函数
          // 而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉
          // const refresh = debounce(this.$refs.scroll.refresh,500);
          // this.itemImgListener = () =>{
          //   // console.log("1");
          //   refresh()
          // }
          // this.$bus.$on('itemImageLoad',this.itemImgListener)

          // //2.获取tabControl中的offsetTop
          // //需要使用$el才可以获取到组件中的值
        },
        methods:{
          /**
           * 事件监听相关的方法
           */
          tabClick(index){
            // console.log(index)
            switch (index) {
              case 0:
                this.currentType = 'pop';
                break;
              case 1:
                this.currentType = 'new';
                break;
              case 2:
                this.currentType = 'sell';
                break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
          },
          // backClick(){
          //   // console.log("111");
          //   //调用Scroll组件中的scrollTo方法
          //   this.$refs.scroll.scrollTo(0,0,500);
          // },
          contentScroll(position){
            // console.log(position);
            //1.判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000

            //2.决定tabControl是否吸顶(position：fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop
          },
          loadMore(){
            console.log("上拉加载更多");
            this.getHomeGoods(this.currentType)
            //刷新
            this.newRefresh()
            // this.$refs.scroll.refresh()
          },
          swiperImageLoad(){
            //解决使用better-scroll时，容易产生的 bug。由于页面加载就把能够滑动的距离计算好，所以滚到一定距离不能滚动
            // console.log(this.$refs.tabControl.$el.offsetTop)
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
          },
          /**
           * 网络请求相关的方法
           */
          getHomeMultidata(){
            getHomeMultidata().then(res =>{
              // console.log(res)
              // this.result = res;
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res =>{
              // console.log(res)
              //进行数组拼接
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page += 1;

              //完成上拉加载更多
              this.$refs.scroll.finishPullUp()
            })
          }
        }
    }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    /*全局定义css的引用*/
    background-color: var(--color-tint);
    color: white;

    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  /*.tab-control{*/
    /*!*滑动停留功能,有些浏览器不支持这个属性*!*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
  /*}*/
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  .content{
    /*一定要给个高度不然不会进行滑动*/
    /*height: 300px;*/
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
