export const extractStock = data => data.data.diff;

export const filterUp = async (data, min = 300) => {
  return data.filter((d) => d.f3 >= min);
};

export const mapStockName = data => {
  return data.map(d=>d.f14).join(',')
}