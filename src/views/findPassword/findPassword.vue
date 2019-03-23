<template>
    <div class="find-password">
        <Card class="box">
            <Breadcrumb class="breadcrumb">
                <BreadcrumbItem to="/login">登录</BreadcrumbItem>
                <BreadcrumbItem to="/findPassword">找回密码</BreadcrumbItem>
            </Breadcrumb>
            <Steps :current=current direction="vertical">
                <Step title="步骤一" content="输入手机号码"></Step>
                <Step title="步骤二" content="输入验证码"></Step>
                <Step title="步骤三" content="请输入邮箱"></Step>
                <Step title="步骤四" content="完成，查看邮箱"></Step>
            </Steps>
            <div class="input-location">
                <!-- 手机号码 -->
                <Form class="form" ref="formInlinePhone" :model="formInlinePhone" :rules="ruleInlinePhone" v-show="phoneShow" inline>
                    <FormItem prop="telPhone">
                        <Input type="text" size="large" v-model="formInlinePhone.telPhone" :maxlength="11" placeholder="手机号码" style="width: 300px"></Input>
                    </FormItem>
                    <br>
                    <FormItem>
                        <Button class="phone-button" v-show="show" type="primary" @click="handlePhoneSubmit('formInlinePhone')" style="width: 300px;height: 44px">获取验证码</Button>
                        <Button class="phone-button" v-show="!show" type="primary" style="width: 300px;height: 44px">重新获取 {{count}} S</Button>
                    </FormItem>
                </Form>
                <!-- 验证码 -->
                <Form class="form" ref="formInlineValidation" :model="formInlineValidation" :rules="ruleInlineValidation" v-show="validationShow" inline>
                    <FormItem prop="validation">
                        <Input type="text" size="large" v-model="formInlineValidation.validation" placeholder="短信验证码" style="width: 300px"></Input>
                    </FormItem>
                    <br>
                    <FormItem>
                        <Button class="validation-button" type="primary" @click="handleValidationSubmit('formInlineValidation')" style="width: 300px;height: 44px">下一步</Button>
                    </FormItem>
                </Form>
                <!-- 邮箱 -->
                <Form class="form" ref="formInlineEmail" :model="formInlineEmail" :rules="ruleInlineEmail" v-show="emailShow" inline>
                    <FormItem prop="email">
                        <AutoComplete
                            v-model="formInlineEmail.email"
                            class="autocomplete"
                            @on-search="emailHandleSearch"
                            placeholder="请输入邮箱"
                            size="large"
                            style="width: 300px">
                            <Option v-for="item in emailData" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </FormItem>
                    <br>
                    <FormItem>
                        <Button class="email-button" type="primary" @click="handleEmailSubmit('formInlineEmail')" style="width: 300px;height: 44px">确认</Button>
                    </FormItem>
                </Form>
                <div class="hint" v-show="hintShow">
                    <p>{{hint}}</p>
                    <Button class="again-button" type="primary" v-show="againShow" @click="againSubmit()" style="width: 100px">点我重新输入</Button>
                    <Button class="again-button" type="primary" v-show="loginShow" @click="loginSubmit()" style="width: 100px">点我前往登录</Button>
                </div>                
            </div>

        </Card>
    </div>
</template>

<script>
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
            //显示
            show: true,
            count: '',
            timer: null,

            emailData: [],
            current:0,
            phoneShow: true,
            validationShow: false,
            emailShow: false,
            // gainShow: false,
            hintShow: false,
            againShow: false,
            loginShow: false,
            hint: '正在处理，请等待。。。',
            formInlinePhone: {
                telPhone: ''
            },
            formInlineValidation: {
                validation: ''
            },
            formInlineEmail: {
                email: ''
            },
            ruleInlinePhone: {
                telPhone: [
                    { required: true, message: '请输入你的手机号码', trigger: 'blur' },
                    { validator: valphone, trigger: 'change' }
                ],
            },
            ruleInlineValidation: {
                validation: [
                    { required: true, message: '请输入手机验证码', trigger: 'blur' },
                ],
            },
            ruleInlineEmail: {
                email: [
                    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
                    { type: 'email', message: '请正确输入邮箱', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        handlePhoneSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.getTime();
                    // this.current = 1;
                    const params = {
                        telPhone : this.formInlinePhone.telPhone,
                    };
                    this.$axios
                        .post('api/user/getCaptcha',params)
                        .then(data => {
                            if (data.data.code == 200) {
                                this.$Message.success(data.data.msg);
                                this.current = 1;
                            }else {
                                this.$Message.error(data.data.msg);
                            }
                        }).catch(() => {
                            this.$Message.error('发送失败');
                            return;
                        });
                }
            })
        },
        handleValidationSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.current = 2;
                }
            })
        },
        handleEmailSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.current = 3;
                    this.hintShow = true;
                    const params = {
                        telPhone: this.formInlinePhone.telPhone,
                        email: this.formInlineEmail.email,
                        captcha: this.formInlineValidation.validation,
                    }
                    this.$axios.post('api/user/findPassword',params)
                        .then(data => {
                            console.log(data);
                            if (data.data.msg == '找回密码成功，请到邮箱中查收') {
                                // this.$cookie.remove('userName');
                                // this.$cookie.remove('token');
                                this.hint = data.data.msg;
                                this.loginShow = true;
                            }else {
                                this.hint = data.data.msg;
                                this.againShow = true;
                            }
                        }).catch(() => {
                            this.$Message.error('找回失败');
                            this.againShow = true;
                            return;
                        });
                }
            })
        },
        againSubmit () {
            this.phoneShow = true;
            this.validationShow = false;
            this.emailShow = false;
            this.gainShow = false;
            this.hintShow = false;
            this.againShow = false;
            this.hint = '正在处理，请等待。。。';
            this.current = 0;
        },
        loginSubmit () {
            this.$router.push({name: '登录'});
        },
        emailHandleSearch (value) {
            this.emailData = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@foxmail.com',
                value + '@163.com'
            ];
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
    },
    watch: {
        current: function () {
            if(this.current == 0){
                this.phoneShow = true;
                // this.emailShow = false;
            }else if (this.current == 1) {
                this.phoneShow = false;
                this.validationShow = true;
            }else if (this.current == 2) {
                this.phoneShow = false;
                this.validationShow = false;
                this.emailShow = true;
            }else if (this.current == 3) {
                this.phoneShow = false;
                this.emailShow = false;
                this.gainShow = false;
            }
        },
    }
    
}
</script>

<style lang="less" scoped>

.find-password {
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
    .input-location {
        position: relative;
        top: -260px;
        left: 40px;
    }
    .box {
        position: fixed;
        left: 50%;
        top: 30%;
        margin-left: -300px;
        width: 600px;
        height: 320px;
        .title {
        font-size: 18px;
        // padding: 20px 0;
        }
        .form {
            margin-top: 50px;
            text-align: center;
            .autocomplete {
                text-align: left;
            }
        }
        .gain-button {
            margin-top: 80px;
            text-align: center;
        }
        .hint {
            margin-top: 40px;
            text-align: center;
        }
        .again-button {
            margin-top: 20px;
        }
    }
}

</style>

