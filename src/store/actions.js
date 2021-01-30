import {ADDCOUNTER,ADDTOCART} from './mutations-types'

export default {
  addCart(context,payload){
    //需要返回操作来接收判断是添加商品还是商品的数量加一，来进行展示提示框
    return new Promise((resolve, reject) => {
      //第二种方法
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) { //商品数量加一
        // oldProduct.count += 1;
        context.commit(ADDCOUNTER,oldProduct)
        resolve("当前商品数量+1")
      } else { //添加新的商品
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit(ADDTOCART,payload)
        resolve("添加了新的商品")
      }
    })
  }
}
