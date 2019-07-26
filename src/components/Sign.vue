<template>
    <div id="sign___BV_modal_outer_" style="position: absolute; z-index: 1040;">
        <div id="sign" role="dialog" tabindex="-1" class="modal fade show" aria-modal="true" style="display: block;">
            <div class="modal-dialog modal-md">
                <div role="document" id="sign___BV_modal_content_" aria-labelledby="sign___BV_modal_header_" aria-describedby="sign___BV_modal_body_" class="modal-content modal-style">
                    <header id="sign___BV_modal_header_" class="modal-header">
                        <h5 style="margin-bottom:0">
                            <a href="#" :class="{active_title:flag === 0}" class="btn btn-md title" role="button" aria-pressed="true" @click="signin_click()">登录</a>
                            <a href="#" :class="{active_title:flag ===1}" class="btn btn-md title" role="button" aria-pressed="true" @click="signup_click()">注册</a>
                        </h5>
                        <button type="button" aria-label="Close" class="close" @click="sign_close()">×</button>
                    </header>
                    <div id="sign___BV_modal_body_" class="modal-body">
                        <b-container fluid v-if="flag === 0">
                            <b-row class="my-2" style="align-items:center">
                                <b-col sm="12">
                                    <b-form-input
                                            id="name"
                                            v-model="name"
                                            aria-describedby="input-live-help input-live-feedback"
                                            placeholder="请输入用户名"
                                            class="input-box"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2" style="align-items:center">
                                <b-col sm="12">
                                    <b-form-input
                                            id="password"
                                            v-model="password"
                                            aria-describedby="input-live-help input-live-feedback"
                                            placeholder="请输入密码"
                                            class="input-box"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                        </b-container>
                        <b-container fluid v-if="flag === 1">
                            <b-row class="my-2" style="align-items:center">
                                <b-col sm="12">
                                    <b-form-input
                                            id="phone_num"
                                            v-model="phone_num"
                                            aria-describedby="input-live-help input-live-feedback"
                                            placeholder="请输入手机号"
                                            class="input-box"
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="my-2" style="align-items:center">
                                <b-col sm="7">
                                    <b-form-input
                                            id="verify_num"
                                            v-model="verify_num"
                                            aria-describedby="input-live-help input-live-feedback"
                                            placeholder="请输入验证码"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="5">
                                    <button class="btn-primary">发送验证码</button>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                    <footer id="sign___BV_modal_footer_" class="modal-footer" style="display:flex;flex-direction:row;align-items: center">
                        <div id="info" class="col-8" style="padding-left:20px;font-size:14px;">{{info}}</div>
                        <div class="col-4" style="">
                            <button  type="button" class="btn btn-primary" v-if="flag === 0" @click="signin_comfirm($event)">登录</button>
                            <button  type="button" class="btn btn-primary" v-if="flag === 1" @click="signup_comfirm($event)">注册</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
        <div tabindex="0"></div>
        <div id="sign___BV_modal_backdrop_" class="modal-backdrop"></div>
    </div>
</template>

<script>
    export default {
        name: "sign",
        data: function(){
            return{
                name:"",
                password:"",
                phone_num:null,
                verify_num:null,
                info:null,
                flag:this.$parent.$data.sign_flag,
            }
        },
        methods:{
            signin_click(){
                this.flag = 0;
            },
            signup_click(){
                this.flag = 1;
            },
            sign_close(){
                this.$parent.$data.show_sign = false;
            },
            signin_comfirm(e){
                if(this.name == ""){
                    this.info="请输入用户名";
                    console.log("lack of username in signin")
                }
                else if(this.password == ""){
                    this.info="请输入密码";
                    console.log("lack of password in signin")
                }
                else if(this.$store.state.sign_status == true){   //判断是否登录成功，若已经成功，则防止再次向服务器发送登录请求
                    var item = document.getElementById('info');
                    item.style.color="#d13811"
                    this.info="请勿重复登陆！";
                    console.log("repeated signins")
                }
                else{                                         //向服务器发送登录请求
                    console.log("in singnin_comfirm");
                    var current_btn = e.target;
                    current_btn.disabled = true;
                    this.$ajax({
                        method:'post',
                        url:'http://106.15.192.168/login',
                        header:{"content-type":"application/json"},//;jwt-token:
                        data:{
                            username:this.name,
                            password:this.password,
                        }
                    }).then((response)=>{
                        current_btn.disabled = false;
                        var infoHtml = document.getElementById('info');
                        if(response.data.status === 0)
                        {                                               //登录成功，则在store中添加登录成功状态，用户名，以及token
                            this.$store.state.sign_status=true;
                            this.$store.state.user_name = this.name;
                            this.$store.state.token = response.headers.token;
                            infoHtml.style.color="#51d131";
                            this.info="登录成功！";
                            console.log(this.name+"登录成功");

                        }
                        else{                                         //若登录失败，则打印失败信息
                            infoHtml.style.color="#d13811"
                            this.info=response.data;
                            console.log(response.data + "in signin")
                        }
                        console.log(response)
                    })
                }
            },
            signup_comfirm(){
                this.$ajax({
                     method:'post',
                    url:'',
                    data:{
                        phone_num:this.phone_num,
                        verify_num:this.verify_num,
                    }
                }).then((response)=>{
                        console.log(response)
                    })
            }
        }
    }
</script>

<style scoped>
    .modal-style{
        position: fixed;
        background: #fff;
        /*z-index: 100000;*/
        width: 384px;
        padding-top: 10px;
        padding-bottom: 10px;
        left: 50%;
        top: 50%;
        margin: -192px 0 0 -192px;
        box-shadow: 0 12px 24px 0 rgba(28,31,33,.1);
        border-radius: 12px;
    }
    .modal-header{
        font-size: 16px;
        line-height: 49px;
        font-weight: 700;
        height: 49px;
        padding-top:0;
        padding-bottom:0;
    }
    .title{
        border:none;
        background:#ffffff;
        color:#787d82;
        margin-right:5px;
        box-shadow:none;
        outline:none;
        border-color:transparent;
    }
    .active_title{
        background:#f8f9fa;
        color:#007bff;
    }
    .close{
        padding:0;
    }

</style>
