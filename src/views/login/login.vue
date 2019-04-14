<template>
    <div class="login">
        <div class="login-main">
            <Card class="card">
                <h1>登录</h1>
                <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <FormItem prop="telPhone">
                        <Input type="text" size="large" v-model="formInline.telPhone" placeholder="手机号码或邮箱" style="width: 300px">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" size="large" v-model="formInline.password" placeholder="密码" style="width: 300px">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <div class="login-memory-password">
                        <Checkbox @on-change="rememberValue" v-model="memoryPassword">&nbsp;&nbsp;记住密码</Checkbox>
                    </div>
                    <br>
                    <FormItem>
                        <Button class="login-button" type="primary" @click="handleSubmit('formInline')" style="width: 300px">登录</Button>
                    </FormItem>
                    <div class="login-register">
                        <router-link class="orget-the-password" to="findPassword" tag="span">忘记密码</router-link>
                        <router-link class="quick-registration" to="register" tag="span">快速注册</router-link>
                    </div>
                </Form>
            </Card>   
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import interlayer from '@/views/interlayer/interlayer'
export default {
    data() {
        const valphone = (rule, value, callback) => {
            if (/^1[3-9]\d{9}$/.test(value)) {
                callback();
            } else if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                callback();
            } else {
                callback(new Error('请正确输入手机或邮箱'));
            }
        };
        return {
            localStorageMemory: '',
            memoryPassword: false, //记住密码
            userName:'',
            token: 1,
            formInline: {
                telPhone: '',
                password: ''
            },
            ruleInline: {
                telPhone: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator: valphone, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请正确输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        };
    },
    created(){
        this.getlocalStorage();
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.rememberValue();
                    const params = {
                        telOrEmail : this.formInline.telPhone,
                        password : this.formInline.password
                    };
                    this.$axios
                        .post('api/user/login',params)
                        .then(data => {
                            if (data.data.code == 200) {
                                this.userName = data.data.data.userName;
                                this.$cookie.set('userName',this.userName);
                                // this.$cookie.set('isAdmin',data.data.data.isAdmin);
                                // this.$cookie.set('token',this.token);
                                // this.closeLogin();
                                interlayer.$emit('active',this.userName);
                                this.$router.push({name: '首页'});
                            }else {
                                this.$Message.error(data.data.msg);
                            }
                        }).catch(() => {
                            this.$Message.error('登录失败');
                            return;
                        });
                } else {
                    this.$Message.error('账号输入有误');
                }
            })
        },
        registerSubmit () {

        },
        findPassword () {

        },
        closeLogin () {

        },
        /**
         * 记住密码
         */
        rememberValue(value){
            if(this.memoryPassword == true) {
                localStorage.setItem('telPhone',this.formInline.telPhone);
                localStorage.setItem('password',this.formInline.password);
                localStorage.setItem('memoryPassword','true');
            }else {
                localStorage.setItem('password','');
                localStorage.setItem('memoryPassword','false');
            }
        },
        /**
         * 获取记住的账号密码
         */
        getlocalStorage () {
            var num = localStorage.getItem('telPhone');
            if(num != 'null') {
                this.formInline.telPhone = num;
            }
            var pas = localStorage.getItem('password');
            if(pas != 'null') {
                this.formInline.password = pas;
            }
            this.localStorageMemory = localStorage.getItem('memoryPassword');
            if (this.localStorageMemory == 'true') {
                this.memoryPassword = true;
            }else {
                this.memoryPassword = false;
            }
        },

    }

};
</script>


<style lang="less" scoped>
.login {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: fill;
    background-size: cover;
    // margin-top: 50px;
    background: url("../../assets/carimg/signup-back.a22bc70d.jpg");
    .card {
        position: fixed;
        left: 50%;
        top: 30%;
        margin-left: -200px;
        width: 400px;
        padding: 20px;
        h1 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .login-button {
            height: 40px;
            font-size: 16px;
        }
        .login-register {
            cursor: pointer;
        }
        .orget-the-password:hover {
            color: rgb(45, 140, 240);
        }
        .quick-registration:hover {
            color: rgb(45, 140, 240);
        }
    }

}
</style>

