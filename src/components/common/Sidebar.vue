<template>
    <div class="sidebar">
        <!--  侧边内容  -->
        <span slot="label"><i class="el-icon-menu"></i> 主题</span>
        <div class="theme-box">
            <!--  本地主题列表  -->
            <div class="theme-list-box">
                <ul class="theme-list list-none" :class="themeOpenState?'open':''">
                    <li class="theme-item" v-for="(item,index) in theme.list">
                        <div class="thumb-box"
                             :class="item.id===theme.activeId?'active':''"
                             @click="selectTheme(item.id)" :data-title="item.name"
                             :style="'background-image : url(./static/img/theme/theme' + item.id + '/bg-thumb.jpg);'"></div>
                    </li>
                </ul>
                <!--  伸缩主题列表按钮  -->
                <div class="theme-openBtn" @click="themeOpenState=!themeOpenState" v-if="theme.list.length>4">
                    <div class="icon-open"></div>
                </div>
            </div>
            <!--  编辑区域  -->
            <div class="edit-area">
                <h5>编辑</h5>
                <!--  背景编辑  -->
                <el-row class="edit-area-item">
                    <el-col :span="12">
                        <div class="img-box">
                            <img :src="currThemeElement.backgroundThumb" alt="">
                        </div>
                    </el-col>
                    <el-col :span="12" class="edit-area-right">
                        <div class="label">背景图片</div>
                        <el-button size="mini" icon="el-icon-plus" @click="selectLocalImg('background')">本地图片
                        </el-button>
                    </el-col>
                </el-row>
                <!--  元素编辑  -->
                <el-row class="edit-area-item">
                    <el-col :span="12">
                        <div class="img-box">
                            <img :src="currThemeElement.element" alt="">
                        </div>
                    </el-col>
                    <el-col :span="12" class="edit-area-right">
                        <div class="label">元素</div>
                        <el-button size="mini" icon="el-icon-plus" @click="selectLocalImg('element')">本地图片
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--<el-tabs class="imglib-tabs" :aria-index="activeName" v-model="activeName">-->
            <!--<el-tab-pane name="first" style="padding: 0 15px;">-->
                <!--<span slot="label"><i class="el-icon-picture"></i> 图片</span>-->
                <!--<div class="imglibs-tip" v-if="imglibsTip">-->
                    <!--* 图片可拖动到题目区域-->
                    <!--<div class="el-icon-close" @click="closeTip"></div>-->
                <!--</div>-->
                <!--<el-input class="imglibs-search" v-model="imgKeyword" placeholder="搜索关键词..."-->
                          <!--@keyup.enter.native="getNetImglib" clearable>-->
                    <!--<i slot="suffix" class="el-input__icon el-icon-search"></i>-->
                <!--</el-input>-->
                <!--<ul class="imglib-list list-none">-->
                    <!--<li class="imglib-item"-->
                        <!--v-for="(item,index) in imglib.list"-->
                        <!--:key="item.id"-->
                        <!--v-if="Math.ceil((index+1)/imglib.pageSize)===imglib.page"-->
                        <!--v-cloak>-->
                        <!--<div class="imglib-box"-->
                             <!--:class="item.id===imglib.activeId?'active':''"-->
                             <!--@click="viewImginBox(item.thumb,item.id)">-->
                            <!--<img :id="item.id" :src="item.thumb" alt="" draggable="true"-->
                                 <!--@dragstart="drag($event)">-->
                        <!--</div>-->
                    <!--</li>-->
                <!--</ul>-->
                <!--&lt;!&ndash;  没有图片的展示  &ndash;&gt;-->
                <!--<img class="imglib-nodata" src="../../../static/img/imglib-nodata.png" alt=""-->
                     <!--v-show="!imglib.list.length">-->
                <!--&lt;!&ndash;  图库分页跳转  &ndash;&gt;-->
                <!--<div class="img-pagination text-center" v-show="imglib.pageTotal">-->
                    <!--<i class="el-icon-caret-left page-btn" :class="imglib.page===1?'disabled':''"-->
                       <!--@click="handleCurrentChange('prev')"></i>-->
                    <!--<el-input-->
                        <!--:placeholder="inputFocus?'':placeholder"-->
                        <!--@focus="inputFocus=true"-->
                        <!--@blur="inputFocus=false"-->
                        <!--@keyup.enter.native="turnPage"-->
                        <!--:value="inputvalue"-->
                    <!--&gt;-->
                        <!--<i slot="suffix" class="icon-enter" v-show="inputFocus"></i>-->
                    <!--</el-input>-->
                    <!--<i class="el-icon-caret-right page-btn" :class="imglib.page===imglib.pageTotal?'disabled':''"-->
                       <!--@click="handleCurrentChange('next')"></i>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane name="second">-->
                <!--<span slot="label"><i class="el-icon-menu"></i> 主题</span>-->
                <!--<div class="theme-box">-->
                    <!--&lt;!&ndash;  本地主题列表  &ndash;&gt;-->
                    <!--<div class="theme-list-box">-->
                        <!--<ul class="theme-list list-none" :class="themeOpenState?'open':''">-->
                            <!--<li class="theme-item" v-for="(item,index) in theme.list">-->
                                <!--<div class="thumb-box"-->
                                     <!--:class="item.id===theme.activeId?'active':''"-->
                                     <!--@click="selectTheme(item.id)" :data-title="item.name"-->
                                     <!--:style="'background-image : url(./static/img/theme/theme' + item.id + '/bg-thumb.jpg);'"></div>-->
                            <!--</li>-->
                        <!--</ul>-->
                        <!--&lt;!&ndash;  伸缩主题列表按钮  &ndash;&gt;-->
                        <!--<div class="theme-openBtn" @click="themeOpenState=!themeOpenState" v-if="theme.list.length>4">-->
                            <!--<div class="icon-open"></div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;  编辑区域  &ndash;&gt;-->
                    <!--<div class="edit-area">-->
                        <!--<h5>编辑</h5>-->
                        <!--&lt;!&ndash;  背景编辑  &ndash;&gt;-->
                        <!--<el-row class="edit-area-item">-->
                            <!--<el-col :span="12">-->
                                <!--<div class="img-box">-->
                                    <!--<img :src="currThemeElement.backgroundThumb" alt="">-->
                                <!--</div>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12" class="edit-area-right">-->
                                <!--<div class="label">背景图片</div>-->
                                <!--<el-button size="mini" icon="el-icon-plus" @click="selectLocalImg('background')">本地图片-->
                                <!--</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--&lt;!&ndash;  元素编辑  &ndash;&gt;-->
                        <!--<el-row class="edit-area-item">-->
                            <!--<el-col :span="12">-->
                                <!--<div class="img-box">-->
                                    <!--<img :src="currThemeElement.element" alt="">-->
                                <!--</div>-->
                            <!--</el-col>-->
                            <!--<el-col :span="12" class="edit-area-right">-->
                                <!--<div class="label">元素</div>-->
                                <!--<el-button size="mini" icon="el-icon-plus" @click="selectLocalImg('element')">本地图片-->
                                <!--</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</el-tab-pane>-->
        <!--</el-tabs>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                themeOpenState: false, // 主题展开状态
                activeName: 'first',
                imgKeyword: '',
                // 网络图库
                imglib: {
                    activeId: 0,
                    pageSize: 12,
                    page: 1,
                    pageTotal: 0,
                    list: []
                },
                imglibsTip: true,
                inputFocus: false
            }
        },
        computed: {
            ...mapGetters([
                'theme',
                'currThemeElement'
            ]),
            placeholder() {
                return this.imglib.page + '/' + this.imglib.pageTotal;
            },
            inputvalue() {
                return this.inputFocus ? this.imglib.page : '';
            }
        },
        mounted() {
            this.imglibsTip = !sessionStorage.getItem('closetip');
        },
        methods: {
            // 切换主题
            selectTheme(id) {
                let currThemeElement = {
                    backgroundThumb: './static/img/theme/theme' + id + '/bg-thumb.jpg',
                    background: './static/img/theme/theme' + id + '/bg.jpg',
                    element: './static/img/theme/theme' + id + '/element.png'
                }
                this.$store.commit('changeTheme', id);
                // 更新当前主题元素
                this.$store.commit('updateCurImgElement', currThemeElement);
            },
            // 选择本地图片
            selectLocalImg(type) {
                this.$store.commit('changeUploadMode', type);
                // 调用C++方法选择本地文件
                this.$call_cplus('micro.cotroler', 'selectFile', 'single');
            }
        }
    }
</script>
<style lang='scss' scoped>
    @import "../../styles/sideBar";
</style>

