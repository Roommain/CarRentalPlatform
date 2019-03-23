<template>
    <div class="home">
        <el-carousel :interval="3000" type="card" height="500px">
            <el-carousel-item v-for="(item,index) in imgs" :key="index">
                <img class="img" :src="item.src" alt="">
            </el-carousel-item>
        </el-carousel> 
        <div class="classify">
            <div class="short">
                <p class="title">短租服务，灵活自如</p>
                <p class="text">无论您是想约会、自驾游、踏青还是商务接待….</p>
            </div>
            <div class="short long">
                <p class="title">超值长租，实惠便捷</p>
                <p class="text">如果您常租车，我们建议您可以尝试长租，按月起租，实惠方便。</p>
            </div>
        </div>
        <ul>
            <li class="image-panel-item1">
                <h3>自驾出游</h3>
                <p>周末带着全家租一辆宽敞舒适的大车，</p>
                <p>如别克GL8、途观、JEEP等自驾出游，</p>
                <p>游遍山川美景，游遍大江南北，</p>
                <p>收获满满的幸福。</p>
            </li>
            <li class="image-panel-item2">
                <h3>情侣约会</h3>
                <p>周末你会和你的TA去哪呢，</p>
                <p>踏青自驾是个不错的选择,</p>
                <p>甲壳虫、mini、smart都会为你</p>
                <p>平淡的周末添一抹亮色。</p>
            </li>
            <li class="image-panel-item3">
                <h3>商务接待</h3>
                <p>我们有丰富的商务车型，</p>
                <p>如奔驰、别克、宝马等，</p>
                <p>帮助您接待业务往来的客户</p>
                <p>助您在商业洽谈中取得成功。</p>
            </li>
            <li class="image-panel-item4">
                <h3>体验个性车</h3>
                <p>自己的车开腻了，</p>
                <p>想要尝试体验更多新鲜感，</p>
                <p>即刻预订保时捷911、特斯拉、牧马人、</p>
                <p>大黄蜂等丰富车型满足你的小欲望吧。</p>
            </li>
        </ul>
        <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/footer';
export default {
    components: {
        Footer
    },
    data() {
        return {
            imgs:[
                {src:'/static/img/717c50ce5dc7655311f37c47242c7a7e.jpg'},
                {src:'/static/img/aa28feb20b07799fc7335cfc68e0971f.jpg'},
                {src:'/static/img/become-back.a82c677d.jpg'},
                {src:'/static/img/story3.81130e7d.png'},
                {src:'/static/img/story2.31bf03b4.png'},
                {src:'/static/img/story1.17c61c0b.png'},
            ]
        }
    },
}
</script>

<style lang="less" scoped>
.home {
    padding-top: 20px;
    .img {
        width: 100%;
        height: 100%;
    }
    .classify {
        position: relative;
        display: flex;
        justify-content:space-between;
        z-index: 999;
        top: -60px;
        left: 50%;
        margin-left: -450px;
        width: 900px;
        // height: 300px;
        color: #fff;
        .short {
            width: 430px;
            height: 220px;
            background-color: #07cc7b;
            box-shadow: 0 15px 30px 0 rgba(0,192,107,.3);
            transition:all 0.4s ease;
            cursor: pointer;
            p {
                text-align: center;
                line-height: 50px;
            }
            .title {
                font-size: 24px;
                margin-top: 40px;
            }
            .text {
                font-size: 12px;
            }
        }
        .long {
            background-color: #2a8ef5;
            box-shadow: 0 15px 30px 0 rgba(17,97,229,.3);
        }
        .short:hover {
            transform: scale(1.15);
        }
    }
    ul {
        // position: relative;
        display: flex;
        justify-content:space-between;
        // top: -160px;
        width: 1200px;
        // height: 500px;
        margin: 0 auto;
        li {
            list-style: none;
            float: left;
            width: 245px;
            height: 450px;
            margin-right: 15px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            padding-left: 20px;
            opacity: .9;
            color: #fff;
            font-size: 12px;
            border-radius: 2px;   
            h3 {
                margin-top: 300px;
                font-size: 20px;
            }         
        }
        .image-panel-item1 {
            background-image: url('/static/img/image-panel1.885fbac7.png');
        }
        .image-panel-item2 {
            background-image: url('/static/img/image-panel2.33387385.png');
        }
        .image-panel-item3 {
            background-image: url('/static/img/image-panel3.0c271272.png');
        }
        .image-panel-item4 {
            background-image: url('/static/img/image-panel4.3c6985bf.png');
        }
    }
}


</style>
