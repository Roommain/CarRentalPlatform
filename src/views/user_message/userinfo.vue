<template>
    <div class="userinfo">
        <div class="card">
            <!-- <h1 class="title">个人资料</h1> -->
            <div>
                <Form class="form" :model="formItem" :label-width="100">
                    <FormItem label="昵称">
                        <Input size="large" v-model="formItem.userName" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="邮箱" >
                        <span>{{formItem.email}}</span>
                        <!-- <Input size="large" disabled v-model="formItem.email" style="width: 300px"></Input> -->
                    </FormItem>
                    <FormItem label="电话">
                        <span>{{formItem.telPhone}}</span>
                        <!-- <Input size="large" disabled v-model="formItem.telPhone" style="width: 300px"></Input> -->
                    </FormItem>
                    <FormItem label="实名认证">
                        <span :class="{'autonym':formItem.isVip,'unAutonym':!formItem.isVip}">{{newVip(formItem.isVip)}}</span>
                        <!-- <Input size="large" v-model="formItem.isVip" style="width: 300px"></Input> -->
                    </FormItem>
                    <FormItem label="年龄" v-show="ageShow">
                        <span>{{formItem.age}}</span>
                        <!-- <Input size="large" v-model="formItem.age" style="width: 300px"></Input> -->
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formItem.sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem>
                        <Button size="large" @click="saveSubmit" type="primary" style="width: 300px;height: 42px;background-color: #5ab756;">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div> 
    </div>
</template>

<script>
import interlayer from '@/views/interlayer/interlayer'
export default {
    data() {
        return {
            emailData: [],
            ageShow: false,
            // userName: 'aaa',
            cityData: ['重庆', '成都', '上海', '北京'],
            formItem: {
                userName: '',
                email: '',
                isVip: 0,
                sex: '',
                telPhone: '',
                age: 0,
// email: "1182930079@qq.com"
// isVip: "0"
// sex: "男"
// telPhone: "18223070173"
// userName: "18223070173"
            }
        }
    },
    created() {
        this.requestInformation();
    },
    computed: {
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
       //是否实名
        newVip(){
            return function(obj) {
                if(obj == 0){
                    return '未实名';
                }
                 else if (obj == 1) {
                    return '已实名';
                }
            };
        },
    },
    methods: {
        filterMethod (value, option) {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        },
        emailHandleSearch (value) {
            this.emailData = !value || value.indexOf('@') >= 0 ? [] : [
                value + '@qq.com',
                value + '@foxmail.com',
                value + '@163.com'
            ];
        },
        requestInformation () {
            this.$axios.get('api/user/queryUserInfo')
            .then(data => {
                if (data.data.code == 200) {
                    this.formItem = data.data.data;
                    if (data.data.data.isVip == 1) {
                        this.ageShow = true;
                    }
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        },
        saveSubmit () {
            const param = {
                userName:this.formItem.userName,
                sex:this.formItem.sex,
            }
            this.$axios.put('api/user/updateUserInfo',param)
            .then(data => {
                console.log(data);
                if (data.data.code == 200) {
                    this.$Message.success(data.data.msg);
                    this.requestInformation();
                    this.$cookie.set('userName',this.formItem.userName);
                    interlayer.$emit('active',this.formItem.userName);
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        }
    }

}
</script>

<style lang="less" scoped>
.userinfo {
    position: relative;
    .autonym {
        color: green;
    }
    .unAutonym {
        color: red;
    }
    .card {
        position: absolute;
        top: 100px;
        left: 50%;
        width: 500px;
        margin-left: -250px;
        background-color: rgba(255, 255, 255, 0.3);
        .title {
            font-size: 18px;
        }
        .form {
            margin-top: 30px;
        }
    }
    
    
}
</style>