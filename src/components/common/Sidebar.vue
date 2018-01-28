<template>
    <div class="sidebar">
        <!--  侧边内容  -->
        <div class="text-center side-label">主题</div>
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

