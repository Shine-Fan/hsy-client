<template>
    <div style="width:auto;padding:10px 5px;font-weight: bold;">
        <ul style="list-style: none;font-size:16px;padding-left:0px;">
            <li v-for="(item, index) in menu" :key="index" style="margin-bottom:10px;white-space: nowrap" >
                <b-link style="color:black;white-space: nowrap;" @click="item_click(item.section.id)">{{item.section.name}}</b-link><b-link><i  v-if="item.childs" class="fa fa-angle-double-right arrow_style" @click="arrow_click($event,item.childs)" style="margin-left:6px;"></i></b-link>
            </li>
        </ul>
    </div>


</template>

<script>
    import route from "../router.js"
    import store from "../store.js"

    function click_item(id){
        var data = find_title(id,store.state.menu);
        route.push({name:'specicommunity',params:{id:id},query:{data:data}})
    }
    function arrow($event,list){
        if($event.target.parentNode.parentNode.childNodes.length === 3)
        {
            var removeNode = $event.target.parentNode.parentNode.removeChild($event.target.parentNode.parentNode.childNodes[2]);
            removeNode = null;
        }
        else{
            // console.log(this);
            var ul=document.createElement("ul");
            ul.style.listStyle="none";
            for(let i=0;i<list.length;i++){
                var li=document.createElement("li");
                li.style.whiteSpace="nowrap"
                var a=document.createElement("a");
                a.target="_self";
                a.href="javascript:void(0)";
                a.style.color="black";
                a.style.whiteSpace="nowrap"
                a.onclick=function(){
                    click_item(list[i].section.id)
                }
                a.append(list[i].section.name);
                li.appendChild(a);
                if(list[i].childs){
                    var b=document.createElement("a");
                    var icon=document.createElement("i");
                    b.target="_self";
                    b.href="javascript:void(0)";
                    icon.className="fa fa-angle-double-right arrow_style";
                    icon.style.marginLeft="3px";
                    icon.onclick = function(e){
                        arrow(e,list[i].childs);
                    };
                    b.append(icon);
                    li.appendChild(b);
                }
                ul.appendChild(li);
            }
            $event.target.parentNode.parentNode.appendChild(ul);
        }
    }
    export default {
        name: "extensibleList.vue",
        props:{
          menu:Array,
        },
        data: function(){
            return {
                id:0,
            }
        },
        created:function(){
          this.$store.state.menu = this.menu;
          // console.log(this.$store.state.menu);
        },
        methods:{
            item_click:function(id){
                var data = find_title(id,this.menu);
                this.$router.push({name:'specicommunity',params:{id:id},query:{data:data}})
            },
            arrow_click:function($event,data){
                arrow($event,data)
            }
        }
    }

    function find_title(id,tree){
        var index=[];
        var flag=[];
        flag[0]=0;
        function inner(id,tree,index,flag){
            for(let i=0;i<tree.length;i++){
                index.push(i);
                if(tree[i].section.id==id)
                {
                    flag[0]=1;
                    // console.log(i)
                    break;
                }
                if(tree[i].childs){
                    index = inner(id,tree[i].childs,index,flag);
                }
                if(flag[0] == 1 ){
                    // console.log(flag)
                    break;
                }
                else{
                    index.pop();
                }
            }
            return index;
        }
        inner(id,tree,index,flag);
        var title=[];
        var temp = tree;
        for(let i=0;i<index.length;i++){
            title.push({name:temp[index[i]].section.name,id:temp[index[i]].section.id});
            temp = temp[index[i]].childs;
        }
        return title;
    }

</script>

<style>
    b-link.arrow_style :hover{
        color:red;
    }
</style>
