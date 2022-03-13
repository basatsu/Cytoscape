var cy = cytoscape({
    container: document.getElementById('cy'),
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
    style: [
        {
            selector: 'send',
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
        classes: 'send'

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
//var j = cy.$('#BBB02');
//var xp = cy.$('#j').position('x');
//var yp = cy.$('#j').position('y');
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
