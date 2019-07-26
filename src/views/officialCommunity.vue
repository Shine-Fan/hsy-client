<template>
    <div style="display:flex;align-items:center;justify-content:center;flex-direction: column;margin-top:20px;">
        <div style="display:flex;justify-content: center;flex-direction: column;width:1000px;margin-bottom: 20px;">
            <div style="display:flex;align-items:center;;border-left:5px solid #10afef;height:44px;border-bottom: 1px solid #b6b6b7">
                <h4 style="margin-left:10px;margin-right:770px">官方交流社群</h4>
            </div>
            <div style="display:flex;">
                <div class="col-3" style="overflow-x:scroll" >
                    <extensibleList :menu="menu"></extensibleList>
                </div>
                <div class="col-9" style="display:flex;justify-items:center;width:600px;margin-left:20px;">
                    <article-media :articleList="articleList"></article-media>
                </div>
            </div>
        </div>
        <div style="width:100%">
            <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100px;font-size:18px;background-color:rgba(233, 235, 250, 0.49);margin-top:30px;">
                <div style="display:flex;width:1000px;justify-content: space-around;">
                    <div>
                        <i class="fa fa-group" style="font-size:25px;margin-right:10px;color:#42b983;"></i>
                        <b-link style="color:black">社群申请</b-link>
                    </div>
                    <div>
                        <i class="fa fa-book" style="font-size:25px;margin-right:10px;color:#10afef"></i>
                        <b-link style="color:black">说明帮助</b-link>
                    </div>
                    <div>
                        <i class="fa fa-envelope" style="font-size:25px;margin-right:10px;color:#fcfe2b"></i>
                        <b-link style="color:black">投诉建议</b-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import articleMedia from "../components/articleListMedia.vue"
    import extensibleList from "../components/extensibleList.vue"
    export default {
        name: "Community.vue",
        components:{
            articleMedia,
            extensibleList,
        },
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
                menu:[
                    {
                        section: {
                            name: "农技交流",
                            id: "1",
                        },
                        childs:[
                            {
                                section: {
                                    name: "病害",
                                    id: "11",
                                },
                                childs:[
                                    {
                                        section: {
                                            name:"蔬菜",
                                            id: "111",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"果树",
                                            id: "112",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"大田作物",
                                            id: "113",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"药用植物",
                                            id: "114",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"林木及草坪",
                                            id: "115",
                                        },
                                        childs:[
                                            {
                                                section: {
                                                    name:"蔬菜",
                                                    id: "1151",
                                                },
                                            },
                                            {
                                                section: {
                                                    name:"果树",
                                                    id: "1152",
                                                },
                                            },
                                            {
                                                section: {
                                                    name:"大田作物",
                                                    id: "1153",
                                                },
                                            },
                                            {
                                                section: {
                                                    name:"药用植物",
                                                    id: "1154",
                                                },
                                            },
                                            {
                                                section: {
                                                    name:"林木及草坪",
                                                    id: "1155",
                                                },
                                                childs:[
                                                    {
                                                        section: {
                                                            name:"蔬菜",
                                                            id: "11551",
                                                        },
                                                    },
                                                    {
                                                        section: {
                                                            name:"果树",
                                                            id: "11552",
                                                        },
                                                    },
                                                    {
                                                        section: {
                                                            name:"大田作物",
                                                            id: "11553",
                                                        },
                                                    },
                                                    {
                                                        section: {
                                                            name:"药用植物",
                                                            id: "11554",
                                                        },
                                                    },
                                                    {
                                                        section: {
                                                            name:"林木及草坪",
                                                            id: "11555",
                                                        },
                                                        childs:[
                                                            {
                                                                section: {
                                                                    name:"蔬菜",
                                                                    id: "115551",
                                                                },
                                                            },
                                                            {
                                                                section: {
                                                                    name:"果树",
                                                                    id: "115552",
                                                                },
                                                            },
                                                            {
                                                                section: {
                                                                    name:"大田作物",
                                                                    id: "115553",
                                                                },
                                                            },
                                                            {
                                                                section: {
                                                                    name:"药用植物",
                                                                    id: "115554",
                                                                },
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                section: {
                                    name:"虫害",
                                    id: "12",
                                },
                                childs:[
                                    {
                                        section: {
                                            name:"蔬菜",
                                            id: "121",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"果树",
                                            id: "122",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"大田作物",
                                            id: "123",
                                        },
                                    },
                                    {
                                        section: {
                                            name:"药用植物",
                                            id: "124",
                                        },
                                    },
                                ]
                            },
                            {
                                section: {
                                    name:"草害",
                                    id: "13",
                                },
                            },
                        ]
                    },
                    {
                        section: {
                            name:"行情交流",
                            id: "2",
                        },
                        childs:[
                            {
                                section: {
                                    name:"粮食",
                                    id: "21",
                                },
                            },
                            {
                                section: {
                                    name:"经济作物",
                                    id: "22",
                                },
                            },
                            {
                                section: {
                                    name:"其他作物",
                                    id: "23",
                                },
                            },
                        ]
                    },
                    {
                        section: {
                            name:"农资产品",
                            id: "3",
                        },
                        childs:[
                            {
                                section: {
                                    name:"机械",
                                    id: "31",
                                },
                            },
                            {
                                section: {
                                    name:"农药",
                                    id: "32",
                                },
                            },
                            {
                                section: {
                                    name:"化肥",
                                    id: "33",
                                },
                            },
                            {
                                section: {
                                    name:"种子",
                                    id: "34",
                                },
                            },
                            {
                                section: {
                                    name:"真假辨识",
                                    id: "35",
                                },
                            },
                        ]
                    },
                ],
                articleList:[
                    {
                        id:'1',
                        title:"First Article",
                        com_img:"https://picsum.photos/1024/480/?image=10",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'2',
                        title:"Second Article",
                        com_img:"https://picsum.photos/1024/480/?image=102",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'3',
                        title:"Third Article",
                        com_img:"https://picsum.photos/1024/480/?image=120",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    },
                    {
                        id:'4',
                        title:"Fourth Community",
                        com_img:"https://picsum.photos/1024/480/?image=85",
                        com_intro:"This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.",
                        author:"Shine",
                        mem_num:'1000+',
                    }
                ],
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" >

    .el-tree-node__label {
        font-size: 16px !important;
        color: #10afef;
        font-weight: bold;
    }
    el-tree-node{
        margin-bottom:10px;
    }

</style>
