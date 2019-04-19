<template>
    <Tabs type="card">
        <TabPane label="待审核">
            1
        </TabPane>
        <TabPane label="通过审核">
            2
        </TabPane>
        <TabPane label="未通过审核">
            3
        </TabPane>
    </Tabs>
</template>
<script>
    export default {
        data() {
            return {
                
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
                    if(data.data.code == 200){
                        console.log(data);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            //获取通过审核数据
            getCarInfo(){
                this.$axios.get('api/car/myCarInfo')
                .then(data => {
                    if(data.data.code == 200){
                        console.log(data);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            //获取为通过审核数据
            getFailCarInfo(){
                this.$axios.get('api/car/myFailCarInfo')
                .then(data => {
                    if(data.data.code == 200){
                        console.log(data);
                    }else {
                        this.$Message.error(data.data.msg);
                    }
                });
            },
            //删除
            updateCarOwner (licensePlateNumber) {
                const params = {
                    licensePlateNumber : licensePlateNumber,
                };
                this.$axios
                    .post('/api/authentication/deleteOneCarInfoPreprocess',params)
                    .then(data => {
                        if (data.data.code == '200') {
                            this.$Message.success(data.data.msg);
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