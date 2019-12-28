/*
 * @Author: liuyr 
 * 求职列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: susu
 * @Last Modified time: 2019-12-27 16:40:40
 */
<template>
  <div id="jobList">
    <!-- {{EmploymentWithJobhAndEmplData}} -->
    <el-button size="small" type="info">待联系</el-button>

    <div class="tableDiv">
    <el-table :data="EmploymentWithJobhAndEmplList"  stripe style="width: 100%">
      <el-table-column prop="jobhunter.realname" label="求职人" ></el-table-column>
      <el-table-column prop="jobhunter.telephone" label="联系方式"  ></el-table-column>
      <el-table-column prop="employment.job" label="求职岗位"  ></el-table-column> 
      <el-table-column prop="resume" label="简历">
        <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看简历</el-button>
          </template>
      </el-table-column>
      <el-table-column prop="askTime" label="申请时间" ></el-table-column>
    </el-table>
    </div>
    
    <!-- 模态框 -->
    <!-- 标题为该行数据中的realname -->
    <el-dialog :title="currentContact.realname" :visible.sync="seeVisible" >
      
       <div class="tag-group">
      <!-- 模态框内标签 -->
       <span class="tag-group__title"></span>
       <el-tag v-for="item in items" :key="item.label"  :type="item.type" effect="light"> {{ item.label }}</el-tag>
       
      <!-- 模态框内容 -->
      <el-row :gutter="20">
        <el-col :span="12"> <div class="see"><span>性别：</span>{{currentContact.gender}}</div></el-col>
        <el-col :span="12"> <div class="see"><span>出生年份：</span>{{currentContact.birth}}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12"> <div class="see"><span>最高学历：</span>{{currentContact.education}}</div></el-col>
        <el-col :span="12"> <div class="see"><span>工作经验：</span>{{currentContact.workTime}}</div></el-col>
      </el-row> 
      </div>
    </el-dialog>
    
    
    <div class="pageDiv">
        <el-pagination :page-size="pageSize" @current-change="pageChange"       
      :current-page.sync="currentPage"
     size="mini" background layout="prev, pager, next" :total="EmploymentWithJobhAndEmplData.length"></el-pagination>

     </div>

  </div>
</template>

<script>
import {findAllEmploymentWithJobhAndEmpl} from "@/api/employment-jobhunter.js";
import config from '@/utils/config.js';

export default {
  data() {
    return {
      EmploymentWithJobhAndEmplData:[],  
      //    
      currentContact:{},
      //设定模态框不可见
      seeVisible:false,
      //模态框里标签设置
      items: [{ type: '',label: '个人信息'}],
      pageSize:'config.pageSize',
      currentPage: 1,
    };
  },
  computed: {
    EmploymentWithJobhAndEmplList(){
      let temp = [...this.EmploymentWithJobhAndEmplData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize , pageSize * page);
    }
  },
  methods: {

    pageChange(page){
      this.currentPage = page;
    },
  
    
  //查询求职者信息
  async findAllJob(){
      try{
        let res = await findAllEmploymentWithJobhAndEmpl();
        this.EmploymentWithJobhAndEmplData=res.data;
       }catch(error){
          config.errorMsg(this, "查找错误");
       }
    },
  //查看简历
  toSee(row) {
      this.currentContact={...row.jobhunter};
      this.seeVisible=true;
  },
},
  created() {
    this.findAllJob();
  },
  mounted() {}
};

</script>
<style lang="scss" scoped>
 .pageDiv{
    text-align: right;
    margin-top: 10px;
  }
.tag-group{
margin-top: 0px;
}

.see{
   //行高
  line-height: 30px;
  //字体加粗
  font-weight: bold;
}


</style>