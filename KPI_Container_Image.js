define(['qlik', 'jquery'],
function(qlik, $){
    return {
        visualType : 'image',
        definition:{
           label: "Visual",
           component : "expandable-items",
           show: function(d){
               return d.visualType == 'image';
           },
           items:{
               item: {
                   label: "Image Settings",
                   items:{
                        image :{
                            type: "string",
                            ref: "image.imagePath",
                            component: "media",
                            label:"Select an image",
                            layoutRef: "image.imagePath"
                        },
                        imageWidth :{
                            type: "string",
                            ref: "image.width",
                            label:"Image width",
                        },
                        imageHeight :{
                            type: "string",
                            ref: "image.height",
                            label:"Image Height",
                        }
                   }
               }
            }
        },
        paint : function(d3Obj, layout){
            var ele = $(d3Obj._groups[0][0]);
            var data = d3Obj.datum();
            
            d3Obj.html(null);
            d3Obj.append('img')
            .style('width', function(d){return d.image.width;})
            .style('height', function(d){return d.image.height;})
            .attr('src', function(d){
                return d.image.imagePath;
            });;
                        
        }
    }
}

);