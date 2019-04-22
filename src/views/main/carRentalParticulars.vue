<template>
    <div class="particulars clearfix">
        <div class="left-img">
            <el-carousel height="340px">
                <el-carousel-item v-for="imgs in particularsData.vehiclePictures" :key="imgs">
                    <img :src=imgs alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right-text">
            <p>车挡型： {{newAutoOrHand(particularsData.autoOrHand)}}</p>
            <p>车年龄：{{particularsData.carYear}}</p>
            <p>核载人数：{{particularsData.chairNumber}}</p>
            <p>所在城市：{{particularsData.city}}</p>
            <p>排量：{{particularsData.displacement}}L</p>
            <p>所用油型：{{particularsData.gasolineType}}</p>
            <p>车牌号码：{{particularsData.licensePlateNumber}}</p>
            <p>租金：{{particularsData.rented}}</p>
            <p>品牌：{{particularsData.vehicleType}}</p>
            <p>备注：{{particularsData.vehicleRemark}}</p>
            <p>车辆描述：{{particularsData.vehicleDescription}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            licensePlateNumber:'',
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
            var params = {
                licensePlateNumber: this.licensePlateNumber,
            }
            this.$axios.post('api/UserVehicle/followOrCancel',params)
            .then(data => {
                if(data.data.code == 200) {
                    // this.particularsData = data.data.data;
                    console.log(data);
                    // if(data.data.msg == '已关注') {
                    //     this.msg = '已关注';
                    //     this.$Message.success('成功关注');
                    // }else if (data.data.msg == '未关注') {
                    //     this.msg = '未关注';
                    //     this.$Message.success('成功取消关注');
                    // }else {
                    //     this.$Message.warning(data.data.msg);
                    // }
                }else {
                    this.$Message.error('关注失败');
                }
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
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
                    // this.flightPartData = data.data.data;
                    // this.msg = data.data.msg;
                }
            }).catch(() => {
                this.$Message.error('请求失败');
                return;
            });
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
    },
}
</script>

<style lang="less" scoped>
.particulars {
    width: 80%;
    height: 400px;
    margin: auto;
    background-color: rgb(222, 231, 231);
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
        height: 400px;
        float: right;
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
</style>