<template>
    <div class="login">
        <div class="login-main">
            <Card class="card">
                <Breadcrumb class="breadcrumb">
                    <BreadcrumbItem to="/login">登录</BreadcrumbItem>
                    <BreadcrumbItem to="/register">快速注册</BreadcrumbItem>
                </Breadcrumb>
                <Form class="form" ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <FormItem prop="telPhone">
                        <Input size="large" v-model="formValidate.telPhone" :maxlength="11" placeholder="请输入你的手机号码"></Input>
                    </FormItem>
                    <FormItem prop="email">
                        <Input size="large" v-model="formValidate.email" placeholder="请输入你的邮箱"></Input>
                    </FormItem>                    
                    <FormItem prop="password">
                        <Input type="password" size="large" v-model="formValidate.password" placeholder="请输入你的密码"></Input>
                    </FormItem>                      
                    <FormItem prop="verify" class="pas">
                        <Input size="large" v-model="formValidate.verify" placeholder="请输入短信验证码"></Input>
                        <span v-show="show" class="verify" @click="getVerify">获取验证码</span>
                        <span v-show="!show" class="verify">重新获取 {{count}} S</span>
                    </FormItem> 
                    <FormItem>
                        <Button class="register-button" type="primary" @click="handleSubmit('formValidate')" style="width: 100%;height: 45px;">快速注册</Button>
                    </FormItem>
                </Form>
            </Card>   
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
export default {
    data() {
        const valphone = (rule, value, callback) => {
            if (!/^1[3-9]\d{9}$/.test(value)) {
                callback(new Error('请正确输入电话号码'));
            } else {
                callback();
            }
        };
        return {
                show: true,
                count: '',
                timer: null,
                emailData: [],
                time3: new Date(),
                formValidate: {
                    telPhone: '',
                    verify: '',
                    email: '',
                    password: ''
            },
            ruleValidate: {
                    telPhone: [
                        { required: true, message: '请输入你的手机号码', trigger: 'blur' },
                        { validator: valphone, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入你的邮箱', trigger: 'blur' },
                        { type: 'email', message: '请正确输入邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入你的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    verify: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '验证码格式错误', trigger: 'blur' }
                    ],
            }
        }
    },
    created(){
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const params = {
                        telPhone: this.formValidate.telPhone,
                        captcha: this.formValidate.verify,
                        email: this.formValidate.email,
                        password: this.formValidate.password,
                    };
                    this.$axios
                        .post('api/user/register',params)
                        .then(data => {
                            if (data.data.code == 200) {
                                this.$Message.success(data.data.msg);
                                this.$router.push({name: '登录'});
                            }else {
                                this.$Message.error(data.data.msg);
                            }
                        }).catch(() => {
                            this.$Message.error('登录失败');
                            return;
                        });
                }
            })
        },
        getVerify () {
            if (/^1[3-9]\d{9}$/.test(this.formValidate.telPhone)) {
                const params = {
                    telPhone : this.formValidate.telPhone,
                };
                this.$axios
                    .post('api/user/getCaptcha',params)
                    .then(data => {
                        if (data.data.code == 200) {
                            this.$Message.success(data.data.msg);
                            this.getTime();
                        }else {
                            this.$Message.error(data.data.msg);
                        }
                    }).catch(() => {
                        this.$Message.error('发送失败');
                        return;
                    });
            }else {
                this.$Message.error('请正确输入手机号码');
            }
        },
        //获取倒计时
        getTime () {
            const TIME_COUNT = 60;
            if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        }
    }
};
</script>


<style lang="less" scoped>
.login {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: fill;
    // margin-top: 50px;
    background: url("../../assets/carimg/signup-back.a22bc70d.jpg");
    background-size: cover;
    .breadcrumb {
        margin-bottom: 20px;
    }
    .card {
        position: fixed;
        left: 50%;
        top: 30%;
        margin-left: -200px;
        width: 360px;
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
        .pas {
            position: relative;
            .verify {
                position: absolute;
                top: 3px;
                right: 20px;
                cursor: pointer;
                color: rgb(45, 140, 240);
            }
        }
    }

}
</style>

