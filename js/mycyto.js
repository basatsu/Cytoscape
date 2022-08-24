var cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: true,
    // elements: [
    //     {
    //         data: {
    //             id: '送信',
    //             name: 'A'
    //         }
    //     },
    //     {
    //         data: {
    //             id: '受信',
    //             name: 'B'
    //         }
    //     },
    //     {
    //         data: {
    //             id: '送受信関',
    //             name: 'AB',
    //             source: '送信',
    //             target: '受信'
    //         }
    //     }
    // ],

    /* ready: function() {
        var api = this.expandCollapse({
          layoutBy: {
            name: "cose-bilkent",
            animate: "end",
            randomize: false,
            fit: true               // set this to true
          },
          fisheye: true,
          animate: false,
          undoable: false
        });
        api.collapseAll();
      }, */


    style: [
        {
            selector: 'send1',
            style: {
                'shape': 'hexagon',
                'background-color': 'red',
                'label': 'data(name)'
            }
        },
        {
            selector: 'send2',
            style: {
                'shape': 'hexagon',
                'background-color': 'yellow',
                'label': 'data(name)'
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 1,
                'line-color': '#369',
                'curve-style': 'bezier',
                'target-arrow-color': '#369',
                'target-arrow-shape': 'triangle',
                'label': 'data(id)',
                'font-size': '8px',
                'color': 'red'
            }
        },
        {
            selector: 'node[label = "MSG"]',
            css: { 'background-color': 'blue', 'content': 'data(name)' }
        },
        {
            selector: 'node[label = "Receive"]',
            css: { 'background-color': 'purple', 'content': 'data(name)' }
        },
        {
            selector: 'node[label = "Transmit"]',
            css: { 'background-color': 'black', 'content': 'data(name)' }
        },

        {
            "selector": "node.highlight",
            "style": {
                "border-color": "#000",
                "border-width": "2px"
            }
        },
        {
            "selector": "node.semitransp",
            "style": {
                "opacity": "0.2"
            }
        },
        {
            "selector": "edge.highlight",
            "style": {
                "mid-target-arrow-color": "#000"
            }
        },
        {
            "selector": "edge.semitransp",
            "style": {
                "opacity": "0.2"
            }
        }
    ]


});

//ArrayOfNodes
let items = [
    { name: 'AAA2W02', dlabel: 'send' },
    { name: 'AAA1S01', dlabel: 'send' },
    { name: 'BBB00', dlabel: 'rec' },
    { name: 'BBB01', dlabel: 'rec' },
    { name: 'BBB02', dlabel: 'rec' }

]

//ArrayOfNodes
let items2 = [
    { name: 'CCC-21', dlabel: 'msg' },
    { name: 'CCC-22', dlabel: 'msg' },
    { name: 'CCC-23', dlabel: 'msg' },
    { name: 'DDD10', dlabel: 'vari' }
]

//ArrayOfEdges
let connect = [
    { from: 'AAA2W02', to: 'BBB00' },
    { from: 'AAA2W02', to: 'BBB01' },
    { from: 'AAA1S01', to: 'BBB01' },
    { from: 'AAA1S01', to: 'BBB02' },
    { from: 'AAA1S01', to: 'BBB00' },
    { from: 'BBB00', to: 'CCC-21' },
    { from: 'BBB00', to: 'CCC-23' },
    { from: 'BBB01', to: 'CCC-21' },
    { from: 'BBB01', to: 'CCC-22' },
    { from: 'BBB02', to: 'CCC-21' },
    { from: 'CCC-21', to: 'DDD10' },
    { from: 'CCC-22', to: 'DDD10' },
    { from: 'CCC-23', to: 'DDD10' }
]


//node作成
items.forEach(function (item, index) {

    cy.add({
        data: {
            id: item.name,
            name: item.name,
            label: (item.dlabel == 'send' ? 'Transmit' : 'Receive')
        },
        classes: 'send1'

    });
})

//node作成
items2.forEach(function (item, index) {

    cy.add({
        data: {
            id: item.name,
            name: item.name,
            label: (item.dlabel == 'msg' ? 'MSG' : 'Vari')
        },
        classes: 'send2'

    });
})

//edge作成
connect.forEach(function (value, index) {
    cy.add({
        data: {
            id: 'edge:' + value.from + "-" + value.to,
            source: value.from,
            target: value.to
        }
    });
})


