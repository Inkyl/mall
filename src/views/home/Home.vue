<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="probeType"
      @scroll="contentScroll"
      :pull-up-load="pullUpLoad">
      <home-swiper :banners="banners"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles" @tabClick="tabClick" class="tab-control"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--组件想要点击必须添加native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import HomeSwiper from "views/home/childComps/HomeSwiper";
import HomeRecommendView from "views/home/childComps/HomeRecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      probeType: 3,
      isShowBackTop: false,
      pullUpLoad: true,
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    //监听Item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll.refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     *  事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
    },
    backClick() {
      //直接refs定位组件然后直接访问其中scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      if (-position.y > 1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },

    /**
     *
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //...是解构，将数组中所有元素都解析出来
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page
      })
    },

  }
}
</script>

<!--写了scoped表示是当前组件-->

<style scoped>
#home {
  padding-top: 44px;
  /*vh是视口高度*/
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}

.content {
  /*确定高度*/
  /*第一种*/
  /*height: calc(100vh - 93px);*/
  /*overflow: hidden;*/
  /*第二种 绝对定位*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
