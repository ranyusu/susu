/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: susu
 * @Last Modified time: 2019-12-25 10:22:19
 */
<template>
  <div id="businessList">
      <div class="searchDiv">
        {{provinceData}}
      <el-select v-model="province" clearable placeholder="省份">
      <el-option v-for="item in provinceData" :key="item.id" :label="item.label" :value="item.value"></el-option> 
    </el-select>
      <el-select v-model="city" clearable placeholder="城市"> 
        <el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="industry" clearable placeholder="行业"> 
        <el-option v-for="item in industryData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="scale" clearable placeholder="规模"> 
        <el-option v-for="item in scaleData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </div>

      <div></div>
    <!-- 商家信息管理 -->
    <el-table ref="multipleTable" :data="BusinessData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="编号" width="120"></el-table-column>
    <el-table-column prop="name" label="企业名称" width="120">
    <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column prop="contactName" label="联系人" ></el-table-column>
    <el-table-column prop="contactPhone" label="联系方式" ></el-table-column>
    <el-table-column prop="industry" label="行业" ></el-table-column>
    <el-table-column prop="location" label="所在地"></el-table-column>
     <el-table-column prop="province" label="省份" ></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
    <el-table-column prop="scale" label="公司规模"  show-overflow-tooltip></el-table-column>
     <!-- <el-table-column fixed="right" label="" width="100">
       <template slot-scope="scope">
       <el-button type="text" @click="dialogVisible = true">查看</el-button>
        </template>
        </el-table-column> -->
        <el-table-column label="详情" width="100">
        <template slot-scope="scope">
           <el-button type="text" @click="open(scope.watch)">查看</el-button>
        </template>
      </el-table-column>
     <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" @click="toDelete(scope.row)">删除</el-button>
        <el-button type="text" size="small" @click="toedit(scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
  <el-form :model="Business">
    <el-form-item label="*企业名称" :label-width="formLabelWidth">
      <el-input v-model="Business.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="*联系人" :label-width="formLabelWidth">
      <el-input v-model="Business.contactName" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="*联系方式" :label-width="formLabelWidth">
      <el-input v-model="Business.contactPhone" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="*行业" :label-width="formLabelWidth">
      <el-input v-model="Business.industry" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="*公司规模" :label-width="formLabelWidth">
      <el-input v-model="Business.scale" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="*所属省份" :label-width="formLabelWidth">
      <el-select v-model="Business.provinceId" placeholder="请选择所属省份">
        <el-option label="*请选择" value=""></el-option>
        <el-option v-for="(item,index) in BusinessData" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
      </el-form-item> 
      
    <el-form-item label="*公司简介" :label-width="formLabelWidth">
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    </el-form-item>
  </el-form>


  
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="tosave">确 定</el-button>
  </div>
</el-dialog>

 <el-button @click='todele' size="small" type="primary">删除</el-button>

</div>
</template>

<script>
import config from '@/utils/config.js';
import {findAllBusiness,deleteByIdBusiness,saveOrUpdateBusiness} from "@/api/Business.js";
import {findAllCity} from "@/api/city.js";
import {findAllProvince} from "@/api/Province.js";

//设置基础路径

export default {
  name: "businessManage",
  data() {
    return {
      //省份
      province:'',
      //城市
      city:'',
      //行业
      industry:'',
      //规模
      scale:'',
      //省份数组
      provinceData:[],
      //城市数组
      cityData:[],
      //行业数组
      industryData:[],
      //规模数组
      scaleData:[],
      //商家数组
      BusinessData:[],
      //商检列表，表格数据
      BusinessList:[],
      dialogFormVisible:false,
      dialogVisible: false,
      formLabelWidth:'120px',
      Business:{
        name:'',
        contactName:'',
        contactPhone:'',
        industry:'',
        location:'',
        scale:'',
        Province:'',
        city:''
      },
     
    };
  },
  computed: {
  },
  methods: {

    //查找所有省份信息
    async findALLpro(){
      try {
        let res = findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    },

    //查找所有省份信息
    async findALLci(){
      try {
        let res = findAllCity();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    },

      toDecete(row){
        let id = row.id;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteByIdBusiness();
          this.$message({
            type: 'success',
            message: '删除成功!' ,
            });
            this.findBusinessData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
     },
     //修改按钮
      toedit(row){
        this.city = {...row};
        this.dialogTitle="编辑城市信息";  
        this.dialogFormVisible = true;
        this.findBusinessData();
      },
         async findBusinessData(Business) {
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await findAllBusiness();
        this.BusinessData = res.data;
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "查找失败"
        });
      }
    },

      async deleteByIdBusiness(id) {
      try {
        
        let res = await deleteByIdBusiness();
        this.BusinessData = res.data;
        this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success"
          });
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "删除失败"
        });
      }
    },

     async saveOrUpdateBusiness(Business) {
      try {
       
        let res = await saveOrUpdateBusiness();
        this.BusinessData = res.data;
      } catch (err) {
        this.$notify.error({
          title: "失败",
          message: "保存失败"
        });
      }
    }
    },

    
  
   created() {
      this.findBusinessData();
      this.findALLpro();
      this.findALLci();
  },
  mounted() {}
};
</script>
<style scoped>
</style>