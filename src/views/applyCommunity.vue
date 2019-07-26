<template>
    <div style="display: flex;justify-content: center;font-size: 16px;">
        <el-tabs tab-position="left" style="margin-top:20px;width:80%;height:1000px">
            <el-tab-pane label="社群申请">
                <div style="display:flex;flex-direction:column;align-items:center;ajustify-content:center;width:90%">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="社群名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="社群类别">
                            <el-cascader
                                    id="type_options"
                                    style="width:300px;"
                                    :options="type_options"
                                    :props="{ checkStrictly: true}"
                                    v-model="form.communitytype"
                                    clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="群主名称" style="width:300px;">
                            <el-input v-model="form.owner_name"></el-input>
                        </el-form-item>
                        <el-form-item label="社群级别">
                            <el-radio-group v-model="form.rank">
                                <el-radio label="青铜"></el-radio>
                                <el-radio label="白银"></el-radio>
                                <el-radio label="黄金"></el-radio>
                                <el-radio label="铂金"></el-radio>
                                <el-radio label="钻石"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="社群图标">
                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :file-list="fileList"
                                    list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="社群公告" >
                            <el-input type="textarea" v-model="form.desc" maxlength="200" show-word-limit resize="none" rows=5></el-input>
                        </el-form-item>
                    </el-form>
                    <div style="display:flex;justify-content:space-around;margin-top:30px;width:30%;">
                        <button>提交申请</button>
                        <button>取消申请</button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="平台审核">
                <div style="width:80%;margin-left:30px;">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item v-for="(item,index) in procommunity" :key="index" :title="item.name" :name="index">
                            <el-steps :space="200" :active="item.process" finish-status="success" style="margin-top: 20px">
                                <el-step title="提交申请"></el-step>
                                <el-step title="官方审核"></el-step>
                                <el-step title="准许发布"></el-step>
                                <el-step title="创建完成"></el-step>
                            </el-steps>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我的社群">
                <div style="width:80%;margin-left:30px;">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item v-for="(item,index) in mycommunity" :key="index" :title="item.name" :name="index">
                            <el-button icon="el-icon-edit">编辑</el-button>
                            <el-button icon="el-icon-remove-outline">暂停</el-button>
                            <el-button icon="el-icon-share">发布</el-button>
                            <el-button icon="el-icon-delete">删除</el-button>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "applyCommunity",
        data() {
            return {
                form: {
                    name: '',
                    owner_name:'',
                    communitytype:'', //对应接口文档parent
                    rank:'',  //v-model绑定的是字符串，但是接口需要int型
                    desc: '',
                },
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
                type_options:Array,
                fileList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                procommunity:[
                    {
                        name:"申请社群一",
                        process:1,

                    },
                    {
                        name:"申请社群二",
                        process:3,
                    },
                    {
                        name:"申请社群三",
                        process:4,
                    },
                    {
                        name:"申请社群四",
                        process:2,
                    },
                ],
                mycommunity:[
                    {
                        name:"我的社群一",

                    },
                    {
                        name:"我的社群二",
                    },
                    {
                        name:"我的社群三",
                    },
                    {
                        name:"我的社群四",
                    },
                ],
            }
        },
        created:function(){
            function transform_tree(oldtree,newtree){
                for(let i=0;i<oldtree.length;i++){
                    var temp={};
                    temp.label = oldtree[i].section.name;
                    temp.value = oldtree[i].section.id;
                    if(oldtree[i].childs){
                        temp.children=[]
                        transform_tree(oldtree[i].childs,temp.children)
                    }
                    newtree.push(temp);
                }
                return newtree
            }
            var newtree=[];
            transform_tree(this.menu,newtree);
            this.type_options=newtree;
            // console.log(newtree);
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleChange(val) {
                console.log(val);
            },
        },
    }
</script>

<style lang="scss">
    @import "../../node_modules/element-ui/lib/theme-chalk/index.css";
    .el-tabs__item {
        font-size: 16px !important;
        font-weight:bold !important;
    }
    .el-form-item__label{
        font-size: 16px !important;

    }
    .el-collapse-item__header{
        height:80px !important;
        font-size:16px !important;
    }
</style>
