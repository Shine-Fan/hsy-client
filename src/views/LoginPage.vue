<template>
    <div id="LoginBody">
        <div>
            <h1>This is Login page</h1>
            <p>用户名：<input type="text" v-model="userName"/></p>
            <p>密  码：<input type="password" v-model="userPWD"/></p>
            <input type="submit" value="'登陆" v-on:click="LoginPost"/>
            <br/>
            <br/>
            <div>input<p>{{ userName }}{{ userPWD }}</p></div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import axios from 'axios'

    Vue.use(axios);
    var defaultData={userName:"defaultUserName",userPWD:90000};
    window.onload = function () {
        // Vue.component("pr",{
        //     name:"pr",
        //     template:""
        // })
        var vm = new Vue({
            // el: '#LoginBody',
            data:defaultData,
        });
    };

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