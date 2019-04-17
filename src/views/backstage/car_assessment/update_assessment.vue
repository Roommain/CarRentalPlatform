<template>
    <div class="update-ass">
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight" @on-row-click="clickrow"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
        <Modal
            v-model="modal"
            title="车型修改"
            width=500
            :draggable="true"
            :footer-hide="true">
                <el-form ref="assessData" :model="assessData" label-width="80px">
                    <el-form-item label="品牌" prop="vehicleType">
                        <el-input v-model="assessData.vehicleType" disabled style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="排量" prop="displacement">
                        <el-input v-model="assessData.displacement" disabled style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="租金" prop="rented">
                        <el-input v-model="assessData.rented" style="width:300px"></el-input><span class="day">/ 天</span>
                    </el-form-item>
                    <el-form-item label="收益" prop="profit">
                        <el-input v-model="assessData.profit" style="width:300px"></el-input><span class="day">/ 天</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitUpdate">确认修改</el-button>
                    </el-form-item>
                </el-form>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            assessData:{
                vehicleType:'',
                displacement:'',
                rented:'',
                profit:'',
            },
            modal:false,
            loading: true,//是否加载状态
            tableHeight: '',//table高度
            pageData:[],//分页数据
            pantectTotalSize: 0,//总数据
            page:1,
            size:20,
            columns: [
                {
                    type: 'index',
                    title: '序号',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '品牌车型',
                    key: 'vehicleType',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '汽车排量',
                    key: 'displacement',
                    align: 'center',
                    ellipsis:true,
                    tooltip:true,
                },
                {
                    title: '租金',
                    key: 'rented',
                    align: 'center',
                    tooltip:true,
                },
                {
                    title: '收益',
                    key: 'profit',
                    align: 'center',
                    tooltip:true,
                },
            ],
            data: [],
            assessments:[]
        }
    },
    created() {
        var day = new Date();
        this.datevalue = day;
        this.getFlightData();  
    },
    methods:{
        getFlightData () {
            this.$axios.get('api/vehicleTypeRented/selectAll')
            .then(data => {
                this.loading = false;
                if(data.data.code == 200){
                    if (data.data.msg == '暂无相关数据') {
                        this.data = data.data.data || [];
                        this.pantectTotalSize = 0;
                        this.paging(this.data,this.page,this.size);
                    }else {
                        this.data = data.data.data || [];
                        this.pantectTotalSize = data.data.data.length;
                        this.paging(this.data,this.page,this.size);
                    }
                }else {
                    this.$Message.error(data.data.msg);
                }
            }); 
        },
        // 控制表分页
        paging (number,page,size) {
            var startIndex = (page-1) * size;
            var endIndex = page * size;
            this.pageData = number.slice(startIndex,endIndex);
            if(this.pageData.length > 10){
                this.tableHeight = 520;
            }else{
                this.tableHeight = 0;
            }
        },
        // 改变page
        changePage (val) {
            this.page = val;
            this.paging (this.data,this.page,this.size);
        },
        //改变size
        changeSize (val) {
            this.size = val;
            this.paging (this.data,this.page,this.size);
        },
        clickrow (index) {
            this.modal = true;
            this.assessData.displacement = index.displacement;
            this.assessData.profit = index.profit;
            this.assessData.rented = index.rented;
            this.assessData.vehicleType = index.vehicleType;
        },
        submitUpdate () {
            this.$axios
                .put('/api/vehicleTypeRented/updateOne',this.assessData)
                .then(data => {
                  this.$Message.success(data.data.msg);
                  this.getFlightData();
                  this.modal = false;
                }).catch(() => {
                  this.$Message.error('修改失败');
                  return;
                });
        }
    },
}
</script>

<style lang="less" scoped>
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
.day {
    font-size: 18px;
    margin-left: 5px;
}
</style>