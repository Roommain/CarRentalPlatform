<template>
    <div class="delete-ass">
        <div class="batch">
            <Button type="warning" @click="batchButton()">批量删除</Button> 
        </div>
        <Table stripe :loading="loading" :columns="columns" :data="pageData" :height="tableHeight" @on-selection-change="getassessments"></Table>
        <div class="page">
            <Page :total="pantectTotalSize" :current=page :page-size="size" @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total/>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            loading: true,//是否加载状态
            tableHeight: '',//table高度
            pageData:[],//分页数据
            pantectTotalSize: 0,//总数据
            page:1,
            size:20,
            columns: [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
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
        //修改航班
        updatedFlight (id) {
            console.log(id);
        },
        batchButton() {
            this.$axios.post('api/vehicleTypeRented/deleteOneOrBatch',this.assessments)
                .then(data => {
                    // console.log(data);
                    if(data.data.code == 200){
                        this.getFlightData();
                        this.$Message.success(data.data.msg);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });   
        },
        getassessments (value) {
            this.assessments = value;
            console.log(value);
        }
    },
}
</script>

<style lang="less" scoped>
.batch {
    margin-bottom: 10px;
    text-align: right;
}
.page {
    margin-top: 10px;
    text-align: center;
}
.user-message .user-view .user-main-view {
    padding: 22px 0 22px 0;
}
</style>