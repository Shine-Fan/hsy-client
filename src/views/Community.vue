<template>
    <div style="display:flex;align-content:center;justify-content:center;flex-direction: column;">
        <div class="row" style="display:flex;justify-content: center">
            <h3 class="mt-3 pb-3 font-italic border-bottom">
                交流社群
            </h3>
        </div>
        <div style="display:flex;justify-content: center;align-items:center;flex-direction: column;">
            <div class="mt-3" style="display: flex;align-content: center;width: 1000px;border-bottom: 1px solid #edf1f2;font-size: 18px;">
                <span >分类：</span>
                <div style="display: flex;">
                    <ul style="display:flex;padding-left:30px;">
                        <li class="item-box" :class="{'active':index == flag1}" v-for="(item,index) in classname1" :key="index" @click="click_classname1(index)">
                            <a href="#">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-3" style="display: flex;align-content: center;width: 1000px;border-bottom: 1px solid #edf1f2;font-size: 18px;">
                <span >方向：</span>
                <div style="display: flex;">
                    <ul style="display:flex;padding-left:30px;">
                        <li class="item-box" :class="{'active':index == flag2}" v-for="(item,index) in classname2[flag1]" :key="index" @click="click_classname2(index)">
                            <a href="#">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="(flag1===0) & (flag2 != 2) " class="mt-3" style="display: flex;align-content: center;width: 1000px;border-bottom: 1px solid #edf1f2;font-size: 18px;">
                <span >类别：</span>
                <div style="display: flex;">
                    <ul style="display:flex;padding-left:30px;">
                        <li class="item-box" :class="{'active':index == flag3}" v-for="(item,index) in classname3" :key="index" @click="click_classname3(index)">
                            <a href="#">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-3" style="display: flex;align-content: center;width: 1000px;border-bottom: 1px solid #edf1f2;font-size: 18px;">
                <span >热度：</span>
                <div style="display: flex;">
                    <ul style="display:flex;padding-left:30px;">
                        <li class="item-box" :class="{'active':index == flag4}" v-for="(item,index) in classname4" :key="index" @click="click_classname4(index)">
                            <a href="#">{{item}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-4">
                <b-card-group columns style="width:1000px;">
                    <b-card v-for="n in 9" title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
                        <b-card-text>
                            This is a wider card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                        </b-card-text>
                        <div slot="footer" style="display:flex;justify-content: flex-end"><button class="btn-primary">详情>></button></div>
                    </b-card>
                </b-card-group>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100px;font-size:18px;background-color:rgba(233, 235, 250, 0.49);margin-top:30px;">
                <div style="display:flex;width:1000px;justify-content: space-around;">
                    <div>
                        <a href="#">社群申请</a>
                    </div>
                    <div>
                        <a href="#">说明帮助</a>
                    </div>
                    <div>
                        <a href="#">投诉建议</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Community.vue",
        data:function(){
            return{
                flag1:0,
                flag2:0,
                flag3:0,
                flag4:0,
                classname1:["农技交流","行情交流","农资产品"],
                classname2:[["病害","虫害","草害"],["粮食","经济作物","其他作物"],["机械","农药","化肥","种子","真假辨识"]],
                classname3:["蔬菜","果树","大田作物","药用植物","林木及草坪"],
                classname4:["全部","热门付费","便民免费"],

            }
        },
        methods:{
            click_classname1(index){
                this.flag1 = index;
            },
            click_classname2(index){
                this.flag2 = index;
            },
            click_classname3(index){
                this.flag3 = index;
            },
            click_classname4(index){
                this.flag4 = index;
            }
        }
    }
</script>

<style scoped>
    .active{
        background-color: rgba(233, 235, 250, 0.49);
    }
    .item-box{
        list-style: none;
        margin-right:30px;
    }
</style>
