window.onload = readyPage;

var del1 = [];
var del2 = [];

function readyPage() {
    var divCounter = 0;
    var name;

    dishes();
    trash();
    plan();
    scoreboardDishes();
    scoreboardTrash();
    setInterval(scoreboardUpdate, 1000);
};

function plan() {
    document.getElementById("h1").innerHTML = "Week: " + getWeekNumber(new Date());
    var k2 = ["H3012", "H3005", "H3006", "H3007", "H3008", "H3009", "H3010", "H3011"];
    var k1 = ["H3016", "H3001", "H3002", "H3003", "H3004", "H3013", "H3014", "H3015"];
    var tasks = ["Mop the floor", "Vacuum the floor", "Take out paper, glass and metal and clean the trash cupboard", "Clean the kitchen and the counters", 'Wash the towls, mops and organize "Bøttekottet"', "Clean the comman areas (living room and dining room)", " ", " "];
    k1 = rotate(k1, getWeekNumber(new Date()));
    k2 = rotate(k2, getWeekNumber(new Date()));

    for (var t = 0; t < 8; t++) {
        var nodeK1 = document.createElement("Li");
        var textNodeK1 = document.createTextNode(k1[t]);
        nodeK1.appendChild(textNodeK1);

        var nodeK2 = document.createElement("Li");
        var textNodeK2 = document.createTextNode(k2[t]);
        nodeK2.appendChild(textNodeK2);

        var nodeT = document.createElement("Li");
        var textNodeT = document.createTextNode(tasks[t]);
        nodeT.appendChild(textNodeT);


        document.getElementById("listK1").appendChild(nodeK1);
        document.getElementById("listK2").appendChild(nodeK2);
        document.getElementById("listT").appendChild(nodeT);
    }
};

function rotate(rooms, week) {
    for (var i = 0; i <= week; i++) {
        rooms.unshift(rooms.pop());
    }
    return rooms;
};

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(d);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

function dishes() {
    firebase.database().ref('/dishes/').on('child_added', function(data) {
        firebase.database().ref('/users/').on('child_added', function(data1) {
            if (data1.val().userName === data.val().userName) {
                name = data1.val().name;
                var node = document.createElement("div");
                var breakLine = document.createElement("br");
                var boldNode = document.createElement("b")

                var userNode = document.createTextNode(name);
                boldNode.appendChild(userNode);
                node.appendChild(boldNode);
                node.appendChild(breakLine);

                var timeNode = document.createTextNode(data.val().time);
                node.appendChild(timeNode);
                node.setAttribute("class", "display")

                document.getElementById("listDishes").appendChild(node)
            }
        });
    });
};

function trash() {
    firebase.database().ref('/trash/').on('child_added', function(data) {
        firebase.database().ref('/users/').on('child_added', function(data1) {
            if (data1.val().userName === data.val().userName) {
                name = data1.val().name;

                var node = document.createElement("div");
                var breakLine = document.createElement("br");
                var boldNode = document.createElement("b")

                var userNode = document.createTextNode(name);
                boldNode.appendChild(userNode);
                node.appendChild(boldNode);
                node.appendChild(breakLine);

                var timeNode = document.createTextNode(data.val().time);
                node.appendChild(timeNode);
                node.setAttribute("class", "display")

                document.getElementById("listTrash").appendChild(node)
            }
        });
    });
};


function scoreboardDishes() {
    firebase.database().ref('/dishes/').on('child_added', function(data) {
        firebase.database().ref('/users/').on('child_added', function(data1) {
            if (data1.val().userName === data.val().userName) {
                if (getWeekNumber(data.val().time) == getWeekNumber(new Date())) {
                    del1.push(data1.val().name);
                }
            }
        });
    });
}

function scoreboardTrash() {
    firebase.database().ref('/trash/').on('child_added', function(data) {
        firebase.database().ref('/users/').on('child_added', function(data1) {
            if (data1.val().userName === data.val().userName) {
                if (getWeekNumber(data.val().time) == getWeekNumber(new Date())) {
                    del2.push(data1.val().name);
                }
            }
        });
    });
}

function scoreboardUpdate() {
    document.getElementById("sbDishes").innerHTML = "";
    document.getElementById("sbDishesS").innerHTML = "";
    document.getElementById("sbTrash").innerHTML = "";
    document.getElementById("sbTrashS").innerHTML = "";

    var countK1 = {};
    var countK2 = {};

    del1.forEach(function(i) { countK1[i] = (countK1[i] || 0) + 1; });
    del2.forEach(function(i) { countK2[i] = (countK2[i] || 0) + 1; });


    var tuplesK1 = [];

    for (var key in countK1) {
        tuplesK1.push([key, countK1[key]]);
    }

    tuplesK1.sort(function(a, b) {
        a = a[1];
        b = b[1];

        return a < b ? -1 : (a > b ? 1 : 0);
    });

    for (var i = tuplesK1.length - 1; i >= 0; i--) {
        var nodeT = document.createElement("Li");
        var textNodeT = document.createTextNode(tuplesK1[i][0]);
        nodeT.appendChild(textNodeT);

        var nodeTS = document.createElement("Li");
        var textNodeTS = document.createTextNode(tuplesK1[i][1]);
        nodeTS.appendChild(textNodeTS);

        document.getElementById("sbDishes").appendChild(nodeT);
        document.getElementById("sbDishesS").appendChild(nodeTS);
    }

    var tuplesK2 = [];

    for (var key2 in countK2) {
        tuplesK2.push([key2, countK2[key2]]);
    }

    tuplesK2.sort(function(a, b) {
        a = a[1];
        b = b[1];

        return a < b ? -1 : (a > b ? 1 : 0);
    });

    for (var i = tuplesK2.length - 1; i >= 0; i--) {

        var nodeT = document.createElement("Li");
        var textNodeT = document.createTextNode(tuplesK2[i][0]);
        nodeT.appendChild(textNodeT);

        var nodeTS = document.createElement("Li");
        var textNodeTS = document.createTextNode(tuplesK2[i][1]);
        nodeTS.appendChild(textNodeTS);

        document.getElementById("sbTrash").appendChild(nodeT);
        document.getElementById("sbTrashS").appendChild(nodeTS);
    }

}