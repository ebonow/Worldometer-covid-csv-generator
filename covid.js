let data = {};

const mergeRow = ({ category, y }) => {
  const date = category.split(' ').reverse().join('-');
  data[date] = (data[date] || []).concat(y);
}

const mergeFromChart = i => Highcharts.charts[i].series[0].data.forEach(mergeRow);

mergeFromChart(2);
mergeFromChart(6);
mergeFromChart(5);

const header = [['Date', 'Confirmed', 'Deaths', 'Active']];
const flat = header.concat(Object.entries(merged).map(([key, val]) => [key, ...val]));

const uri = encodeURI("data:text/csv;charset=utf-8," + flat.map(e => e.join(",")).join("\n"));
const country = location.pathname.split('/').filter(x=>!!x).reverse()[0];
const MMDD = new Date().toISOString().slice(5,10);
const fileName = `${country}_${MMDD}.csv`;

const link = document.createElement("a");
link.setAttribute("href", uri);
link.setAttribute("download", fileName);
document.body.appendChild(link);

link.click();
