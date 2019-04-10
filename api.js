var film=d3.json("https://ghibliapi.herokuapp.com/films/");

film.then(function(data){console.log(data)})

film.then(function(data){
  var title = data.map(function(d){
    return d.title
  })

  var director = data.map(function(d){
    return d.director
  })


  var year = data.map(function(d){
    return +d.release_date
  })

  var producer = data.map(function(d){
    return d.producer
  })

console.log(director);
console.log(year);

var svgwidth= window.innerWidth*0.79;
var svgheight= window.innerHeight*0.8;

var margins =
{
  top:5,
  bottom:50,
  left:150,
  right:50
}

var width = svgwidth -margins.left - margins.right;
var height = svgheight -margins.top - margins.bottom;

var svg = d3.select('svg')
            .attr('width',svgwidth)
            .attr('height',svgheight);

var xScale = d3.scaleLinear().domain([1985,2015]).range([0,width]);

var namexScale = d3.scaleBand().domain(['Hayao Miyazaki',"Isao Takahata","Yoshifumi Kondō","Gorō Miyazaki","Hiroyuki Morita","Hiromasa Yonebayashi"]).range([0,width]);

var yScale = d3.scaleBand().domain(['Hayao Miyazaki',"Isao Takahata","Yoshifumi Kondō","Gorō Miyazaki","Hiroyuki Morita","Hiromasa Yonebayashi"]).range([0,height]);

var yAxis = d3.axisLeft(yScale).ticks(6);

var xAxis = d3.axisBottom(xScale).ticks(20).tickFormat(d3.format('d'));

var colors = d3.scaleOrdinal(d3.schemeSet1);

svg.append('g').classed('yAxis',true).call(yAxis).attr("transform", "translate("+(margins.left)+","+(margins.top)+")");

svg.append('g').classed('xAxis',true)
   .call(xAxis)
   .attr("transform", "translate("+(margins.left)+","+(margins.top+height)+")");

var plot = svg.append('g').classed('plot',true).attr("transform", "translate("+(margins.left)+","+(margins.top)+")");

var lineMake = d3.line().x(function(d){return xScale(d)}).y(function(d){return yScale('Hayao Miyazaki')});


var names = ['Hayao Miyazaki',"Isao Takahata","Yoshifumi Kondō","Gorō Miyazaki","Hiroyuki Morita","Hiromasa Yonebayashi"];

var lineData = [1985,2000,2001,2002,2003,2015];

var rectData = data.map(function(d){

      return {
        director:d.director,
        year:d.release_date

      }
})
console.log(rectData);
plot.selectAll('path').data(lineData)
                     .enter()
                     .append('path')
                     .attr('d',lineMake(lineData))
                     .attr('transform',function(d,i){return "translate(0,"+(45+(i*90))+")"})
                     .style('stroke',function(d){
                       return colors(d);
                     });

plot.selectAll('rect').data(rectData).enter().append('rect')
                      .attr('x',function(d){
                        return xScale(d.year);
                      })
                      .attr('y',function(d){
                        return yScale(d.director);
                      })
                      .attr('width','15')
                      .attr('height','15')
                      .attr('fill',function(d){
                        return colors(d.director);
                      })
                      .attr('transform',function(d,i){return "translate(-7,"+(37)+")"});





table(data,["Title","Director","Producer","Year"]);
},function(err){console.log(err)});
///////////////////////////////////////////
  function table(data,columns){
    var table = d3.select("table");

    var thead = table.append("thead")
    var tbody = table.append("tbody");

    thead.append('tr')
         .selectAll("th")
         .data(columns)
         .enter()
         .append("th")
         .text(function(d,i){
           return d;
         });
   var datum=data.map(function(d){return [d.title, d.director, d.producer, d.release_date]});
   var rows = tbody.selectAll("tr")
                   .data(datum)
                   .enter()
                   .append("tr");

                rows.selectAll("td")
                    .data(function(d){return d})
                    .enter()
                    .append("td")
                    .text(function(d){ return d});
  }
