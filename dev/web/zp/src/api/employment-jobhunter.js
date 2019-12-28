import axios from '@/utils/axios'
/* 查找数据 */
export  function findAllEmploymentWithJobhAndEmpl() {
 return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
}