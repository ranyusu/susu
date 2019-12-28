/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: susu
 * @Last Modified time: 2019-12-27 09:51:21
 */
import axios from '@/utils/axios'
/* 查找数据 */
export  function findAllCity() {
 return axios.get('/City/findAll');
   
}

export  function findByProvinceIdCity(param) {
    return axios.get('/City/findByProvinceId',{params:param});
      
   }

 /**
   * 通过ID删除城市
   * @param {object} param 
   * {id:''}
   */
  export  function findByIdCity(param) {
    return axios.get('/City/findById',{params:param});
   
  }

  
 /**
   * 通过provinceid删除城市
   * @param {object} param 
   * {provinceid:''}
   */
  export  function deleteByIdCity(param) {
    return axios.post('/City/deleteById',param);
      
   }


  export  function saveOrUpdateCity(param) {
    return axios.post('/City/saveOrUpdate',param);
   
  }
