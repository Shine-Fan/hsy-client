<template>
<div class="PIM">
    <div class="title1" >个人信息管理</div>
    <div class="">密码</div><input type="text" v-model="Password" class="personal"/>
    <div class="">微信号</div><input type="text" v-model="Wechat" class="personal"/>
    <div class="">QQ号</div><input type="text" v-model="Qq" class="personal"/>
    <div class="">支付宝账号</div><input type="text" v-model="Alipay" class="personal"/>
    <div class="">银行卡号</div><input type="text" v-model="BankCard" class="personal"/>
    <div class="">邮箱</div><input type="text" v-model="Email" class="personal"/>
    <div class="">手机号</div><input type="text" v-model="Phone" class="personal"/>
    <div class="">性别</div><input type="text" v-model="Sex" class="personal"/>
    <div class="">生日</div><input type="text" v-model="Birthday" class="personal"/>
    <div class="">地址</div><input type="text" v-model="Address" class="personal"/>
    <button v-on:click="PIMpost">修改</button>

</div>
</template>
<script>
 export default {
        name: 'PIM',
        data(){
            return {
                Password:"abc",
                Wechat:"def",
                Qq:"123",
                Alipay:"ghi",
                BankCard:"456",
                Email:"jkl",
                Phone:"789",
                Sex:"mno",
                Birthday:"0",
                Address:"pqr"
            }
        },
        methods:{
            PIMpost: function(){
                console.log("send request");
                console.log(1);
                // axios({
                this.$ajax({
                    method:'post',
                    url:"http://192.168.46.112:8080/personal/revise_info",
                    headers: {'content-type': 'application/json'},
                    data: {
                        password:this.Password,
                        wechat:this.Wechat,
                        qq:this.Qq,
                        alipay:this.Alipay,
                        bankCard:this.BankCard,
                        email:this.Email,
                        phone:this.Phone,
                        sex:this.Sex,
                        birthday:this.Birthday,
                        address:this.Address
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
            }
        }
    }
</script>
<style scoped>
.title1{
    font-size: 20px
}
</style>