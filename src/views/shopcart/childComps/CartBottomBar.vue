<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="check-button"
                      :is-checked="isSelectAll"
                      @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price">
        合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
        去结算（{{checkLength}}）
      </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";

    import { mapGetters } from 'vuex'
    export default {
      name: "CartBottomBar",
      components: {
          CheckButton
      },
      computed: {
        ...mapGetters(['cartList']),

        totalPrice(){
          return '￥' + this.cartList.filter(item =>{
            return item.checked;
          }).reduce((preValue,item) =>{
            return preValue + item.price * item.count
          },0).toFixed(2)
        },
        checkLength(){
          return this.cartList.filter((item) => item.checked).length;
        },


        isSelectAll(){
          //当购物车没有东西的时候，全选按钮为false不显示
          if(this.cartList.length === 0) return false;

          //获取的未选中的商品
          //方法一：filter方法会遍历完所有对象，效率低
          // return !(this.cartList.filter(item => !item.checked).length);

          //方法二：find方法只要找到未选中的商品就会停止，效率高
          return !(this.cartList.find(item => !item.checked));

          //方法三：普通的遍历
          // for ( let item of this.cartList){
          //   if(!this.checked){
          //     return false;
          //   }
          // }
          // return true
        }
      },
      methods:{
        checkClick(){
          //全选的判断
          if(this.isSelectAll){ //全部选中
            this.cartList.forEach(item => item.checked = false)
          }else { //部分或者全部不选中
            this.cartList.forEach(item => item.checked = true)
          }
        },
        calcClick(){
          //当没有选择商品的时候的提示框
          if(!this.isSelectAll){
            this.$toast.show("请选择要购买的商品",2000)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    align-items: center;

    height: 35px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    /* height: 100%; */
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
  }

  .calculate {
    width: 90px;
    height: 100%;
    line-height: 40px;
    margin-left: auto;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
