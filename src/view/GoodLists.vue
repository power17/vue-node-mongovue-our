<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>good</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{cur:priceChecked === 'all'}">All</a></dd>
              <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)" :class="{cur: priceChecked == index }">
                <a href="javascript:void(0)" >{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'static/'+ item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>

              </ul>
              <div  class="view-more-normal"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="busy"
                    infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <!-- 图标  -->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import './../assets/css/checkout.css'
  import NavHeader from  '@/components/NavHeader'
  import NavFooter from  '@/components/NavFooter'
  import NavBread from  '@/components/NavBread'
  import axios from  'axios'
    export default {
     data(){
       return{
         goodsList: [],//商品列表
         priceFilter: [
           {
           startPrice : '0.00',
           endPrice   : '100.00'
         },
           {
             startPrice: '100.00',
             endPrice: '500.00'
           },
           {
             startPrice: '500.00',
             endPrice : '1000.00'
           },
           {
             startPrice: '1000.00',
             endPrice  : '5000.00'
           }
         ],
         priceChecked: 'all',
         sortFlag : false, //true 为升序
         page: 1,
         pageSize:8,
         busy:true, //无限滚动
         loading: false

       }
     },
      components: {
        NavHeader,
        NavFooter,
        NavBread

      },
      mounted: function () {
       this.getGoodsList();
      },
      methods:{
       //获取商品列表
       getGoodsList : function (flag) {
         var param = {
           page: this.page,
           pageSize: this.pageSize,
           sort: this.sortFlag? 1:-1,
           priceLevel: this.priceChecked//商品分级
         };
         this.loading = true;
         axios.get("/goods",{params:param}).then((response) =>{
           let res = response.data;
           this.loading = false;

           if(res.status == '0') {
             //无限加载
             if(flag) {
               this.goodsList = this.goodsList.concat(res.result.list);
               //没有数据时
               if(res.result.count ==0) {
                 this.busy = true;
               }else{
                 this.busy = false;
               }
             }else{

               this.goodsList = res.result.list;
               this.busy = false;
             }

           }else{
             this.goodsList = [];
           }
         });

       },
        sortGoods: function () {
          this.sortFlag= !this.sortFlag;
          this.page = 1; //价格排序后从第一页开始
          this.getGoodsList(); //重新加载数据
        },
        setPriceFilter: function(index) {
         this.priceChecked = index;
         this.page = 1;
         this.getGoodsList();
        },
        loadMore: function () {

         this.busy = true;
         setTimeout(() => {
           this.page++;
           //需要累加
           this.getGoodsList(true);
         },500)

        },
        addCart(productId) {
         axios.post('/goods/addCart',{
           productId: productId
         }).then((res) => {
           if(res.data.status == 0) {
             alert('加入成功');
           }else {
             alert('msg:' + res.msg);
           }
         })
        }
      }
    }
</script>


