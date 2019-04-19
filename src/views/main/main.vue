<template>
  <div class="main">
    <el-container>
        <el-header class="header" style="height: 100px;">
            <div class="main-logo">
              <img class="logo" src="@/assets/carimg/logo.png" alt=""><span class="logo-title">易行租车</span> 
            </div>
            <nav class="main-nav">
                <router-link tag="li" to="/home" active-class="active">&nbsp;&nbsp;首页</router-link>
                <router-link tag="li" to="/carRental">&nbsp;&nbsp;我要租车</router-link>
                <router-link tag="li" to="/owner">&nbsp;&nbsp;成为车主</router-link>
                <router-link tag="li" to="/addownermanag">&nbsp;&nbsp;车主管理</router-link>
                <router-link v-show="adminShow" tag="li" to="/ownercaraudit">&nbsp;&nbsp;后台管理</router-link>
            </nav>
            <div class="main-user-message">
                <el-button v-show="loginShow" type="primary" @click="logins">登录/注册</el-button>
                <span class="user" v-show="!loginShow" @click="userNameSub">用户{{userName}}，欢迎你</span>
            </div>
        </el-header>
    </el-container>
    <router-view class="main-iview"></router-view>
  </div>
</template>

<script>
import interlayer from '@/views/interlayer/interlayer'
    export default {
        data() {
            return {
                loginShow:true,
                userName:'',
                adminShow: false,
            }
        },
        created() {
            this.getUserName();
            interlayer.$on('active', item => {
            this.userName = item;
            this.getUserName();
            })
        },
        methods: {
            logins () {
                this.$router.push({name: '登录'});
            },
            /**
             * 获取cookie，用户昵称
             */
            getUserName () {
                this.userName = this.$cookie.get('userName') || '';
                this.isAdmin = this.$cookie.get('isAdmin') || '';
                if(this.userName != '') {
                    this.loginShow = false;
                }else {
                    this.loginShow = true;
                }
                if(this.isAdmin == '1'){
                    this.adminShow = true;
                }else {
                    this.adminShow = false;
                }
                // if (this.userName != '') {
                //     this.logoutShow = true;
                // }else {
                //     this.logoutShow = false;
                // }
            },
            userNameSub () {
                this.$router.push({name: '个人中心'});
            }
        }
  }
</script>

<style lang="less" scoped>
.main {

    height: 100%;
    .menu {
        position: relative;
        top: -100px;
    }
    li {
        list-style:none; 
    }
    .header {
        width: 100%;
        padding-right:30px;
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
                width: 130px;
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
            .user {
                cursor: pointer;
            }
            .user:hover {
                color: green;
            }
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
    .active {
        color: rgb(90, 183, 86);
    }
}
</style>
