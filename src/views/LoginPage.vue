<template>
    <div id="LoginBody" class="container col-md-6">
        <h1>This is Login page</h1>
        <div class="input-group justify-content-center">
            <div class="input-group col-md-8 mb-1">
                <div class="input-group-prepend">
                    <label class="input-group-text">用户名</label>
                </div>
                <input type="text" v-model="userName" class="form-control" />
            </div>
            <div class="input-group col-md-8  mb-1">
                <div class="input-group-prepend">
                    <label class="input-group-text">密  码</label>
                </div>
                <input type="password" v-model="userPWD" class="form-control"/>
            </div>
            <div class="input-group col-md-6 justify-content-center">
                <input type="submit" value="登陆" class="btn btn-primary btn-lg" v-on:click="LoginPost;getName()" id="emit"/>
            </div>
        </div>
        <br/>
        <div>input,做参考用，实际版本应当删除<p>userName:{{ userName }}</p><p> password:{{ userPWD }}</p></div>
    </div>
</template>
<script>

    /* eslint-disable no-console */
    // var defaultData={username:"zhangsan",password:"123456"};
    import store from '@/store'
    export default ({
        name: 'LoginPage',
        store,
        data(){
            return {
                userName:"zhangsan",
                userPWD:"123456",
            }
        },
        methods:{
            LoginPost: function(){
                console.log("send request");
                console.log(this.userName+this.userPWD);
                // axios({
                this.$ajax({
                    method:'post',
                    url:"http://192.168.46.112:8080/login",
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    data: {
                        username: this.userName,
                        password: this.userPWD
                    }
                    // data:JSON.stringify(defaultData)
                })
                    .then(response => {
                        this.info = response;
                        console.log(this.info);
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log("catached");
                        console.log(error);
                    });
            },
        getName(){
                store.commit('transmit')
            }
        }
    })
</script>
<style scoped>

</style>
