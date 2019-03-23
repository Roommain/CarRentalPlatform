<template>
    <div class="userinfo">
        <div class="card">
            <!-- <h1 class="title">个人资料</h1> -->
            <div>
                <Form class="form" :model="formItem" :label-width="100">
                    <FormItem label="用户昵称">
                        <Input size="large" v-model="formItem.userName" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="用户邮箱">
                        <AutoComplete
                            v-model="formItem.email"
                            @on-search="emailHandleSearch"
                            placeholder="请输入邮箱"
                            size="large"
                            style="width:300px">
                            <Option v-for="item in emailData" :value="item" :key="item">{{ item }}</Option>
                        </AutoComplete>
                    </FormItem>
                    <FormItem label="常驻城市">
                        <AutoComplete
                            v-model="formItem.city"
                            :data="cityData"
                            :filter-method="filterMethod"
                            size="large"
                            style="width:300px">
                        </AutoComplete>
                    </FormItem>
                    <FormItem label="生日">
                        <Row>
                            <Col span="11">
                                <DatePicker size="large" type="date" v-model="formItem.birthday" style="width: 300px"></DatePicker>
                            </Col>
                        </Row>
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
            // userName: 'aaa',
            cityData: ['重庆', '成都', '上海', '北京'],
            formItem: {
                userName: '',
                email: '',
                birthday: '',
                city: '',
                sex: '男',
            }
        }
    },
    created() {
        // this.requestInformation();
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
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        },
        saveSubmit () {
            this.$axios.put('api/user/saveUserInfo',this.formItem)
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