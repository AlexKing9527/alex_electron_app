import axios from 'axios'
let defaultUrl = 'http://10.18.97.154:9004/zswh-bigdata-war/api/'

export default {
  getTopBannerData () {
    return axios.get(defaultUrl + 'indexStat')
  }
}
