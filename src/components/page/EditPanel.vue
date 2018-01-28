<template>
    <div class="edit-panel" :class="('theme-'+theme.activeId)+' '+(preview?'':'editMode')"
         :style="'background-image : url('+currThemeElement.background+');'">
        <div class="panel-label"></div>
        <el-input class="flipcard-title" :disabled="preview" v-model="flipCards.title"
                  :placeholder="preview?'':'点击此处输入标题'"></el-input>

        <el-row class="noselect clssify-mod">
            <el-col :span="12" v-for="(item,index) in flipCards.list" :key="item.id">
                <div
                    class="classify-container"
                    :style="'background-image : url('+currThemeElement.src+theme.activeId+'/type'+(index+1)+'.png);'">
                    <div class="title text-center">{{item.title}}</div>
                </div>
                <div class="clssify-addbox">
                    <div class="dis-table clssify-addbox-title">
                        <div class="dis-tab-cell label">
                            类别{{index+1}}：
                        </div>
                        <div class="dis-tab-cell">
                            <el-input
                                placeholder="单击输入类别名称"
                                v-model="item.title">
                            </el-input>
                        </div>
                    </div>

                    <div class="tag-textarea">
                        <span v-for="(tag,subIndex) in tags" :key="tag">
                            <el-tag
                                closable
                                size="small"
                                type="info"
                                :disable-transitions="false"
                                @close="tagclose(subIndex)"
                                disable-transitions>
                                {{tag}}
                            </el-tag>

                        </span>
                        <el-input :maxlength="6"></el-input>
                        <div class="input-placeholder" v-show="!tags.length">单击输入，按【回车键】添加，最多6个元素</div>
                    </div>
                    <div class="text-center">
                        <el-button size="mini" round>取消</el-button>
                        <el-button size="mini" round>确定</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>

        <div v-show="preview">
            <div class="card-backBtn noselect" @click="backToEdit" v-show="!screenshot">
                退出预览
            </div>
            <div class="card-againBtn noselect" @click="doitAgain"></div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapGetters} from 'vuex'

    export default {
        data: function () {
            return {
                tags: []
            }
        },
        computed: {
            ...mapGetters([
                'preview',
                'screenshot',
                'theme',
                'flipCards',
                'currThemeElement'
            ])
        },
        mounted() {
            const self = this;
            this.fillEditbox();
        },
        methods: {
            // 退出编辑，返回预览
            backToEdit() {
                const self = this;
                this.$store.commit('updateFlipCards', {type: 'flipAll'});
                this.$store.commit('viewPreview');
            },
            // 题型重新开始
            doitAgain() {
                this.$store.commit('updateFlipCards', {type: 'flipAll'});
            },
            // 关闭标签
            tagclose(index) {
                this.tags.splice(index, 1);
            },
            // 填充编辑框
            fillEditbox() {
                this.tags = this.flipCards.list[0].tags;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../styles/themeEdit";
    @import "../../styles/mixins";

    .clssify-mod {
        .el-col {
            position : relative;
        }
    }

    .classify-container {
        position : relative;
        width    : 248px;
        height   : 250px;
        margin   : 0 auto;
        background   : {
            size     : 100%;
            repeat   : no-repeat;
            position : center center;
        }
        cursor   : pointer;
        .title {
            position      : relative;
            top           : 70px;
            font-size     : 22px;
            font-weight   : bold;
            color         : #08455c;
            text-overflow : ellipsis;
            white-space   : nowrap;
            overflow      : hidden;
        }
    }

    .clssify-addbox {
        position      : absolute;
        left          : 50%;
        top           : 50%;
        width         : 280px;
        height        : 218px;
        margin-left   : -140px;
        margin-top    : -109px;
        background    : #f7f8fa;
        border-radius : 6px;
        padding       : 12px 20px;
        box-sizing    : border-box;
        z-index       : 99;
        .label {
            white-space : nowrap;
            font-size   : 12px;
        }
        .tag-textarea {
            margin-top       : 10px;
            height           : 100px;
            padding          : 0 10px;
            position         : relative;
            border           : 1px solid #ddd;
            background-color : #fff;
            .input-placeholder {
                @include stretch(20px, 0, false, 0);
                text-align : center;
                font-size  : 14px;
                color      : #999;
                padding    : 0 15px;
            }
        }
    }

    .clssify-addbox-title {
        width : 100%;
    }
</style>
<style lang="scss">
    @import "../../styles/mixins";
    @import "../../styles/editPanel";

    .tag-textarea {
        .el-tag {
            margin-right : 10px;
        }
        .el-input {
            width : 100px;
        }
        .el-input__inner {
            border     : none;
            background : none;
            padding    : 0;
        }
    }

    .clssify-addbox-title {
        width : 100%;
        input {
            line-height : 32px;
            height      : 32px;
        }
    }
</style>
