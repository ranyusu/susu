import axios from '@/utils/axios'

export  function findAllJobhunter() {
    return axios.get('/Jobhunter/findAll');
      
   }

/**
   * 通过ID查找
   * @param {object} param 
   * {id:''}
   */
  export  function findByIdJobhunter(param) {
    return axios.get('/Jobhunter/findById',{params:param});
   
  }

/**
   * 通过学历查找
   * @param {object} param 
   * {education:''}
   */
  export  function findByeducationJobhunter(param) {
    return axios.get('/Jobhunter/findByEducation',{params:param});
   
  }

  /**
   * 通过性别
   * @param {object} param 
   * {gender:''}
   */
  export  function findBygenderJobhunter(param) {
    return axios.get('/Jobhunter/findByGender',{params:param});
   
  }

  /**
   * 通过电话号码查找
   * @param {object} param 
   * {telephon:''}
   */
  export  function findBytelephoneJobhunter(param) {
    return axios.get('/Jobhunter/findByTelephone',{params:param});
   
  }

  /**
   * 通过姓名
   * @param {object} param 
   * {username:''}
   */
  export  function findByusernameJobhunter(param) {
    return axios.get('/Jobhunter/findByUsername',{params:param});
   
  }

   /**
   * 通过provinceid删除城市
   * @param {object} param 
   * {provinceid:''}
   */
  export  function deleteByIdJobhunter(param) {
    return axios.post('/Jobhunter/deleteById',param);
      
   }

   export  function quickRegistrationJobhunter(param) {
    return axios.post('/Jobhunter/quickRegistration ',param);
   
  }

  export  function saveOrUpdateJobhunter(param) {
    return axios.post('/Jobhunter/saveOrUpdate',param);
   
  }

