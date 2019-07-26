<template>
    <div style="display:flex;flex-direction:column; align-items:center;margin-top:20px;">
        <div style="display:flex;flex-direction:column;align-items: flex-start;width:80%;font-size:16px;margin-bottom:10px">
            <div style="width:100%;margin-bottom:15px;font-weight: bold;">文章类别：<input style="width:90%;margin-left:1%;border:1px solid #9c9fa7;border-radius:3px;color:#ccb7b7;" :value="type_name" readonly></div>
            <div style="width:100%;margin-bottom:15px;font-weight: bold;">文章标题：<input style="width:90%;margin-left:1%;border:1px solid #9c9fa7;border-radius:3px;" :model="title"></div>
            <div style="width:100%;display:flex;flex-direction: row;">
                <div style="width:9%;margin-bottom:15px;font-weight: bold;margin-right:0px">阅读权限：</div>
                <b-form-checkbox-group
                        id="checkbox-group-1"
                        v-model="selected"
                        :options="reader_level"
                        name="flavour-1"
                ></b-form-checkbox-group>
            </div>
        </div>
<!--        <div id="editormenu"></div>-->
        <div id="editorarea" style="width:65%;margin-bottom:20px;margin-bottom:20px;"></div>
        <div >
            <button @click="publish">发布文章</button>
        </div>
        <div style="width:70%" v-html="editorContent">{{editorContent}}</div>
    </div>


</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "editArticle",
        data:function(){
            return{
                title:null,
                type:Array,
                type_name:null,
                reader_level:[
                    {text:"青铜用户",value:0},
                    {text:"白银用户",value:1},
                    {text:"黄金用户",value:2},
                    {text:"铂金用户",value:3},
                    {text:"钻石用户",value:4},
                ],
                editorContent:null,

            }
        },
        created:function(){
            this.type = this.$route.query.type;
            var name="";
            for(let i=0;i<this.type.length;i++){
                name=name+this.type[i].name+"/";
            }
            this.type_name=name;
            console.log(this.type_name);
        },
        mounted:function(){
            var editor = new E('#editorarea');
            editor.customConfig.onchange=(html)=>{
                this.editorContent=html
            }
            // editor.customConfig.uploadImgServer = '/upload'
            editor.create();
        },
        methods:{
            publish:function(){
               console.log(this.editorContent)
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
