<template>
<div>
  <my-header :cartItemCount="cartItemCount"></my-header>
            <section class="cart">
              <div class="panel panel-info">
                <div class="panel-heading">Book store checkout</div>
                <div class="col-md-12">
                  <h4><strong>Enter Your Information</strong></h4>
                </div>
                <div class="panel-body">
                  <form action="#">
                  <div class="col-md-6 cart__item">
                    <strong>First Name:</strong>
                    <input type="text" class="form-control" v-model.trim.lazy="order.firstName">
                  </div>
                  <div class="col-md-6 cart__item">
                    <strong>Last Name:</strong>
                    <input type="text" class="form-control" v-model.trim="order.lastName">
                  </div>
                  <div class="form-group">
                    <div class="col-md-12"><strong>Address:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.address"                      
                        class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12"><strong>City:</strong></div>
                    <div class="col-md-12">
                      <input v-model.trim="order.city"                        
                        class="form-control" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-2">
                    <strong>State:</strong>
                      <select v-model="order.state"                 
                        class="form-control">
                        <option disabled value="">State</option>
                        <option v-for="(state, key) in states"
                        :key="key"
                        :value="state">{{ key }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                    <strong>Zip / Postal Code:</strong>
                      <input v-model.number="order.zip"  			
                        class="form-control"/>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6 boxes">
                      <input type="checkbox" id="gift" value="false" 
                      v-model="order.gift"
                      :true-value="order.sendGift"
                      :false-value="order.dontSendGift">
                      <label for="gift">Ship As Gift?</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6 boxes">
                      <input type="radio" id="home" :value="order.home" v-model="order.method">
                      <label for="home">Home</label>
                      <input type="radio" id="business" :value="order.business" v-model="order.method">
                      <label for="business">Business</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-6">
                      <button 
                      type="submit"
                      class="btn btn-primary submit"
                      @click.prevent="submitForm">
                      Place order</button>
                    </div>
                  </div>
                </form>
                  <div class="col-md-12 verify cart__info">
                    <pre>
                      First Name: {{order.firstName}}
                       Last Name: {{order.lastName}}
                         Address: {{order.address}}
                            City: {{order.city}}
                             Zip: {{order.zip}}
                           State: {{order.state}}
                          Method: {{order.method}}
                            Gift: {{order.gift}}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
</div>
</template>

<script>
import MyHeader from "./Header.vue";
export default {
    name: "form",
    props: ['cartItemCount'],
    components: {
        MyHeader
    },
    data(){
        return{
            order:{
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                zip: "",
                state: "",
                method: "Home Address",
                home: "Home Address",
                business: "Business address",
                gift: "Do Not Send As A Gift",
                sendGift: "Send As A Gift",
                dontSendGift: "Do Not Send As A Gift",
            },
            states: {
                AL: "Alabama",
                AR: "Arizona",
                CA: "California",
                NV: "Nevada",
            },
        }
    },
    methods: {
        submitForm(){
            alert("submitted");
        }
    }
}
</script>

<style>

</style>