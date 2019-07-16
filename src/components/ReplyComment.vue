<template>
    <div>
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1" id="on">{{replyUsername}}</h6>
                <small class="text-muted">
                    {{replyDate}}
                </small>
            </div>
            <p class="mb-1">
                {{replyComment}}
            </p>
        </a>
       
    </div>
</template>

<script>
    export default {
        name: "ReplyComment",
        props:{
            replyUsername:String,
            replyDate:String,
            replyComment:String,
        },
        // data(){
        //     return{
        //
        //     }
        //
        // },
        // methods:{
        //
        // }
    }
</script>

<style scoped>

</style>
