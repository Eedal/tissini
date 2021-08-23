<template>
  <div>
    <v-container>
      <v-dialog v-model="dialogConfirmProduct" max-width="500px">
        <v-card v-if="Object.entries(lastProuctSelected).length > 0">
          <v-card-title>
            {{ lastProuctSelected.name }}
          </v-card-title>
          <v-card-text>
            <v-img
              :src="'https://v3.tissini.app/' + lastProuctSelected.image.url"
            ></v-img>
            <div v-if="showFormSpecificProduct" class="mt-4">
              <v-row v-if="lastProuctSelected.variants.length > 0">
                <v-col
                  cols="2"
                  md="2"
                  v-for="variant in lastProuctSelected.variants"
                  :key="variant.id"
                >
                  <v-btn icon @click="setSizeProduct(variant.size)">
                    <v-avatar color="primary" size="40">
                      {{ variant.size }}</v-avatar
                    >
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="showSelectQuantity">
                <v-select
                  :items="sizesProduct"
                  label="Selecciona la cantidad"
                  v-model="quantity"
                ></v-select>
                <h1 v-if="sizesProduct.length <= 0">
                  Lo sentimos, acaban de comprar la útlima prenda que nos
                  quedaba! :(
                </h1>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <div class="text-h6 text--primary">
              ${{ lastProuctSelected.price }}
            </div>
            <v-spacer></v-spacer>
            <v-btn text v-if="!showFormSpecificProduct" @click="showFormSpecificProduct = true" color="#ec529c">
              <v-icon>mdi-cart-arrow-down</v-icon>
              Lo quiero
            </v-btn>
            <v-btn v-else  text color="#ec529c" @click="sendToCart()">
              <v-icon>mdi-cart-arrow-down</v-icon>
              Agregar

            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-carousel cycle height="400" hide-delimiter-background>
        <v-carousel-item
          max-width="800"
          class="mx-auto"
          v-for="category in primaryCategories"
          :key="category.id"
        >
          <v-sheet height="100%">
            <v-row class="fill-height">
              <v-img :src="category.image"></v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-card
        max-width="800"
        class="mt-4 elevation-0 mx-auto"
        v-for="section in sections"
        :key="section.id"
      >
        <v-img :src="'https://v3.tissini.app/' + section.image"></v-img>
        <v-carousel height="550" hide-delimiter-background>
          <v-carousel-item
            max-width="1000"
            class="mx-auto"
            v-for="n in Math.ceil(section.products.length / 4)"
            :key="n"
          >
            <v-row align="center" class="mt-2">
              <v-col cols="6" md="6" v-for="i in 4" :key="i">
                <div
                  v-if="4 * (n - 1) + i - 1 < section.products.length"
                  align="center"
                  @click="showProduct(section.products[4 * (n - 1) + i - 1])"
                >
                  <v-img
                    max-width="200"
                    :src="
                      'https://v3.tissini.app' +
                      section.products[4 * (n - 1) + i - 1].image.url
                    "
                    :alt="section.products[4 * (n - 1) + i - 1].name"
                  ></v-img>
                  <p>
                    {{
                      section.products[4 * (n - 1) + i - 1].name +
                      ", " +
                      section.products[4 * (n - 1) + i - 1].categories
                        .category +
                      ", " +
                      "$" +
                      section.products[4 * (n - 1) + i - 1].price
                    }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-card>
      <v-card max-width="800" class="mt-4 elevation-0 mx-auto">
        <v-img
          src="https://v3.tissini.app/img/categories/multivendor/product-lines.png"
        ></v-img>
      </v-card>
      <v-card
        max-width="800"
        class="mt-4 elevation-0 mx-auto"
        v-for="category in categories"
        :key="category.id"
      >
        <v-img
          :src="
            'https://v3.tissini.app/' +
            category.image.slice(0, 16) +
            'multivendor/' +
            category.image.slice(16, category.image.length)
          "
        >
          <v-btn
            color="#ec529c"
            small
            rounded
            style="
              position: relative;
              margin-left: 69%;
              margin-top: 31%;
              color: white;
            "
            >Ver más</v-btn
          >
        </v-img>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Category",
  async mounted() {
    let response = await this.$http.get("/categories");

    this.categoriesWhithParentId1 = await response.data.filter((category) => {
      return category.parent_id === 1;
    });
    let response2 = await this.$http.get("/categories/sections");
    this.sections = await response2.data;
    let response3 = await this.$http.get("/categories");
    this.categories = await response3.data;
  },
  methods: {
    sendToCart(){
      this.dialogConfirmProduct = false

      var newItem = {
          id: this.lastProuctSelected.id,
          name: this.lastProuctSelected.name,
          refernce: this.lastProuctSelected.refernce,
          images: this.lastProuctSelected.image,
          variant: this.lastProuctSelected.variants,
          category: this.lastProuctSelected.categories,
          price: this.lastProuctSelected.price,
          quantity: this.quantity,

        }
      var cartProducts = localStorage.getItem("cartProducts")
      if(cartProducts){
        let cartProductsAux = JSON.parse(cartProducts)
        cartProductsAux.push(newItem)
        localStorage.setItem("cartProducts", JSON.stringify(cartProductsAux))

      }else{
        localStorage.setItem("cartProducts", JSON.stringify([newItem]))
      }

      this.$store.commit("moduleCartShopping/setItem", JSON.parse(localStorage.getItem("cartProducts")).length);
this.quantity = ''
    },
    setSizeProduct(size) {
      this.showSelectQuantity = true;
      this.productTemporal.size = size;
      let arraAux = this.lastProuctSelected.variants.filter((variant) => {
        return variant.size === size;
      });

      let selectSizesAux = [];
      for (let index = 1; index < arraAux[0].quantity; index++) {
        selectSizesAux.push(index + 1);
      }
      this.sizesProduct = selectSizesAux;
    },
    showProduct(product) {
      this.lastProuctSelected = product;
      this.dialogConfirmProduct = true;
      this.showFormSpecificProduct = false
    },
  },
  data: () => ({
    quantity: '',
    sizesProduct: [],
    productTemporal: {},
    showSelectQuantity: false,
    lastProuctSelected: {},
    showFormSpecificProduct: false,
    
    dialogConfirmProduct: false,
    primaryCategories: [
      {
        id: 5,
        name: "jeans",
        image:
          "https://v3.tissini.app/img/categories/multivendor/jeans-prominent.jpg",
      },
      {
        id: 6,
        name: "fajas",
        image:
          "https://v3.tissini.app/img/categories/multivendor/fajas-prominent.jpg",
      },
      {
        id: 309,
        name: "blusas",
        image:
          "https://v3.tissini.app/img/categories/multivendor/blusas-prominent.jpg",
      },
      {
        id: 422,
        name: "zapatos",
        image:
          "https://v3.tissini.app/img/categories/multivendor/zapatos-prominent.jpg",
      },
      {
        id: 8,
        name: "ropa-interior",
        image:
          "https://v3.tissini.app/img/categories/multivendor/ropa-interior-prominent.jpg",
      },
      {
        id: 428,
        name: "seamless",
        image:
          "https://v3.tissini.app/img/categories/multivendor/seamless-prominent.jpg",
      },
      {
        id: 450,
        name: "concord-ozzy",
        image:
          "https://v3.tissini.app/img/categories/multivendor/concord-ozzy-prominent.jpg",
      },
      {
        id: 429,
        name: "tapabocas",
        image:
          "https://v3.tissini.app/img/categories/multivendor/tapabocas-prominent.jpg",
      },
    ],
    categories: [],
    selected: [],
    categoriesWhithParentId1: [],
    sections: [],
  }),
};
</script>
