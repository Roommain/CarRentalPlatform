<template>
    <Tabs type="card">
        <TabPane label="待审核">
        <ul class="img-box clearfix" v-show="nodataimgShow">
            <li v-for="(item,index) in getObjByCarOwnerData" :key="index">
                <!-- <p><img :src=item.vehiclePictures[0] alt=""></p> -->
                <el-carousel height="170px" :autoplay="false">
                    <el-carousel-item v-for="imgs in item.vehiclePictures" :key="imgs">
                        <img :src=imgs alt="">
                    </el-carousel-item>
                </el-carousel>
                <p class="car-type"> <span>{{item.vehicleType}}</span> <span>{{item.licensePlateNumber}}</span><span class="cancel" @click="cancel(item.licensePlateNumber)">取消</span></p>
            </li>
        </ul>
        <div class="nodata-img" v-show="!nodataimgShow"><img src="../../../static/img/timg.jpg" alt=""> </div>
        </TabPane>
        <TabPane label="通过审核">
        <ul class="img-box clearfix" v-show="passimgShow">
            <li v-for="(item,index) in getCarInfoData" :key="index">
                <el-carousel height="170px">
                    <el-carousel-item v-for="imgs in item.vehiclePictures" :key="imgs">
                        <img :src=imgs alt="">
                    </el-carousel-item>
                </el-carousel>
                <p class="car-type"> <span>{{item.vehicleType}}</span> <span>{{item.licensePlateNumber}}</span><span class="cancel" @click="cancel(item.licensePlateNumber)">取消</span></p>
            </li>
        </ul>
        <div class="nodata-img" v-show="!passimgShow"><img src="../../../static/img/timg.jpg" alt=""> </div>
        </TabPane>
        <TabPane label="未通过审核">
        <ul class="img-box clearfix" v-show="nopassimgShow">
            <li v-for="(item,index) in getFailCarInfoData" :key="index">
                <el-carousel height="170px" :autoplay="false">
                    <el-carousel-item v-for="imgs in item.vehiclePictures" :key="imgs">
                        <img :src=imgs alt="">
                    </el-carousel-item>
                </el-carousel>
                <p class="car-type"> <span>{{item.vehicleType}}</span> <span>{{item.licensePlateNumber}}</span><span class="cancel" @click="cancel(item.licensePlateNumber)">取消</span></p>
            </li>
        </ul>
        <div class="nodata-img" v-show="!nopassimgShow"><img src="../../../static/img/timg.jpg" alt=""> </div>
        </TabPane>
    </Tabs>
</template>
<script>
    export default {
        data() {
            return {
                nodataimgShow:false,
                passimgShow:false,
                nopassimgShow:false,
                getObjByCarOwnerData : [
                    {
                       vehiclePictures:[], 
                    }
                ],
                getCarInfoData: [
                    {
                       vehiclePictures:[], 
                    }
                ],
                getFailCarInfoData: [
                    {
                       vehiclePictures:[],
                    }
                ],
            }
        },
        created() {
            this.getObjByCarOwner();
            this.getCarInfo();
            this.getFailCarInfo();
        },
        methods: {
            //获取待审核数据
            getObjByCarOwner(){
                this.$axios.get('api/authentication/getObjByCarOwner')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getObjByCarOwnerData = data.data.data;
                        this.nodataimgShow = true;
                    }else {
                        this.nodataimgShow = false;
                    }
                });
            },
            //获取通过审核数据
            getCarInfo(){
                this.$axios.get('api/car/myCarInfo')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getCarInfoData = data.data.data;
                        this.passimgShow = true;
                    }else {
                        this.passimgShow = false;
                    }
                });
            },
            //获取为通过审核数据
            getFailCarInfo(){
                this.$axios.get('api/car/myFailCarInfo')
                .then(data => {
                    if(data.data.code == 200 && data.data.msg !== '暂无相关数据'){
                        this.getFailCarInfoData = data.data.data;
                        this.nopassimgShow = true;
                    }else {
                        this.nopassimgShow = false;
                    }
                });
            },
            //删除
            cancel (licensePlateNumber) {
                const params = {
                    licensePlateNumber : licensePlateNumber,
                };
                this.$axios
                    .post('/api/authentication/deleteOneCarInfoPreprocess',params)
                    .then(data => {
                        if (data.data.code == 200) {
                            this.$Message.success(data.data.msg);
                            this.getObjByCarOwner();
                            this.getCarInfo();
                            this.getFailCarInfo();
                        }else {
                            this.$Message.error('删除失败');
                        }
                    }).catch(() => {
                        this.$Message.error('删除失败');
                    });
            }
        },
    }
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.img-box {
    li {
        float: left;
        list-style: none;
        margin-right: 1%;
        width: 24%;
        height: 240px;
        p{
        margin-bottom: 10px;
        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
            }
        }
    }
    .car-type {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 600;
        .cancel {
            color: red;
            cursor: pointer;
            float: right;
        }
    }
}
.nodata-img {
    width: 300px;
    img {
        width: 300px;
    }
}
</style>
