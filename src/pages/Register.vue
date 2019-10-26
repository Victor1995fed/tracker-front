<template>
    <div>
        <form  class="md-layout md-centered login md-size-50" @submit.prevent="register"  ref="formData">
            <md-card class="md-centered ">
                <md-card-header>
                    <h4 class="title">Введите  данные для регистрации </h4>
                    <!--                <p v-if="isChild">Родительская задача : {{parentCategory.title}} </p>-->
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-alignment-top-center">
                        <div class="md-layout-item md-small-size-100 md-size-50 text-center">
                            <md-field>
                                <label>Ваш логин</label>
                                <md-input  name="name"   v-model="name"  ></md-input>
                            </md-field>
                            <md-field>
                                <label>Ваш email</label>
                                <md-input type="email" name="email"   v-model="email"  ></md-input>
                            </md-field>
                            <md-field>
                                <label>Пароль</label>
                                <md-input type="password"  name="password"  v-model="password"  ></md-input>
                            </md-field>
                            <md-field>
                                <label>Повторите пароль</label>
                                <md-input type="password"  name="password_confirmation "  v-model="password_confirmation "  ></md-input>
                            </md-field>

                            <md-button type="submit" class="md-raised md-success md-right">Регистрация</md-button>
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
    export default {
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : null,
                message : ""
            }
        },

        methods: {
            register: function () {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>
