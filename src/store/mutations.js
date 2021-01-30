import {ADDCOUNTER,ADDTOCART} from './mutations-types'

export default {
  // addCart(state,payload) {
  //payload新添加商品
  //添加判断：购物车是否有这件商品，有的话数量加一，没有的话添加商品
  //第一种方法
  // let oldProduct = null;
  // for(let item of state.cartList){
  //   if(item.iid === payload.iid){
  //     oldProduct = item
  //   }
  // }
  //

  // let index = state.cartList.indexOf(payload)
  // if(index === -1){
  //   let oldProduct = state.cartList[index]
  //   oldProduct.count += 1;
  // }else {
  //   payload.count = 1;
  //   state.cartList.push(payload)
  // }
  // }
  [ADDCOUNTER](state,payload){
    payload.count++;
  },
  [ADDTOCART](state,payload){
    payload.checked = true
    state.cartList.push(payload);
  }
}
