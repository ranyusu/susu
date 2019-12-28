/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: susu
 * @Last Modified time: 2019-12-27 17:28:49
 */
<template>
  <div id="userList">
    <div class="searchDiv">
      <el-select @change="educationChange"  v-model="education" clearable placeholder="学历" size="mini">
      <el-option v-for="item in educationData" :key="item" :label="item" :value="item"></el-option> 
    </el-select>
      <el-select @change="genderChange" v-model="gender" clearable placeholder="性别" size="mini"> 
        <el-option v-for="item in genderData" :key="item" :label="item" :value="item"></el-option>
      </el-select> 
      <div class="usrDiv">
       <template>
         <el-button type="warning" icon="el-icon-star-off" circle @click="dialogVisible = true" size="mini">添加用户</el-button>
         <el-button type="warning" icon="el-icon-star-off" circle @click="toinport" size="mini">导入用户</el-button>
        </template> 
        </div>
     </div> 
     <div class="demo-input-suffix">
      <el-row :gutter="20">     
  <el-col :span="10"><el-select @change="educationChange"  v-model="user" clearable placeholder="关键字" size="mini">
      <el-option v-for="item in userManageData" :key="item" :label="item" :value="item"></el-option> 
    </el-select></el-col>
  <el-col :span="14"> <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="input" size="mini"></el-input></el-col>
 </el-row></div>
     
         <el-dialog title="添加用户" :visible.sync="dialogVisible"> 
           <el-form :model="user">
    <el-form-item label="* 用户名" :label-width="formLabelWidth">
      <el-input v-model="user.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="* 手机号码" :label-width="formLabelWidth">
      <el-input v-model="user.telephone" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="tosave">确 定</el-button>
  </div>
</el-dialog>
         

     

      
      <div class="tableDiv">
        <!-- 商家信息管理 -->
        
    <el-table ref="multipleTable" :data="userManageList" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
    <el-table-column type="selection"  align="center" width="55"></el-table-column>
    <el-table-column prop="id"  label="编号" align="center" ></el-table-column>
    <el-table-column prop="username" label="用户名" align="center" >
    </el-table-column>
    <el-table-column prop="realname" label="姓名"  align="center" ></el-table-column>
    <el-table-column prop="telephone" label="联系方式" align="center" ></el-table-column>
    <el-table-column prop="gender" label="性别" align="center" ></el-table-column>
    <el-table-column prop="birth" label="出生年月" align="center" ></el-table-column>
    
    <el-table-column prop="education" label="最高学历"  show-overflow-tooltip align="center" ></el-table-column>
      
     <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button type="text" @click="toDelete(scope.row.id)" align="center" size="small">删除</el-button>
       <el-button type="text" size="small" @click="toedit(scope.row)" align="center">修改</el-button>
      </template>
      
    </el-table-column>
  </el-table>

   <div class="pagi">
       <el-pagination @current-change="handleCurrentChange"       
      :current-page.sync="currentPage"
     size="mini" background layout="prev, pager, next" :total="userManageData.length"></el-pagination>
    </div>

 <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
  <el-form :model="user">
    <el-form-item label="*用户名" :label-width="formLabelWidth">
      <el-input v-model="user.username" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="*联系电话" :label-width="formLabelWidth">
      <el-input v-model="user.telephone" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="*姓名" :label-width="formLabelWidth">
      <el-input v-model="user.realname" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="*性别" :label-width="formLabelWidth">
      <el-input v-model="user.gender" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="*生日" :label-width="formLabelWidth">
      <el-input v-model="user.birth" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="*最高学历" :label-width="formLabelWidth">
      <el-input v-model="user.education" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  
  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="tosave">确 定</el-button>
  </div>
</el-dialog>

  </div>

  </div>
</template>

<script>
import config from '@/utils/config.js';
import {findAllJobhunter,findByIdJobhunter,saveOrUpdateJobhunter,findBygenderJobhunter,findByeducationJobhunter,deleteByIdJobhunter} from "@/api/userManage.js";



export default {
  data() {
    return {
      currentPage: 1,
      userManageData:[],
      educationData:[],
      genderData:[],
      education:'',
      gender:'',
      dialogFormVisible:false,
      dialogVisible: false,
      dialogTableVisible: false,
      user:{
        username:'',
        telephone:'',
        realname:'',
        gender:'',
        birth:'',
        education:''
      },
    };
  },
  computed: {

   
    userManageList(){
      let temp = [...this.userManageData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize , pageSize * page);
    }
  },
  methods: {

      currentChange(val){
        //val当前点击的页数
        // console.log(val);
        this.currentPage = val;
      },

     //学历发生改变
    async educationChange(val){
       this.gender="";
       //val shi option的value值
       if (val){
          try {
         let res = await findByeducationJobhunter({education:val});
         this.userManageData = res.data;
         this.currentPage = 1;
       } catch (error) {
         config.errorMsg(this,'通过学历查找用户信息错误')       
         }
       }else{
         this.findALLBus();
       }
      
     },

     async genderChange(val){
       this.education="";
       //val shi option的value值
       if (val){
          try {
         let res = await findBygenderJobhunter({gender:val});
         this.userManageData = res.data;
         this.currentPage = 1;
       } catch (error) {
         config.errorMsg(this,'通过性别查找用户信息错误')       
         }
       }else{
         this.findALLBus();
       }
      
     },


      
      toedit(row){
       this.user = {...row};
        this.dialogTitle="编辑公司信息";  
        this.dialogFormVisible = true;
        this.findALLJob();
    },

      
      async tosave(user){
         try{
         let res = await saveOrUpdateJobhunter(this.user);
         this.dialogFormVisible = false;
           this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
          }
          catch(error){
          console.log(error)
          
        }
        this.findAllJob();
    },

      
    toDelete(id){  
       this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })
       .then(async()=> {
          //访问后台接口
          try {
            let res = await deleteByIdJobhunter({id:id});
            if(res.status===200){
              config.successMsg(this,'删除成功');
              this.findAllJob();
            }else{
              config.errorMsg(this,'删除失败,该商家有招聘信息');
            }
          } catch (error) {
            config.errorMsg(this,'删除失败');
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },


    async findAllJob(){
      try {
        let res = await findAllJobhunter();
        this.userManageData = res.data;
        let educationArr = res.data.map(item =>{
          return item.education;
        });
        this.educationData = [...new Set(educationArr)];//去重
        //规模数组
         let genderArr = res.data.map(item =>{
          return item.gender;
        });
        this.genderData = [...new Set(genderArr)];
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    },
    
  },
  created() {
    this.findAllJob();
  },
  mounted() {}
};
</script>
<style scoped>
.tableDiv{
   margin-top: 10px;
 }
.pagi{
    text-align: right;
    margin-top: 10px;
  }
  .usrDiv{
    float: right;
    margin-bottom: 5px;
  }
  .demo-input-suffix{
    clear: both;
    float: right;
    width: 25%;
    margin-top: 5px;
  }
</style>