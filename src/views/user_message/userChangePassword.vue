<template>
    <div class="modify-password" data-automation="password">
        <Form
            class="modify-password-form utils-from-location-style"
            data-automation="modifyPwdForm"
            ref="modifyPwdForm"
            :model="modifyPwdForm"
            :rules="modifyPwdRule"
            :label-width="120"
        >
            <FormItem
                label="旧密码："
                prop="oldPassword"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.oldPassword"
                    placeholder="请输入旧密码"
                />
            </FormItem>
            <FormItem
                label="新密码："
                prop="password"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.password"
                    placeholder="请输入新密码"
                />
                <div class="password-strength">
                    <ul class="strength-bar">
                        <li :class="strength.left"></li>
                        <li :class="strength.center"></li>
                        <li :class="strength.right"></li>
                    </ul>
                </div>
            </FormItem>
            <FormItem
                label="确认新密码："
                prop="secondPassword"
            >
                <Input
                    type="password"
                    v-model="modifyPwdForm.secondPassword"
                    placeholder="请输入确认新密码"
                />
            </FormItem>
            <FormItem>
                <Button
                    class="utils-save-btn"
                    type="primary"
                    @click="handleSubmit('modifyPwdForm')"
                    style="width: 300px;height: 42px;background-color: #5ab756;"
                >保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>

import interlayer from '@/views/interlayer/interlayer';
export default {
    data() {
        const lengthlimit = '输入6至30个字符';
        // 旧密码自定义验证器
        const validateoldPassword = (rule, value, callback) => {
            if (value.length < 6 || value.length > 30) {
                return callback(new Error(lengthlimit));
            }
            callback();
        };
        // 新密码自定义验证器
        const validatePass = (rule, value, callback) => {
            let strength = this.$rule.strength(value);
            let flag = this.setpasswordStrength(strength);
            if (flag === -1) {
                return callback(new Error(lengthlimit));
            }
            if (flag === 1) {
                return callback(new Error('密码太简单，建议密码由英文字母、数字或特殊符号组成'));
            }
            callback();
        };
        // 确认新密码自定义验证器
        const validatePassCheck = (rule, value, callback) => {
            if (value !== this.modifyPwdForm.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return {
            // 修改密码表单绑定值
            modifyPwdForm: {
                oldPassword: '',
                password: '',
                secondPassword: ''
            },
            // 修改密码表单验证规则
            modifyPwdRule: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' },
                    { validator: validateoldPassword, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'change' }
                ],
                secondPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'change' }
                ]
            },
            // 密码强度样式类名
            strength: {
                left: 'strength-left',
                center: 'strength-center',
                right: 'strength-right'
            }
        };
    },
    methods: {
        /**
         * 设置密码强度
         */
        setpasswordStrength(strength) {
            // 0 1 2 3级密码强度
            let strengthZero = {
                left: 'strength-left',
                center: 'strength-center',
                right: 'strength-right'
            };
            let strengthOne = {...strengthZero, left: 'strength-left left-reach'};
            let strengthTwo = {...strengthOne, center: 'strength-center center-reach'};
            let strengthThree = {...strengthTwo, right: 'strength-right right-reach'};
            if (strength === -1 || strength === 0) {
                this.strength = strengthZero;
                return -1;
            }
            if (strength === 1) {
                this.strength = strengthOne;
                return 1;
            }
            if (strength === 2) {
                this.strength = strengthTwo;
                return 2;
            }
            if (strength === 3) {
                this.strength = strengthThree;
                return 3;
            }
        },
        /**
         * 修改密码
         */
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const params = {
                        oldPassword : this.modifyPwdForm.oldPassword,
                        newPassword : this.modifyPwdForm.password,
                        surePassword : this.modifyPwdForm.secondPassword,
                    };
                    this.$axios
                        .put('api/user/changePassword', params).then(data => {
                        if (data.data.code == 200) {
                            this.$Message.success(data.data.msg);
                            this.logout(); // 暂定登出
                        } else {
                            return this.$Message.error(data.data.msg);
                        }
                    });
                }
            });
        },
        /**
         * 登出
         */
        logout() {
            this.$axios
            .post('api/user/logout')
            .then(data => {
                if (data.data.code == 200) {
                    this.$cookie.remove('userName');
                    // this.$cookie.remove('token');
                    // this.$cookie.remove('isAdmin');
                    this.$router.push({ name: '首页' });
                    interlayer.$emit('active');
                }else {
                    this.$Message.error(data.data.msg);
                }
            }).catch(() => {
                this.$Message.error('退出失败');
                return;
            });
        },
    }
};
</script>

<style lang="less" scoped>
.modify-password {
    width: 480px;
    margin: 100px auto;
    padding-top: 20px;
    .modify-password-form {
        width: 420px;
    }

    .password-strength {
        width: 180px;
        margin-top: 8px;
        font-size: 12px;
        color: #666;
        text-align: center;

        ul {
            display: table;
            table-layout: fixed;
            width: 100%;

            li {
                display: table-cell;
            }
        }
        // 密码强度条样式
        .strength-bar {
            border: 1px solid #aaa;
            border-radius: 14px;
            background-color: #ccc;

            li {
                height: 12px;
                border: 2px solid #fff;
            }

            li.strength-left {
                border-left-width: 3px;
                border-top-left-radius: inherit;
                border-bottom-left-radius: inherit;
            }

            li.left-reach {
                background: #ec3701;
            }

            li.center-reach {
                background: #f78115;
            }

            li.right-reach {
                background: #6ba001;
            }

            li.strength-right {
                border-right-width: 3px;
                border-top-right-radius: inherit;
                border-bottom-right-radius: inherit;
            }
        }
    }
}
</style>

