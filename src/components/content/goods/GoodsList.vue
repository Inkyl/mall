<template>
  <div class="goods-list">
    <goods-list-item class="item" v-for="(item,index) in goods" :goods-item="item" :key="index"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-evenly;
}

.goods-list .item {
  width: 48%;
}
</style>
