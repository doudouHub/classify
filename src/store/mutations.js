export const mutations = {
    // 显示接收题目弹窗
    changeTheme(state, data) {
        state.theme.activeId = data;
    },
    // 打开预览
    viewPreview(state, data) {
        state.preview = !state.preview;
        if (data === 'screenshot') {
            // 开启截屏模式
            state.screenshot = true;
        }
    },
    // 切换上传模式
    changeUploadMode(state, data) {
        state.currUploadMode = data;
    },

    // 更新上传内容
    updateUploadContent(state, data) {
        state.currUploadContent = data;
    },
    // 更新主题元素
    updateCurImgElement(state, data) {
        state.currThemeElement = data;
    },
    // 更新卡片
    updateFlipCards(state, data) {
        switch (data.type) {
            case 'drop':
                // 拖拽松手
                state.flipCards.list[data.index][data.state].img = document.getElementById(data.data).getAttribute('src');
                break;
        }
    },
    // 更新放大预览图片
    updateImgView(state, data) {
        state.imgView.state = data.state;
        state.imgView.src = '';
        setTimeout(function () {
            state.imgView.src = data.src;
        }, 100)
    },
    // 回到编辑模式
    editModeAgain(state) {
        state.editAgain = true;
    }
};
