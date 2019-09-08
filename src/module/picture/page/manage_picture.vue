<template>
  <section>
    <el-col class="card_list" :span="8" v-for="(picture,index) in pictures" :key="picture.id" :offset="index >0 ? 2:2">
      <el-card :body-style="{padding: '10px'}">
        <img :src="isEmpty(picture.pic)?imgUrl+picture.pic:'/static/images/nonepic.jpg'" class="image" height="150px">
        <div style="padding: 10px;">
          <span>{{picture.name}}</span>
          <div class="bottom clearfix">
            <time class="time"></time>
            <el-button type="text" class="button" @click="delPic(picture.pic)">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size"
                     :total="total" :current-page="page"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  let sysConfig = require('@/../config/sysConfig');
  import * as pictureApi from '../api/picture';

  export default {
    data() {
      return {
        page:1,
        size:9,
        total:0,
        imgUrl:sysConfig.imgUrl,
        pictures:[
          {
            id:'402885816243d2dd016243f24c030002',
            name:'Vue课程图片',
            pic:''
          },
          {
            id:'test01',
            name:'Java高级课程图片',
            pic:''
          }
        ]
      }
    },
    methods:{
      handleCurrentChange(val){
        this.page = val;
        this.getPictures();
      },
      getPictures(){
        pictureApi.findPicList(thie.page,this.size,{}).then((res)=>{
          console.log(res);
          if (res.success){
            this.total = res.queryResult.total;
            this.pictures = res.queryResult.list;
          }
        });
      },
      delPic(pic){
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          pictureApi.delPic(pic).then((res) => {
            this.editLoading = false;
            if(res.success){
              this.$message({
                message: '提交成功',
                type: 'success'
              });
            }else{
              if(res.message){
                this.$message.error(res.message);
              }else{
                this.$message.error('提交失败');
              }
            }
          });
        });
      },
      isEmpty(pic){
        return pic!=null && pic.length >0;
      }
    },
    mount(){
      this.getPictures();
    }
  }

</script>
<style scoped>
  .el-col-8{
    width:20%
  }
  .el-col-offset-2{
    margin-left:2%
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .card_list{
    margin-top: 26px;
  }
</style>
