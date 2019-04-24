<template>
    <div class="balance-enquiry">
        余额: <span>{{money}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            money:0,
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
</style>