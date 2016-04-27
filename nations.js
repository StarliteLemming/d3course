var dataUrl = "https://raw.githubusercontent.com/IsaKiko/D3-visualising-data/gh-pages/code/nations.json";

d3.json(dataUrl, function(nations){

        var filtered_nations = nations.map(function(element){return element});
       // Initialise year
        var year_idx = parseInt(document.getElementById("year_slider").value) - 1950;

        // select element by ID
        var chart_area = d3.select("#chart_area");

        var frame = chart_area.append("svg");
        var canvas = frame.append("g");

        var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
        var frame_width = 950;
        var frame_height = 350;
        var canvas_width = frame_width - margin.left - margin.right;
        var canvas_height = frame_height - margin.top - margin.bottom;


        frame.attr("width", frame_width);
        frame.attr("height", frame_height);

        // shift the canvas and make is slightly smaller than the svg canvas.

        canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // var circ = canvas.append("circle");
        // circ.attr("stroke","black");
        // circ.attr("fill","green");
        // circ.attr("r","50px");


        // create a logarithmic scale fot the income

        var xScale = d3.scale.log(); //income
        xScale.domain([250, 1e5]);
        xScale.range([0, canvas_width]);

        // create a x-axis
        // var xAxisGen = d3.svg.axis();
        // xAxisGen.orient("bottom");
        // xAxisGen.scale(xScale);

        // generate an axis for income (x-axis)

        var xAxisGen = d3.svg.axis().orient("bottom").scale(xScale);

        var xAxis = canvas.append("g").attr("class", "x axis")
                .attr("transform", "translate(0," + canvas_height +")")
                .call(xAxisGen);
        // Add label to x axis
        xAxis.append("text").attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", canvas_width)
                .attr("y", -6)
                .text("income per capita, dollars (adjusted for inflation)");

        // circ.attr("cx", xScale(nations[0].income[0]));
        // circ.attr("cy", nations[0].lifeExpectancy[0]);

        // create a linear scale for life expectancy

        var yScale = d3.scale.linear(); //income
        yScale.domain([10, 85]);
        yScale.range([canvas_height, 0]);

        // generate an axis for life expectancy (y-axis)

        var yAxis = d3.svg.axis().orient("left").scale(yScale);

        canvas.append("g").attr("class", "y axis")
                .call(yAxis);

        var pScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]);

        // var arrRegions = nations.map(function(elt) {return elt.region;});
        // console.log(arrRegions);
        var cScale = d3.scale.category20();     // Automatically adds domain elements in the order values arrive
                // Could create an array of the region names and use that as the domain.
                // Or start with all data displayed.

        var data_canvas = canvas.append("g").attr("class", "data_canvas");

        update_graph();



        d3.selectAll(".region_cb").on("change", function(){
                // this is where things happen when I check or uncheck the checkbox
                var type = this.value;
                if (this.checked) {
                        var new_nations = nations.filter(function(element){
                                return element.region == type; 
                        })                
                        filtered_nations = filtered_nations.concat(new_nations);
                }
                else {
                        // write filter function to remove elements that have the 
                        // region "type" 
                        filtered_nations = filtered_nations.filter(function(element){
                                return element.region != type; 
                        });                
                }

                // 
                update_graph();

        })


        d3.selectAll(".global_cb").on("change", function(){
                var arr_allcb;
                // Whole world checkbox
                if (this.checked) {
                        arr_allcb = d3.selectAll(".region_cb").attr("checked", true);
                        console.log(arr_allcb);

                }
                else {
                        arr_allcb = d3.selectAll(".region_cb").attr("checked", false);
                        console.log(arr_allcb);
                }

        })

        // input event responds to user changes to the value
        // change event responds to user commits to the value (eg: change and release)

 
        d3.selectAll("#year_slider").on("input", function(){
                // Convert year string to array index (all years exist for all countries)
                year_idx = parseInt(this.value) - 1950;
                update_graph();
        })



        function update_graph(){
                // D3 magical data binding 
                var magicaldataboundobject = data_canvas.selectAll(".dot")
                        .data(filtered_nations, function(element){return element.name});


                magicaldataboundobject.enter().append("circle").attr("class","dot")
//                        .attr("cx", function(d) {return xScale(d.income[0]);} )
//                        .attr("cy", function(d) {return yScale(d.lifeExpectancy[0]);})
//                        .attr("r", function(d) {return pScale(d.population[0]);})
                        .attr("id", function(d) {return d.name;})
                        .style("fill", function(d) {return cScale(d.region);});

                magicaldataboundobject.exit().remove();

                magicaldataboundobject.transition().ease("linear").duration(200)
                        .attr("cx", function(d) {return xScale(d.income[year_idx]);} )
                        .attr("cy", function(d) {return yScale(d.lifeExpectancy[year_idx]);})
                        .attr("r", function(d) {return pScale(d.population[year_idx]);});

        }

})
