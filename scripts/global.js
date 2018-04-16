window.onload = start;

function start() {

	document.getElementById("h1").innerHTML = "Week: " + getWeekNumber(new Date());
    var k2 = ["H3012", "H3005", "H3006", "H3007", "H3008", "H3009", "H3010", "H3011"];
    var k1 = ["H3016", "H3001", "H3002", "H3003", "H3004", "H3013", "H3014", "H3015"];

    k1 = rotate(k1, getWeekNumber(new Date()));
    k2 = rotate(k2, getWeekNumber(new Date()));

    for (var t = 0; t < 8; t++) {
        document.getElementById("k1" + "t" + (t + 1)).innerHTML = k1[t];
        document.getElementById("k2" + "t" + (t + 1)).innerHTML = k2[t];
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
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
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