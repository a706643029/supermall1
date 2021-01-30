import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const imgListenerMixin = {
  data(){
    return{
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener = () =>{
      // console.log("1");
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop: false,
    }
  },
  methods:{
    backClick(){;
      //调用Scroll组件中的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,500);
    },
  }
}
