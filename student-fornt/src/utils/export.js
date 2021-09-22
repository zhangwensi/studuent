export function export2Excel(columns,list){
  require.ensure([], () => {
      const { export_json_to_excel } = require('../excel/Export2Excel');
      let tHeader = []
      let filterVal = []
      columns.forEach(item =>{
          tHeader.push(item.title)
          filterVal.push(item.key)
      })
      const data = list.map(v => filterVal.map(j => v[j]))
      export_json_to_excel(tHeader, data, '数据列表');
  })
}


// export2Excel() {
//   var that = this;
//   require.ensure([], () => {
//       const { export_json_to_excel } = require('../../excel/Export2Excel'); //这里必须使用绝对路径
//       const tHeader = ['id','withNum', 'userId', 'name','amount','status','amountIn','amountSuccess','createTime']; // 导出的表头名
//       const filterVal = ['id','withNum','userId', 'name','amount','status','amountIn','amountSuccess','createTime']; // 导出的表头字段名
//       const list = that.excelData;
//       const data = that.formatJson(filterVal, list);
//       // let time1,time2 = '';
//       // if(this.start !== '') {
//       //     time1 = that.moment(that.start).format('YYYY-MM-DD')
//       // }
//       // if(this.end !== '') {
//       //     time2 = that.moment(that.end).format('YYYY-MM-DD')
//       // }
//       export_json_to_excel(tHeader, data, `学生信息excel`);// 导出的表格名称，根据需要自己命名
//   })
// },