/* var api = cy.expandCollapse('get');
var beforeExpand = null;
cy.unbind('expandcollapse.beforeexpand');
cy.nodes().bind('expandcollapse.beforeexpand', function(event) { 
   if (beforeExpand == null) 
      beforeExpand = cy.elements().clone();  // save the graph before the first expand
}); // Triggered before a node is expanded

cy.unbind('expandcollapse.aftercollapse');
cy.nodes().bind('expandcollapse.aftercollapse', function(event) { 
   if(beforeExpand != null) {
       cy.elements().remove();
       cy.add(beforeExpand);  // set the graph to original values
       beforeExpand = null;
   }
});  */



var layout = cy.elements().layout({
    //name: 'random',
    //レイアウトに合わせて、画像の視界を調整する
    //fit: true,
    //レイアウト変換中アニメション効果を有効化
    //animate: false,

    name: 'breadthfirst',
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    //animate: true,
    //animationDuration: 1000, // duration of animation in ms if enabled

});

layout.run();

//idが「j」の要素にアニメションを設定
var j = cy.$('#BBB02');
var xp = cy.$('#j').position('x');
var yp = cy.$('#j').position('y');
//10秒内で、画像視界を指定要素まで調整（ZoomIn/Out）する、ペーディングが20px
// cy.animate({
//     fit: {
//         eles: j,
//         padding: 50
//     },
//     // pan: {
//     //     x: xp,
//     //     y: yp
//     // },
//     zoom: 2.0
// }, {
//     duration: 2000,
//     complete: function () {
//         cy.$('#BBB02').select().css('background-color', 'red');

//     }
// });

// cy.zoom({
//     level: 2.0, // the zoom level
//     position: cy.getElementById(j).position()
// });
$("#IdBtnRead").click(function () {
    var textbox = document.getElementById("input-message");
    var inputValue = textbox.value;
    //var output = "入力された内容は「" + inputValue + "」です。";
    //document.getElementById("output-message").innerHTML = output;

    var cyid = '#' + inputValue;
    var j = cy.$(cyid);

    cy.animate({
        fit: {
            eles: j,
            padding: 20
        },
        zoom: 1.2
    }, {
        duration: 2000,
        //complete: function () {
        //  cy.$(cyid).select().css('background-color', 'red');
        //}
    });


});

//------------------------------------


var options = {
    name: 'breadthfirst',
    //name: 'dagre',
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: false, // whether to create an even grid into which the DAG is placed (circle:false only)
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    //animate: true,


};

//----------------------------------------
cy.on('click', 'node', function (evt) {
    console.log('clicked ' + this.id());
});

var destroy = function () {
    cy.destroy();
};

var addNode = function () {
    var elem_id = document.getElementById('node_id').value;
    var from_node = document.getElementById('from_node').value;
    if (elem_id.length === 0 || from_node.length === 0) {
        alert("please fill both input fields");
        return;
    }
    cy.add([{
        data: {
            id: elem_id,
            name: elem_id
        }
    }, {
        data: {
            id: from_node + '' + elem_id,
            source: from_node + '',
            target: elem_id + ''

        }
    }
    ]);
    cy.layout(options);
};

cy.on('mouseover', 'node', function (event) {
    var node = event.target;
    var pop = node._private.data.label
    node.qtip({
        content: "ラベルは" + pop,
        show: {
            event: event.type,
            ready: true,
            solo: true
        },
        hide: {
            event: 'mouseout'
        }
    }, event);
});



//cy.on('mouseover', 'node', function(event) {
//    console.log(event.target._private.data.id);
//});

// var evtTarget = event.cyTarget;
//evtTarget.isNode() and evtTarget.isEdge() 

cy.on('mousemove', 'node', function (evt) {
    var sel = evt.target;
    console.log("targetは" + sel._private.data.label);
    cy.elements().difference(sel.successors()).not(sel).addClass('semitransp');
    sel.addClass('highlight').successors().addClass('highlight');
});
cy.on('mouseout', 'node', function (evt) {
    var sel = evt.target;

    cy.elements().removeClass('semitransp');
    sel.removeClass('highlight').successors().removeClass('highlight');
});


/* cy.on('cxttap', "node", function(event) {
    var selclick = event.target;
    console.log("右クリックしたのは"+selclick._private.data.label);

}); */


cy.elements().qtip({
    content: '<p>サブメニュー</p><button id="add-to-report" class="btn btn-success">ノード追加</button><br><button class="btn btn-danger">ノード削除</button>',
    show: {
        event: 'cxttap'
    },
    position: {
        my: 'top center',
        at: 'bottom center'
    },
    style: {
        classes: 'qtip-bootstrap',
        tip: {
            width: 16,
            height: 8
        }
    }
});
