// use  d3 to to read in the json ?
console.log("app.js is loaded");
var selector = d3.select("#selDataset");
d3.json("data/samples.json").then((samples)  =>{
    console.log(samples);

    var names = samples.names;
    console.log(names);
    
    names.forEach((name) => {   
        selector.append("option").text(name).property("value",name)
    });
    var selected_name = names[0];
    createBarchart(selected_name);
    createBubblechart(selected_name);
    createGaugechart(selected_name);
});

//first function for bar chart 

function createBarchart(sample_id) {
    d3.json("data/samples.json").then((samples_data) => {
        var samples = samples_data.samples;
        var samples_array = samples.filter(obj => obj.id == sample_id);
        var results = samples_array[0];
        //console.log(`these are the results ${results}`);

        //declare variables for each element in dictionary
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse();
        console.log(results);

        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            orientation: "h"
        };
        var layout = {
            title: "Top 10 Bacteria"
        };
        var bar_data = [trace1];
        Plotly.newPlot("bar", bar_data, layout);
    });
    //console.log(`calling create bar chart with sameple id ${sample_id}`)
};

//bubble chart fucntion

function createBubblechart(sample_id) {
    d3.json("data/samples.json").then( (samples_data) => {
        var samples = samples_data.samples;
        var samples_array = samples.filter(obj => obj.id == sample_id);
        var results = samples_array[0];

        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;

        var yticks = sample_values

        var x = otu_ids
        var y = yticks

        var trace2 ={
            x: x,
            y: y,
            mode: "markers",
            marker: {
                size: y,
                color: x
            }
        };

        var layout = {
            title: "Biodiversity bubble chart"
        };
        var bar_data = [trace2];
        Plotly.newPlot("bubble", bar_data, layout);



    });    
   
    console.log(`calling create bubble chart with sample id ${sample_id}`)
};

//create gauge chart

function createGaugechart(sample_id) {
    d3.json("data/samples.json").then((samples_data) => {
        var samples = samples_data.metadata;
        var samples_array = samples.filter(obj => obj.id == sample_id);
        var results = samples_array[0];

        var wash_freq = results.wfreq;
        // var otu_labels = results.otu_labels;
        // var sample_values = results.sample_values;
        var trace3 ={
            domain: { x: [0,1], y:[0,1]},
            value: wash_freq,
            title: { text: "Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number"
        };

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

        var gauge_data = [trace3];
        Plotly.newPlot("gauge", gauge_data, layout );



    });
    console.log(`calling create gauge cgart with sample id ${samples_data}`)
};

//create option change fucntion matching from HTML 

function optionChanged(new_id){
    createBarchart(new_id);
    createBubblechart(new_id);
    createGaugechart(newid);
};
