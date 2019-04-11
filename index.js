const rp = require('request-promise');
const moment = require('moment');

const root_premium = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecinePremium'; 
const root_action = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecineAction';
const root_touch = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecineTouch';
const root_fun = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecineFun';
const root_pipoca = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecinePipoca';
const root_cult = 'http://ancine.grade.globosat.tv/programada/00252848000108_TelecineCult';

const today = moment().format('YYYYMMDD');

const url_premium = `${root_premium}${today}.csv`;
const url_action = `${root_action}${today}.csv`;
const url_touch = `${root_touch}${today}.csv`;
const url_fun = `${root_fun}${today}.csv`;
const url_pipoca = `${root_pipoca}${today}.csv`;
const url_cult = `${root_cult}${today}.csv`;

const getData = (url) => {
  return rp(url).then(csv => {
    const data = [];
    const lines = csv.split("\n");
    lines.forEach(line => {
      const fields = line.split("\\");
      if (fields[1] !== undefined) {
       const object = {
          time: fields[1],
          name: fields[3]
        }
        data.push(object);
      }
    });
    return data;
  });
};

const main = async () => {
  console.log('Programacao de hoje dos canais Telecine');
  console.log('Telecine Premium');
  const grade_premium = await getData(url_premium);
  console.log(grade_premium);
  console.log('Telecine Action');
  const grade_action = await getData(url_action);
  console.log(grade_action);
  console.log('Telecine Touch');
  const grade_touch = await getData(url_touch);
  console.log(grade_touch);
  console.log('Telecine Fun');
  const grade_fun = await getData(url_fun);
  console.log(grade_fun);
  console.log('Telecine Pipoca');
  const grade_pipoca = await getData(url_pipoca);
  console.log(grade_pipoca);
  console.log('Telecine Cult');
  const grade_cult = await getData(url_cult);
  console.log(grade_cult);
};

main();