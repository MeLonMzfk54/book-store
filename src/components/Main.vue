<template>
  <div>
      <my-header :cartItemCount="cartItemCount"></my-header>
      <main>
            <section class="products">
                <div class="custom-container">
                    <div class="product row" v-for="(product,key) in sortedProducts" :key="key">
                        <div class="product__image">
                            <figure>
                                <img :src="product.image" alt="product.title">
                            </figure>
                        </div>
                        <div>
                            <router-link tag="h1" :to="{name: 'Id', params: {id: product.id}}">{{product.title}}</router-link>
                            <p v-html="product.description"></p>
                            <p> {{ product.price | formatPrice }} </p>
                            <button 
                            type="button" 
                            class="btn btn-primary"
                            v-if="canAddToCart(product)"
                            @click="addToCart(product)"
                            >Add to cart</button>
                            <button 
                            class="btn disabled btn-primary"
                            disabled
                            v-else
                            >Add to cart</button>
                            <transition name="bounce" mode="out-in">
                                <span class="inventory-message" v-if="product.availableInventory - cartCount(product.id) === 0" key="0">All out!</span>
                                <span class="inventory-message" v-else-if="product.availableInventory - cartCount(product.id) < 5" key="">Only {{ product.availableInventory - cartCount(product.id) }} left!</span>
                                <span class="inventory-message" v-else key="">Buy now!</span>
                            </transition>
                            <div class="rating">
                              <span
                              :class="{'rating-active': checkRating(n, product)}"
                              :key="n" 
                              v-for="n in 5">
                                &#9734;
                              </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      </main>
  </div>
</template>

<script>
import axios from "axios";
import MyHeader from "./Header.vue";
export default {
    name: "main",
    data(){
        return{
            products: {},
            cart: [],
        };
    },
    components: {
        MyHeader,
    },
    computed: {
        cartItemCount: function(){
            return this.cart.length || 0;
        },
        sortedProducts(){
            let productsArray = Array.from(this.products);
            return productsArray.sort(this.compare);
        }
    },
    methods: {
        compare(a, b){
              if(a.title.toLowerCase() < b.title.toLowerCase())
                  return -1;
             if(a.title.toLowerCase() > b.title.toLowerCase())
                return 1;
            return 0;  
        },
        addToCart: function(aProduct){
            this.cart.push(aProduct.id);
        },
        checkRating(n, product){
        return product.rating - n >= 0;
        },
        canAddToCart: function(aProduct){
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id){
            let count = 0;
            for(let i = 0; i < this.cart.length; i++){
                if(this.cart[i] === id){
                count++;
                }
            }
            return count;
        }
    },
    filters: {
        formatPrice: function(price){
            if(!parseInt(price)) 
                return "";
            if(price > 99999){
                let priceString = (price / 10).toFixed(2);
                let priceArray = priceString.split("").reverse();
                let index = 3;
                while(priceArray.length > index + 3){
                    priceArray.splice(index+3,0,",");
                    index+=4;
                }
                return "₽" + priceArray.reverse().join("").replaceAll(",",".");
            } else {
                return "₽" + (price / 10).toFixed(2).replaceAll(",",".");
            }
        }
    },
    created: function(){
        axios.get("/static/products.json").then(response =>{
            this.products = response.data.products;
            console.log(this.products);
        })
    }
}
</script>

<style scoped>
    .bounce-enter-active{
        animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
        transform: translate3d(0,0,0);
        backface-visibility: hidden;
    }

    @keyframes shake {
        10%, 90%{
            color: red;
            transform: translate3d(-1px,0,0);
        }
        20%, 80%{
            transform: translate3d(2px,0,0);
        }
        30%, 50%, 70%{
            color: red;
            transform: translate3d(-4px,0,0);
        }
        40%, 60%{
            transform: translate3d(4px,0,0);
        }
    }
</style>