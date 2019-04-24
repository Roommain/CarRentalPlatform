<template>
    <div class="balance-enquiry">
        余额: <span>{{money}}</span>
        <el-button class="button" type="success" size="mini" @click="topup">充值</el-button>
        <Modal
            v-model="modal"
            title="确认订单"
            width=450
            :draggable="true"
            :footer-hide="true">
            <el-select v-model="value" placeholder="请选择充值金额">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="success" size="small" @click="confirmTopUp">确认充值</el-button>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            money:0,
            modal:false,
            options: [{
                value: '16800',
                label: '16800'
                }, {
                value: '36800',
                label: '36800'
                }, {
                value: '63800',
                label: '63800'
                }, {
                value: '100000',
                label: '100000'
                }, {
                value: '9999999',
                label: '9999999'
                }],
            value: '',
        }
    },
    created() {
        this.getBalanceEnquiry();
    },
    methods: {
        getBalanceEnquiry () {
            this.$axios.get('api/user/queryBalance')
            .then(data => {
                if (data.data.code == 200) {
                    this.money = data.data.data;
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        },
        topup () {
            this.modal = true;
        },
        confirmTopUp () {
            var params = {
                money: this.value,
            }
            this.$axios.post('api/user/addMoney',params)
            .then(data => {
                if(data.data.code == 200) {
                    this.$Message.success('充值成功');
                    this.modal = false;
                    this.getBalanceEnquiry();
                }else {
                    this.$Message.error('充值失败');
                }
            });  
        }
    }
}
</script>

<style lang="less" scoped>
.balance-enquiry {
    span {
        color: red;
        font-size: 24px;
    }
}
.button {
    margin-left: 10px;
}
</style>