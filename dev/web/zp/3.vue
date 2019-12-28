<template>
  <div>
    <!-- 城市信息管理 -->
    <el-button @click='toadd' size="small" type="primary">新增</el-button>
    <el-table :data="cityList" style="width: 100%" size="mini">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="provinceId" label="所属省份"></el-table-column>
      <el-table-column prop="pName" label="省份"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="toDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small " @click="toedit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagi">
       <el-pagination @current-change="handleCurrentChange"       
      :current-page.sync="currentPage"
     size="mini" background layout="prev, pager, next" :total="cityData.length"></el-pagination>
    </div>
    
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
  <el-form :model="city">
    <el-form-item label="城市名称" :label-width="formLabelWidth">
      <el-input v-model="city.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属省份" :label-width="formLabelWidth">
      <el-select v-model="city.provinceId" placeholder="请选择所属省份">
        <el-option label="请选择" value=""></el-option>
        <el-option v-for="(item,index) in provinceData" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="tosave">确 定</el-button>
  </div>
</el-dialog>




  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
//设置基础路径
axios.defaults.baseURL="http://127.0.0.1:8899";


export default {
  data() {
    return {
        currentPage: 1,
        cityData:[],
        // //模态框显示与隐藏
        // dialogFormVisible:false,
        // dialogTitle:"新增城市",
        // //表单左侧的文字宽度
        // formLabelWidth:'120px',
        // //表单中的数据对象
        city:{
          name:'',
          provinceId:''
        },
        provinceData:[]
    };
  },
  computed: {
    cityList(){
      let temp = [...this.cityData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize , pageSize * page);
      // temp.slice(0,pageSize);
      // temp.slice(10,pageSize*2);
      // temp.slice(20,pageSize*3);
      // temp.slice(30,pageSize*4);
      //截取数组  [1 3 6 9 3 6 7]  从2号索引位置开始截取到五号不包括五号的元素
     // arr.slice(2,5)        6 9 3
    }
  },
  methods: {
      // /**
      //  * 累加
      //  * @param{number} a 累加的第一个值
      //  * @param{number} b 累加的第2个值
      //  * @returns {*} 累加的结果
      //  */
      // // test(a,b){
      // //   return 3;
      // // },

      //保存
      currentChange(val){
        //val当前点击的页数
        // console.log(val);
        this.currentPage = val;
      },

      async tosave(){
        try{
          let res = await axios.post('/City/saveOrUpdate',qs.stringify(this.city))
          this.dialogFormVisible = false;
          this.init();
          
           this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
        }catch{
          //console.log(res);
          
        }
      },

      //新增按钮
      toadd(){
        
        this.dialogTitle="新增城市";  
        this.dialogFormVisible = true;
        this.getProvinceData();
      },
      //修改按钮
      toedit(row){
        this.city= {...row};
        delete this.city.pName;
        this.dialogTitle="编辑城市信息";  
        this.dialogFormVisible = true;
        this.getProvinceData();
      },
      //获取省份信息
      async getProvinceData(){
        try{
          //await等待请求
          let res = await axios.get('/Province/findAll');
          // console.log(res, '--------');
          this.provinceData = res.data.data
        }catch(error){
          console.log(error);
        }
      },

      //获取所有城市数据
      init(){
          axios
        .get("/City/findAll")
        .then(res => {
            //   console.log(res.data.data); 
            //res封装过后的数据res.data为后台完整数据res.data.data为数组 
            // this.cityData = res.data.data
            //遍历所有的城市对象通过省份id给每个对象添加省份名字
            let temp = res.data.data;
          temp.forEach(item => {
            let id = item.provinceId;
            axios
              .get("/Province/findById", {
                params: { id }
              })
              .then(res => {
                // console.log(res.data.data.name);
                item.pName = res.data.data.name;
              })
              .catch(err => {
                console.log(err);
              });
          });
          //超时调用
          setTimeout(() => {
            this.cityData = temp;
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    toDelete(row) {
      //row代表当前要删除的city对象
      let id = row.id;
      axios
        .post("/City/deleteById", qs.stringify({ id }))
        .then(res => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success"
          });
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //钩子函数，组件生命周期函数  组件创建完毕，可访问组件的数据模型中的数据，可在这里发送ajax请求
  created() {
      this.init();
  },
  mounted() {}
};
</script>
<style scoped>
  .pagi{
    text-align: right;
    margin-top: 10px;
  }
</style>