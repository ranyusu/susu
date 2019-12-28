/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: susu
 * @Last Modified time: 2019-12-26 17:36:37
 */
<template>
  <div id="businessList">
    <div class="searchDiv">
      <el-select @change="provinceChange" size="mini" v-model="province" clearable placeholder="省份">
        <el-option
          v-for="item in provinceData"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-select @change="cityChange" size="mini" v-model="city" clearable placeholder="城市">
        <el-option v-for="item in cityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select @change="industryChange" size="mini" v-model="industry" clearable placeholder="行业">
        <el-option v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="scaleChange" size="mini" v-model="scale" clearable placeholder="规模">
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="businessList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange"
      >
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="contactName" label="联系人"></el-table-column>
        <el-table-column align="center" prop="industry" label="行业"></el-table-column>
        <el-table-column align="center" label="所在地">
          <template slot-scope="scope">{{scope.row.province}}-{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column align="center" prop="scale" label="公司规模"></el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="businessData.length"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :title="currentBus.name" :visible.sync="seeVisible">
      <div class="seeDiv">
        <span>行业类型：</span>
        {{currentBus.industry}}
      </div>
      <div class="seeDiv">
        <span>成立时间：</span>
        {{currentBus.establishedTime}}
      </div>
      <div class="seeDiv">
        <span>注册资本：</span>
        {{currentBus.registeredCapital}}
      </div>
      <div class="seeDiv">
        <span>公司规模：</span>
        {{currentBus.scale}}
      </div>
      <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div>
      <div class="imgDiv">
        <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
        </a>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllProvince } from "@/api/province.js";
import { findAllCity } from "@/api/city.js";
import {
  findAllBusiness,
  findBusinessByProvince,
  findBusinessByCity,
  findBusinessByIndustry,
  findBusinessByScale,
  deleteBusinessById
} from "@/api/business.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      //省份
      province: "",
      //城市
      city: "",
      //行业
      industry: "",
      //规模
      scale: "",
      //省份数组
      provinceData: [],
      //城市数组
      cityData: [],
      //行业数组
      industryData: [],
      //规模数组
      scaleData: [],
      //商家数组
      businessData: [],
      //商家列表，表格数据
      // businessList: [],
      //当前页
      currentPage: 1,
      //每页条数
      pageSize: config.pageSize,
      //批量删除ids
      ids: [],
      //当前查看或修改的对象
      currentBus: {},
      //模态框显示与否
      seeVisible: false
    };
  },
  computed: {
    //分页数据
    businessList() {
      let temp = [...this.businessData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    // 页数发生改变
    pageChange(page) {
      this.currentPage = page;
    },
    //省份发生改变
    async provinceChange(val) {
      this.city = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByProvince({ province: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过省份查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //城市发生改变
    async cityChange(val) {
      this.province = "";
      this.industry = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByCity({ city: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过城市查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //行业发生改变
    async industryChange(val) {
      this.province = "";
      this.city = "";
      this.scale = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByIndustry({ industry: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过行业查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //规模发生改变
    async scaleChange(val) {
      this.province = "";
      this.city = "";
      this.industry = "";
      //val 是option的value值
      if (val) {
        try {
          let res = await findBusinessByScale({ scale: val });
          this.businessData = res.data;
          this.currentPage = 1;
        } catch (error) {
          config.errorMsg(this, "通过规模查找商家信息错误");
        }
      } else {
        this.findAllBus();
      }
    },
    //查看
    toSee(row) {
      this.currentBus = { ...row };
      this.seeVisible = true;
    },
    //编辑
    toEdit(row) {
      alert("编辑");
    },
    //删除
    toDelete(id) {
      // alert("删除");
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteBusinessById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllBus();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteBusinessById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllBus();
              }, 2000);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
    },
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
    },
    //查找所有省份信息
    async findAllPro() {
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有城市信息
    async findAllCi() {
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查找所有的商家信息
    async findAllBus() {
      try {
        let res = await findAllBusiness();
        this.businessData = res.data;
        this.currentPage = 1;
        //行业数组
        let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.scaleData = [...new Set(scaleArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    }
  },
  created() {
    this.findAllPro();
    this.findAllCi();
    this.findAllBus();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tableDiv {
  margin-top: 10px;
}
.footerDiv {
  overflow: hidden;
  margin-top: 10px;
  .btnDiv {
    float: left;
  }
  .pageDiv {
    float: right;
  }
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span {
    color: #777;
  }
}
.descDiv {
  font-weight: bold;
  color: #777;
  font-size: 12px;
  line-height: 30px;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.imgDiv {
  text-align: center;
}
</style>