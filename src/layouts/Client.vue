<template>
  <div>
    <v-dialog v-model="dialogLogout" max-width="500px">
      <v-card>
        <v-card-title> ¿Quieres Salir? </v-card-title>
        <v-card-text>
          <p>
            Dándole un toque a este botón sales de la Tienda. Si quieres navegar
            en la Tienda utiliza las opciones de la parte inferior:
          </p>
          <v-icon color="#ec529c">mdi-home</v-icon>
          Home
          <v-icon color="#ec529c">mdi-badge-account</v-icon>
          Catalogo
          <v-icon color="#ec529c">mdi-cart-outline</v-icon>
            Carrito
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="logout()">
            Salir de la tienda
            
          </v-btn>
          <v-btn text @click="dialogLogout = false">
            Volver
            
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar app color="#ec529c" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('/src/assets/logo2.png')"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="tel:555-555-5555"
        text
      >
        <v-icon>mdi-phone</v-icon>
      </v-btn>
      <v-btn
        
        @click="dialogLogout = true"
        text
      >
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-footer fixed>
      <v-bottom-navigation color="#ec529c" grow absolute>
        <v-btn @click="goToUrl('/categorias')">
          <span>Categorías</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn @click="goToUrl('/categorias/1')">
          <span>Catálogos</span>

          <v-icon>mdi-badge-account</v-icon>
        </v-btn>

        <v-btn @click="goToUrl('/carrito')">
          <v-badge
            color="#ec529c"
            :content="itemsInCart"
            v-if="itemsInCart != 0"
          >
            <span>Carrito</span>
          </v-badge>
          <span v-else>Carrito</span>

          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogLogout: false,
  }),
  computed: {
    itemsInCart: {
      get() {
        return this.$store.getters["moduleCartShopping/getItems"];
      },
    },
  },
  mounted() {
    this.$store.commit(
      "moduleCartShopping/setItem",
      JSON.parse(localStorage.getItem("cartProducts"))
        ? JSON.parse(localStorage.getItem("cartProducts")).length
        : ""
    );
  },
  methods: {
    logout(){
      localStorage.removeItem("emprendedora");
      this.$router.push('/')
    },
    goToUrl(url) {
      if (this.$router.currentRoute.path != url)
        this.$router.push(url).catch(() => {});
    },
  },
};
</script>