const genParams = (codes) => {
  return codes.map(d=>{
    let prefix = 0;
    if (`${d}`[0] === '6') {
      prefix = 1;
    }
    return `${prefix}.${d}`
  }).join(',');
}


export const getStockPriceData =async (codes) => {
  const secids = genParams(codes);
  const url = `https://push2.eastmoney.com/api/qt/ulist/get?invt=3&pi=0&pz=100&mpi=2000&secids=${secids}&fields=f3,f14,f12&po=1&fid=`
  const request = new Request(url);
  const data = await fetch(request);
  const jsonData = await data.json();
  return jsonData;
}