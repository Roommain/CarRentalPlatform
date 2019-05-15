<template>
    <div class="dispose-car">
        <ul v-show="awaitShow">
            <li class="order-card clearfix" v-for="(item,index) in awaitData" :key="index">
                <div class="clearfix">
                    <p class="order-status">租客： {{item.tenant}}</p>
                    <p class="order-id">订单号： {{item.orderId}}</p>                    
                </div>
                <p>换车原因： {{item.describe}}</p>
                <p class="response">
                    <el-button class="button" @click="affirm(item.orderId,1)" type="success" size="mini">允许换车</el-button>
                    <el-button class="button" @click="affirm(item.orderId,0)" type="success" size="mini">不允许换车</el-button>
                </p>
                
                <!-- <p class="money clearfix">消费金额￥： <span>{{item.rentalMoney}}</span> 元 
                    
                </p> -->
            </li>
        </ul>
        <div class="nodata-img" v-show="!awaitShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            awaitShow:false,
            awaitData:[],
            // describe: "1"
            // orderId: "578300124556427264"
            // tenant: "18223070173"
        }
    },
    created() {
        this.getQueryAllOrderOperate();
    },
    methods: {
        getQueryAllOrderOperate () {
            this.$axios.get('api/order/queryAllChangeOrderCar')
            .then(data => {
                if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                    this.awaitData = data.data.data;
                    this.awaitShow = true;
                }else {
                    this.awaitShow = false;
                }
            });
        },
        affirm (orderId,flag) {
            var params = {
                orderId: orderId,
                flag: flag
            }
            this.$axios.post('api/order/examineApply',params)
            .then(data => {
                if (data.data.code == 200) {
                    this.$Message.success(data.data.msg);
                    this.getQueryAllOrderOperate();                         
                }else {
                    this.$Message.error(data.data.msg);
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
.dispose-car {
    width: 100%;
    ul {
        li {
            list-style: none;
            padding: 5px;
            border-radius: 5px;
        }
    }
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.order-card {
    position: relative;
    width: 100%;
    height: 160px;
    background-color: #f1f3f4;
    margin-bottom: 10px;
    .order-status {
        float: left;
        padding: 5px;
    }
    .time {
        font-size: 20px;
        text-align: center;
        margin-top: 40px;
    }
    .license-number {
        font-size: 16px;
        margin-left: 20px;
    }
    .order-id {
        float: right;
        padding: 5px;
    }
}
.nodata-img {
    width: 300px;
    img {
        width: 300px;
    }
}
.money {
    color: red;
    margin-left: 20px;
    span {
        font-size: 30px;
    }
    .button {
        float: right;
        margin-right: 10px;
    }
}
.affirm {
    margin-top: 10px;
}
.order-renew {
    font-size: 16px;
    margin-bottom: 10px;
    span {
        color: red;
    }
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0px;
}
.response {
    position:absolute;
    left: 10px;
    bottom: 10px;
}
</style>