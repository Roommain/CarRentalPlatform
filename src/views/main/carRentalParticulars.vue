<template>
    <el-card class="particulars clearfix">
        <div class="left-img">
            <el-carousel height="340px">
                <el-carousel-item v-for="imgs in particularsData.vehiclePictures" :key="imgs">
                    <img :src=imgs alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right-text">
            <p class="vehicleType">{{particularsData.vehicleType}} {{particularsData.displacement}}L</p>
            <p>车挡型： {{newAutoOrHand(particularsData.autoOrHand)}}</p>
            <p>车龄：{{particularsData.carYear}}</p>
            <p>核载人数：{{particularsData.chairNumber}}</p>
            <p>所在城市：<Icon type="md-pin" />{{particularsData.city}}</p>
            <p>所用油型：{{particularsData.gasolineType}}</p>
            <p>车牌号码：{{particularsData.licensePlateNumber}}</p>
            <p class="vehicleRemark">备注：<span>{{particularsData.vehicleRemark}}</span> </p>
            <p class="vehicleRemark">车辆描述：<span>{{particularsData.vehicleDescription}}</span></p>     
            <p class="money">￥<span>{{particularsData.rented}}</span> / 天</p>
            <div class="button">
                <el-button type="warning" icon="el-icon-star-off" circle @click="attentionSubmit" v-show="attentionShow"></el-button>
                <el-button type="success" icon="el-icon-check" circle @click="attentionSubmit" v-show="!attentionShow"></el-button>
                <el-button type="success" round @click="carRental" v-show="carRentalShow">{{newDisplayType(particularsData.displayType)}}</el-button>
                <el-button type="info" round v-show="!carRentalShow">{{newDisplayType(particularsData.displayType)}}</el-button>
            </div>
            <Modal
                v-model="modal"
                title="确认订单"
                width=450
                :draggable="true"
                :footer-hide="true">
                <div class="order">
                    <el-button type="primary" plain>{{particularsData.vehicleType}}</el-button>
                    <el-button type="primary" plain>{{particularsData.displacement}}L</el-button>
                    <el-button type="primary" plain>{{newAutoOrHand(particularsData.autoOrHand)}}</el-button>
                    <el-button type="primary" plain>{{particularsData.licensePlateNumber}}</el-button>
                </div>
                <p class="money">￥<span>{{particularsData.rented}}</span> / 天</p>
                <div class="block">
                    <el-date-picker
                    v-model="timeValue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="affirm">
                    <el-button type="success" round @click="carRentalOrder">提交订单</el-button>
                </div>
            </Modal>
        </div>
    </el-card>
</template>

<script>
import { getFullDate } from '@/libs/tools.js';
export default {
    data() {
        return {
            timeValue: [],
            licensePlateNumber:'',
            modal:false,
            isFollow:'',
            attentionShow:true,
            carRentalShow:true,
            particularsData:{
                autoOrHand: 1,
                carOwner: "root",
                carYear: 3,
                chairNumber: 4,
                city: "4",
                displacement: 1.2,
                displayType: 0,
                gasolineType: 97,
                isFollow: "未关注",
                licensePlateNumber: "渝B6666",
                profit: 100,
                rented: 300,
                vehicleDescription: "4",
                vehiclePictures: ["http://39.108.253.80:1125/home/car/root_渝B6666_0.png"],
                vehicleRemark: "4",
                vehicleType: "宝马",
            },
        }
    },
    created() {
        this.getParticularsData();
    },
    methods: {
        attentionSubmit () {
            if (this.isFollow == '请登录') {
                this.$router.push({ name: '登录' });
            }else {
                var params = {
                    licensePlateNumber: this.licensePlateNumber,
                }
                this.$axios.post('api/UserVehicle/followOrCancel',params)
                .then(data => {
                    if(data.data.code == 200) {
                        if(data.data.msg == '已关注') {
                            this.$Message.success('收藏成功');
                            this.attentionShow = false;
                        }else if (data.data.msg == '未关注') {
                            this.$Message.success('成功取消收藏');
                            this.attentionShow = true;
                        }else {
                            this.$Message.warning(data.data.msg);
                        }
                    }else {
                        this.$Message.error('收藏失败');
                    }
                });                
            }
        },
        getParticularsData () {
            this.licensePlateNumber = this.$route.params.licensePlateNumber || '';
            console.log(this.licensePlateNumber);
            var params = {
                licensePlateNumber: this.licensePlateNumber,
            }
            this.$axios.post('api/car/queryOne',params)
            .then(data => {
                if(data.data.code == 200) {
                    this.particularsData = data.data.data;
                    this.isFollow = data.data.data.isFollow || '请登录';
                    if (data.data.data.isFollow && data.data.data.isFollow == '未关注') {
                        this.attentionShow = true;
                    }else if (data.data.data.isFollow && data.data.data.isFollow == '已关注') {
                         this.attentionShow = false;
                    }
                    if (data.data.data.displayType == 0) {
                        this.carRentalShow = true;
                    }else {
                        this.carRentalShow = false;
                    }
                }
            });
        },
        carRental () {
            if (this.isFollow == '请登录') {
                this.$router.push({ name: '登录' });
            }else {
                this.modal = !this.modal;
            }   
        },
        carRentalOrder () {
            if (this.timeValue.length == 0) {
                this.$Message.warning('请选择时间');
            } else if (this.timeValue.length == 2) {
                console.log(this.timeValue); 
                var params = {
                    licensePlateNumber: this.licensePlateNumber,
                    startTime: getFullDate(this.timeValue[0],'year'),
                    endTime:getFullDate(this.timeValue[1],'year'),
                }
                this.$axios.post('api/order/addOneOrder',params)
                .then(data => {
                    this.modal = false;
                    this.getParticularsData();
                    this.$Message.success('成功提交订单，交易成功');
                });
            }

        }
    },
    computed:{
        /**
        * 封装进行状态修改的方法
        * @param {Object} obj 当前渲染的对象
        */
       //车型
        newAutoOrHand(){
            return function(obj) {
                if(obj == 0){
                    return '手动挡';
                }
                    else if (obj == 1) {
                    return '自动挡';
                }
            };
        },
       //车子状态
        newDisplayType(){
            return function(obj) {
                if(obj == 0){
                    return '空闲，可租用';
                }
                    else if (obj == 1) {
                    return '该车使用中，请查看其他车辆';
                }
            };
        },
    },
}
</script>

<style lang="less" scoped>
.particulars {
    width: 80%;
    // height: 600px;
    margin: auto;
    // background-color: rgb(222, 231, 231);
    .left-img {
        width: 40%;
        height: 400px;
        float: left;
        img {
            width: 100%;
            height: 340px;
        }
    }
    .right-text {
        width: 55%;
        // height: 400px;
        float: right;
        p {
            font-size: 18px;
            line-height: 30px;
        }
        .button {
            margin: 20px 0;
        }
        .vehicleType {
            font-weight: 700;
        }
        .vehicleRemark {
            span {
                font-size: 14px;
            }
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
.el-button+.el-button {
    margin: 0;
}
.affirm {
    margin-top: 20px;
}
.order {
    margin-bottom: 10px;
}
.money {
    color: red;
    span {
        font-size: 30px;
    }
}
</style>