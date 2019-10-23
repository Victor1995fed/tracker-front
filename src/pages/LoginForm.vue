<!--<template>-->
<!--    <div>-->
<!--        <form class="login" @submit.prevent="login">-->
<!--            <h1>Sign in</h1>-->
<!--            <label>Username</label>-->
<!--            <input required v-model="username" type="text" placeholder="Name"/>-->
<!--            <label>Password</label>-->
<!--            <input required v-model="password" type="password" placeholder="Password"/>-->
<!--            <hr/>-->
<!--            <button type="submit">Login</button>-->
<!--        </form>-->
<!--    </div>-->
<!--</template>-->
<template>
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
                            <md-input  name="username"  v-model="username"  ></md-input>
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
</template>


<script>
    export default {
        data(){
            return {
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
                    .catch(err => console.log(err))
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
