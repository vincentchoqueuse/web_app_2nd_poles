$(function () {
  
    $("#monformulaire").change(function( event ) {
                             
            m = 1.0*$("#Inputm").val();
            w0 = 1.0*$("#Inputw0").val();
                               
            a = 1/(w0*w0);
            b = 2*m/w0;
            c = 1;
                               
            series_poles=[];
            //compute delta
            delta = b*b-4*a*c;
            if (delta >= 0)
                {
                p1 = (-b+Math.sqrt(delta))/(2*a);
                p2 = (-b-Math.sqrt(delta))/(2*a);
                series_poles.push([p1,0]);
                series_poles.push([p2,0]);
                }
            else
                {
                p_imag = Math.sqrt(-delta)/(2*a);
                p_real = -b/(2*a);
                series_poles.push([p_real,p_imag]);
                series_poles.push([p_real,-p_imag]);
                }

                               
            chart_pz.series[0].update({data: series_poles}, true);
                               
            // test m
            if (m<1)
                {
                $("#info").show();
                }
            else
                {
                $("#info").hide();
                }
            
            if (m< 1./Math.sqrt(2))
                {
                $("#warning").show();
                }
            else
                {
                $("#warning").hide();
                }
            if (m<0)
                {
                $("#danger").show();
                $("#warning").hide();
                $("#info").hide();
                }
            else
                {
                $("#danger").hide();
                }
        
            });
    

    var chart_pz = Highcharts.chart("chart_pz",
           {
           title: {text: ""},
           credits: {enabled: false},
           chart: {type: 'line',resetZoomButton: {theme: {display: 'none'}},},
          xAxis: {title: {text: "Real Part"},type: "linear",gridLineWidth: 1, min:-2,max:2},
           yAxis: {title:{text:"Imaginary Part"},type: "linear",gridLineWidth: 1,  min:-2,max:2},
           plotOptions: {scatter: {marker: { radius: 5, states: { hover: { enabled: true, lineColor: 'rgb(100,100,100)'}}},
                        tooltip: { headerFormat: '<b>{series.name}</b><br>', pointFormat: '{point.x}, {point.y}'}}
                    },
          navigation: {buttonOptions: {enabled: false}},
          series: [{name: 'Poles',type: 'scatter',color: 'rgba(119, 152, 191, .5)',data: [[0,0]],},
                   ],
          });

     $("#monformulaire").trigger("change");
    
    });
