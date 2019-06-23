<template>
    <div>
        <b-button v-b-modal.sign class="bg-light" style="color:#007bff;border:none;padding:0">登录</b-button>
        <b-modal id="sign">
            <header>
                <div>
                    <div class="sign-header">
                        <h1>
                            <span class="activ-title">登录</span>
                            <span class="">注册</span>
                        </h1>
                    </div>
                </div>
            </header>
        </b-modal>
    </div>

</template>

<script>
    export default {
        name: "Community.vue"
    }
</script>

<style scoped>

</style>
