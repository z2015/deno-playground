export const extractStock = data => Object.values(data.data.diff);

export const filterUp = (data, min = 300) => {
  return data.filter((d) => d.f3 >= min);
};

export const mapStockName = data => {
  return data.map(d=>d.f14).join(',')
}