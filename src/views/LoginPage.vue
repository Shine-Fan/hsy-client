<template>
    <div id="LoginBody" class="container col-md-6">
        <h1>This is Login page</h1>
        <div class="input-group justify-content-center">
            <div class="input-group col-md-8 mb-1">
                <div class="input-group-prepend col-md-3">
                    <label class="input-group-text">用户名</label>
                </div>
                <input type="text" v-model="userName" class="form-control"/>
            </div>
            <div class="input-group col-md-8">
                <div class="input-group-prepend col-md-3 mb-1">
                    <label class="input-group-text">密 码</label>
                </div>
                <input type="password" v-model="userPWD" class="form-control"/>
            </div>
            <div class="input-group col-md-6 justify-content-center">
                <input type="submit" value="登陆" class="btn btn-primary btn-lg" v-on:click="LoginPost"/>
            </div>
        </div>
        <br/>
        <div>input,做参考用，实际版本应当删除<p>userName:{{ userName }}</p><p> password:{{ userPWD }}</p></div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import Vue from "vue";
    import axios from 'axios'

    Vue.use(axios);
    // var defaultData={userName:"defaultUserName",userPWD:90000};

    export default {
        name: 'LoginPage',
        props:{
            userName:String,
            userPWD:String,
        },
        methods:{
            LoginPost: function(){
                console.log("func triggered");
                axios.post('http://192.168.46.105:8080/login',{
                    username:this.userName,
                    password:this.userPWD
                })
                    .then(response => (this.info = response
                    ))
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            }
        }
    }
</script>



<style scoped>

</style>