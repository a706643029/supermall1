<template>
    <div class="recommends">
      <div v-for="item in recommends" class="recommends-item">
        <a :href="item.link">
          <img :src="item.image"/>
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomeRecommends",
        props:{
          recommends:{
            type: Array,
            default(){
              return [];
            }
          }
        }
    }
</script>

<style scoped>
  .recommends{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
  }
  .recommends-item{
    flex: 1;
  }
  .recommends-item img{
    width: 70px;
    height: 65px;
    border-radius: 100%;
  }

</style>
