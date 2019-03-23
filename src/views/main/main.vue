<template>
  <div class="main">
    <el-container>
        <el-header class="header">
            <div class="main-logo">
              <img class="logo" src="@/assets/carimg/logo.png" alt=""><span class="logo-title">易行租车</span> 
            </div>
            <nav class="main-nav">
                <router-link tag="li" to="main">&nbsp;&nbsp;首页</router-link>
                <router-link tag="li" to="attention">&nbsp;&nbsp;短时租车</router-link>
                <router-link tag="li" to="weather">&nbsp;&nbsp;长时租车</router-link>
                <router-link tag="li" to="flightManage">&nbsp;&nbsp;成为车主</router-link>
                <router-link tag="li" to="flightManage">&nbsp;&nbsp;关于易行</router-link>
            </nav>
            <div class="main-user-message">
                <el-button type="primary" @click="logins">登录/注册</el-button>
                <!-- <Icon type="md-notifications" /> -->
                <!-- <Icon type="md-person" /> -->
                <!-- <Dropdown trigger="hover">
                    <a href="javascript:void(0)" @click="login">
                        {{userName || '登录/注册'}}
                        <Icon type="ios-arrow-down"/>
                    </a>
                    <DropdownMenu slot="list" v-show="logoutShow">
                        <DropdownItem>
                            <router-link to="userinfo" >我的信息</router-link>
                        </DropdownItem>
                        <DropdownItem>
                            <router-link to="changePassword">修改密码</router-link>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="logout">退出</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
            </div>
        </el-header>
    </el-container>
    <router-view class="main-iview"></router-view>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                // activeIndex: '1',
                // activeIndex2: '1'
            }
        },
        methods: {
            logins () {
                this.$router.push({name: '登录'});
            }
        }
  }
</script>

<style lang="less" scoped>
.main {

    height: 100%;
    li {
        list-style:none; 
    }
    .header {
        width: 100%;
        padding-right:30px;
        height: 100px;
        // background-color: #444c58;
        display: block;
        .main-logo {
            float: left;
            width: 360px;
            // padding: 0 51px;
            height: 100px;
            line-height: 100px;
            text-align: left;
            .logo {
                height: 70px;
                margin-top: 8px;
            }
            .logo-title {
              vertical-align: 30%;
              font-size: 16px;
            //   color: rgba(209, 209, 209, 1);
              
            }            
        }
        .main-nav {
            float: left;
            overflow: hidden;
            height: 100%;
            line-height: 100px;
            height: 100px;
            // margin-left: 50px;
            > li {
                height: 100%;
                // padding: 0 40px;
                // color: rgba(209, 209, 209, 1);
                float: left;
                font-size: 14px;
                width: 140px;
                cursor: pointer;
            }
            // > li:hover {
            //     color:white;
            // }
        }
        .main-user-message {
            float: right;
            // color: rgba(209, 209, 209, 1);
            height: 100%;
            line-height: 100px;
            .ivu-icon-md-person {
                float: left;
                height: 100%;
                line-height: 100px;
                padding-right: 10px;
                font-size: 18px;
                // color: rgba(209, 209, 209, 1);
                cursor: pointer;
            }
            .ivu-dropdown {
                text-align: center;
                font-weight: 600;
                height: 100%;
                float: left;
                .ivu-dropdown-rel {
                    > a {
                        height: 100%;
                        line-height: 100px;
                        display: block;
                        color: rgba(209, 209, 209, 1);
                    }
                }
                a {
                    color: #495060;
                }
            }
        }
    }
}
</style>
