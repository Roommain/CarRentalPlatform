<template>
    <div class="dispose-car">
        <ul v-show="awaitShow">
            <li class="order-card clearfix" v-for="(item,index) in awaitData" :key="index">
                <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                <p class="order-id">订单号： {{item.orderId}}</p>
                <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                <p class="money clearfix">消费金额￥： <span>{{item.rentalMoney}}</span> 元 
                    <el-button class="button" @click="affirm(item.orderId)" type="success" size="mini">确认还车</el-button>
                </p>
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
        }
    },
    created() {
        this.getQueryAllOrderOperate();
    },
    methods: {
        getQueryAllOrderOperate () {
            this.$axios.get('api/order/queryAllOrderOperate')
            .then(data => {
                if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                    this.awaitData = data.data.data;
                    this.awaitShow = true;
                }else {
                    this.awaitShow = false;
                }
            });
        },
        affirm (orderId) {
            var params = {
                orderId: orderId,
            }
            this.$axios.post('api/order/updateOrderStatus',params)
            .then(data => {
                if (data.data.code == 200) {
                    this.$Message.success('确认成功');
                    this.getQueryAllOrderOperate();                         
                }
            });
        }
    },
    computed:{
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
        //订单状态// type0（进行中）1（还车）2（完成）3（取消
        newOrderStatus(){
            return function(obj) {
                if(obj == 0){
                    return '进行中';
                }else if (obj == 1) {
                    return '待还车';
                }else if (obj == 2) {
                    return '已完成';
                }else if (obj == 3) {
                    return '已取消';
                }
            };
        },
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
</style>