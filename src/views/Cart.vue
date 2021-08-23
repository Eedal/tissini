<template>
<div>
  <v-row align="center" class="mt-2">
              <v-col cols="6" md="6" v-for="cartProduct in cartProducts" :key="cartProduct.id" justify="center" align="center">
                
                  <v-img
                    max-width="400"
                    :src="
                      'https://v3.tissini.app' +
                      cartProduct.images.url
                    "
                    :alt="cartProduct.name"
                  ></v-img>
                  <p>
                    {{
                      cartProduct.name +
                      ", " +
                      cartProduct.category.name +
                      ", " +
                      cartProduct.quantity + 
                      " * " +
                      "$" +
                      cartProduct.price +
                      " = " + 
                      "$" +
                      cartProduct.quantity * cartProduct.price
                    }}
                  </p>
              </v-col>
            </v-row>
</div>
  
</template>

<script>
export default {
  data: () => ({
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) 
  })
}
</script>