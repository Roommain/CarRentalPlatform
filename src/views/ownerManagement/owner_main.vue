<template>
    <div class="user-message">
        <div class="user-message-header utils-menu-header-style">
            <h2 class="user-header">
                <span>车主中心</span>
            </h2>
            <div class="user-menu-bar">
                <Menu
                    @on-select="selectMenu"
                    :active-name="activeName"
                    width="320px"
                >
                    <MenuItem name="/addownermanag"><Icon type="ios-car" />&nbsp;增加车辆</MenuItem>
                    <MenuItem name="/statemanagement"><Icon type="ios-card-outline" />&nbsp;车辆状态</MenuItem>
                </Menu>
            </div>
        </div>
        <div class="user-view">
            <h2 class="utils-view-header-style">
                {{$route.name}}
            </h2>
            <router-view class="user-main-view"></router-view>
        </div>
    </div>
</template>

<script>
import interlayer from '@/views/interlayer/interlayer'
export default {
    data() {
        return {
            activeName:'/addownermanag'
        };
    },
    created() {
        this.selectRouter();
    },
    methods: {
        /**
         * 跳转路由
         */
        selectMenu(name){
            if (!name) {
                return;
            }
            this.$router.push({path:name});
        },
        /**
         * 选择路由跳转
         */
        selectRouter() {
            this.activeName = this.$route.path;
        },
    },
    watch: {
        $route() {
            this.selectRouter();
        }
    }
};
</script>

<style lang="less">
.user-message {
    // width: 100%;
    // height: 100%;
    // border-top: 2px solid #5ab756;
    .user-header {
        padding-left: 30px;
        color: #26342e;
        font-size: 16px;
        height: 50px;
        // border-bottom: 1px solid #ddd;
        line-height: 50px;
    }
    .user-message-header {
        position: absolute;
        top: 100px;
        left: 0;
        width: 360px;
        height: calc(100vh - 101px);
        border-right: 1px solid #ddd;
        // background-color: #eff2f7;

        .user-menu-bar {
            height: calc(100vh - 150px);
            padding: 20px;
            overflow: auto;
        }
    }
    .utils-view-header-style {
        height: 50px;
        border-bottom: 2px solid #5ab756;
        line-height: 50px;
        font-size: 16px;
        color: #26342e;
    }
    .user-view {
        height: calc(100vh - 101px);
        margin-left: 360px;
        padding: 0 20px 0 40px;
        overflow: auto;
        background-color: #fff;

        .user-main-view {
            padding: 22px 0 22px 22px;
        }
    }
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    background-color: #5ab756;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #5ab756;
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #5ab756;
}
</style>

