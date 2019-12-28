import axios from '@/utils/axios'
/* 查找数据 */
export  function findAllProvince() {
 return axios.get('/Province/findAll');
   
}

 /**
   * 通过ID删除省份
   * @param {object} param 
   * {id:''}
   */
  export  function deleteByIdProvince(param) {
    return axios.post('/Province/deleteById',param);
   
  }

  
 /**
   * 通过provinceid删除省份
   * @param {object} param 
   * {provinceid:''}
   */
  export  function findByIdProvince(param) {
    return axios.get('/Province/findById',{params:param});
   
  }


  export  function saveOrUpdateProvince(param) {
    return axios.post('/Province/saveOrUpdate',param);
   
  }
