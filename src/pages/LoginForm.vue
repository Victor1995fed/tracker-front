<template>
    <div>
    <form  class="md-layout md-centered login md-size-50" @submit.prevent="login"  ref="formData">
        <md-card class="md-centered ">
            <md-card-header>
                <h4 class="title">Введите свои учетные данные  </h4>
<!--                <p v-if="isChild">Родительская задача : {{parentCategory.title}} </p>-->
            </md-card-header>
            <md-card-content>
                <div class="md-layout md-alignment-top-center">
                    <div class="md-layout-item md-small-size-100 md-size-50 text-center">
                        <md-field>
                            <label>Ваше имя</label>
                            <md-input  name="username"   v-model="username"  ></md-input>
                        </md-field>
                        <md-field>
                            <label>Пароль</label>
                            <md-input type="password"  name="password"  v-model="password"  ></md-input>
                        </md-field>

                        <md-button type="submit" class="md-raised md-success md-right">Войти</md-button>
                        <div class="registration-link">
                            <a href="#">Регистрация</a>
                        </div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </form>
    <snackbar-error ref="snackbarError" :message="message"></snackbar-error>
<!--        <div :is="componentError" :message="message" ref="componentError"></div>-->
    </div>
</template>


<script>
    import  {SnackbarError} from "@/components";
    export default {
        components:{
            SnackbarError
        },
        data(){
            return {
                showSnackbar:true,
                componentError:null,
                message: "Ошибка",
                username : "",
                password : ""
            }
        },

        methods: {
            login: function () {

                let username = this.username
                let password = this.password
                console.warn(this.$store);

                this.$store.dispatch('login', { username, password })
                    .then(() => this.$router.push('/'))
                    .catch(err => {
                        // console.warn('ОШИБКА',err.response.status)
                        if(err.response.status == 403){
                            this.$refs.snackbarError.showSnackbar = true;
                            // console.log(this.componentError);
                            this.message = 'Неверные учетные данные'
                        }
                        else
                             return Promise.reject(err.response);

                    })
            }
        }
    }
</script>

<style scoped>
    .login {
        max-width: 800px!important;
    }

    .login button {
        width: 100% !important;;
    }
</style>
