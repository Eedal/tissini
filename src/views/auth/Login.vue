<template>
    <div  style="margin:0; padding:0">
        <v-container fluid id="container" style="background:transparent">
            
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" color="transparent">
                <br><br><br><br><br><br><br><br>

                <v-img src="https://mitienda.moda/img/logo.e38c8b41.png" alt="Logo bolsa de compra tissini" contain height="200"></v-img>
              <v-card-text>
                <v-form>

                  <v-text-field label="Teléfono" v-model="mobilephone" prepend-inner-icon="mdi-phone" type="email" class="rounded-0" outlined  color="white" v-on:keyup="login()"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="ml-6 mr-6 text-center">
                  <br><br><br><br>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </div>
</template>
<script>
export default {
    data: () => ({
        mobilephone: ''
    }),
    methods: {
        async findClient() {
            try {
                let credentials = {
                    "mobilephone": this.mobilephone
                }
                const client = await this.$http.post('login/client', credentials)
                return client.data.customer
            } catch (error) {
                const status = error.response.data.status
                if(status === 'not_found')
                    return {}
            }
        },
        async login () {
            if(this.mobilephone.length == 10){
                let response = await this.findClient()
                if (Object.entries(response).length > 0){
                    localStorage.setItem("emprendedora", JSON.stringify(response))
                    this.$router.push('/categorias')
                }else{
                    console.log("vuelve a intentar");
                }
            }
        }
    }
}
</script>
<style scope>
#container {
  background: url('https://mitienda.moda/img/login.c4b9f873.jpg') no-repeat fixed !important; 
  background-size: cover !important;
  background-attachment: fixed !important;
}
</style>