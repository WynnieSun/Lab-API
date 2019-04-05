var film=d3.json("https://ghibliapi.herokuapp.com/films/");

film.then(function(data){
  var title = data.map(function(d){
    return d.title
  })

  var director = data.map(function(d){
    return d.director
  })


  var year = data.map(function(d){
    return d.release_date
  })

  var producer = data.map(function(d){
    return d.producer
  })

table(data,["Title","Director","Producer","Year"]);
},function(err){console.log(err)});
///////////////////////////////////////////
  function table(data,columns){
    var table = d3.select("body")
                  .append("table")
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
