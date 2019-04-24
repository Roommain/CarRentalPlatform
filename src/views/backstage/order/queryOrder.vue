<template>
    <div>
        <Tabs type="card" class="order">
            <TabPane label="全部">
                <ul v-show="allShow">
                    <li class="order-card clearfix" v-for="(item,index) in allData" :key="index">
                        <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                        <p class="order-id">订单号： {{item.orderId}}</p>
                        <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                        <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                        <p class="money">消费金额￥： <span>{{item.rentalMoney}}</span> 元</p>
                    </li>
                </ul>
                <div class="nodata-img" v-show="!allShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
            </TabPane>
            <TabPane label="已完成">
                <ul v-show="accomplishShow">
                    <li class="order-card clearfix" v-for="(item,index) in accomplishData" :key="index">
                        <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                        <p class="order-id">订单号： {{item.orderId}}</p>
                        <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                        <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                        <p class="money">消费金额￥： <span>{{item.rentalMoney}}</span> 元</p>
                    </li>
                </ul>
                <div class="nodata-img" v-show="!accomplishShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
            </TabPane>
            <TabPane label="进行中">
                <ul v-show="underwayShow">
                    <li class="order-card clearfix" v-for="(item,index) in underwayData" :key="index">
                        <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                        <p class="order-id">订单号： {{item.orderId}}</p>
                        <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                        <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                        <p class="money clearfix">消费金额￥： <span>{{item.rentalMoney}}</span> 元 </p>
                    </li>
                </ul>
                <div class="nodata-img" v-show="!underwayShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
            </TabPane>
            <TabPane label="待还车">
                <ul v-show="awaitShow">
                    <li class="order-card clearfix" v-for="(item,index) in awaitData" :key="index">
                        <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                        <p class="order-id">订单号： {{item.orderId}}</p>
                        <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                        <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                        <p class="money">消费金额￥： <span>{{item.rentalMoney}}</span> 元</p>
                    </li>
                </ul>
                <div class="nodata-img" v-show="!awaitShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
            </TabPane>
            <TabPane label="已取消">
                <ul v-show="cancelShow">
                    <li class="order-card clearfix" v-for="(item,index) in cancelData" :key="index">
                        <p class="order-status">{{newOrderStatus(item.orderStatus)}}</p>
                        <p class="order-id">订单号： {{item.orderId}}</p>
                        <p class="time">{{item.startTime}} 至 {{item.endTime}}</p>
                        <p class="license-number">车牌号： {{item.licensePlateNumber}}</p>
                        <p class="money">消费金额￥： <span>{{item.rentalMoney}}</span> 元</p>
                    </li>
                </ul>
                <div class="nodata-img" v-show="!cancelShow"><img src="../../../../static/img/timg.jpg" alt=""> </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import { getFullDate } from '@/libs/tools.js';
    export default {
        data() {
            return {
                modal:false,
                orderId:0,
                timeValue:'',
                allShow:false,
                accomplishShow:false,
                cancelShow:false,
                underwayShow:false,
                awaitShow:false,
                allData:[],
                accomplishData : [],
                cancelData: [],
                underwayData: [],
                awaitData: [],
                // type0（进行中）1（还车）2（完成）3（取消
            }
        },
        created() {
            this.getUserOrder();
            this.getAccomplishOrder();
            this.getAwaitOrder();
            this.getUnderwayOrder();
            this.getCancelOrder();
        },
        methods: {
            //获取所有数据
            getUserOrder () {
                var params = {
                    type:'',
                }
                this.$axios.post('api/order/queryAllOrder',params)
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.allData = data.data.data;
                        this.allShow = true;
                    }else {
                        this.allShow = false;
                    }
                });
            },
            //获取已完成数据
            getAccomplishOrder(){
                var params = {
                    type:2,
                }
                this.$axios.post('api/order/queryAllOrder',params)
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.accomplishData = data.data.data;
                        this.accomplishShow = true;
                    }else {
                        this.accomplishShow = false;
                    }
                });
            },
            //获取待还车数据
            getAwaitOrder(){
                var params = {
                    type:1,
                }
                this.$axios.post('api/order/queryAllOrder',params)
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.awaitData = data.data.data;
                        this.awaitShow = true;
                    }else {
                        this.awaitShow = false;
                    }
                });
            },
            //获取进行中数据
            getUnderwayOrder(){
                var params = {
                    type:0,
                }
                this.$axios.post('api/order/queryAllOrder',params)
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.underwayData = data.data.data;
                        this.underwayShow = true;
                    }else {
                        this.underwayShow = false;
                    }
                });
            },
            //获取已取消数据
            getCancelOrder(){
                var params = {
                    type:3,
                }
                this.$axios.post('api/order/queryAllOrder',params)
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.cancelData = data.data.data;
                        this.cancelShow = true;
                    }else {
                        this.cancelShow = false;
                    }
                });
            },
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
.order {
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
</style>
