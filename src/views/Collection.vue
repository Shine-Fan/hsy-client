<template>
<div class="Collection">
    <div>这是个人收藏</div>
    <button @click="Commentget">123</button>
    <button @click="gett">1234</button>
</div>
</template>
<script>
export default {
   name:'Collection',
   methods:{
            Commentget: function(){
                console.log("send request");
                console.log(1);
                // axios({
                this.$ajax({
                    method:'post',
                    url:'http://106.15.192.168/login',
                    header:{"content-type":"application/json"},
                    data:{
                        username:"zhangsan",
                        password:"123456",

                    }
                }).then((response)=>{
                    console.log(response)
                    this.$store.state.token=response.headers.token;
                    console.log(response.headers.token)

                })
                console.log(this.$store.state.token)
            },
            gett:function(){
                this.$ajax({
                    method:'get',
                    url:'http://106.15.192.168/personal/find_collection',
                    headers: {'content-type': 'application/json','token':`${this.$store.state.token}`},
                    // data:JSON.stringify(defaultData)
                })
                    .then((response) => {
                        
                        console.log(response);
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

</style>
