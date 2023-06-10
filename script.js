var canvas = document.getElementsByClassName('main_canvas')[0]
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height
var delta_x = 4/width
var delta_y = 4/height
var r = 100
var k = 70
var delta = .01
var colors = ["#00008a", "#00008a", "#070791", "#0a0a95",
    "#0b0b99", "#0c0ca0", "#0e0ea5", "#1111ab",
    "#1313ae", "#1414af", "#1818b5", "#1d1db9",
    "#2020c1", "#2424c1", "#2828c5", "#2b2bc8",
    "#2e2ec9", "#3131cc", "#3838cf", "#3d3dd2",
    "#4040d3", "#4646d6", "#4c4cd8", "#5151db",
    "#5858e1", "#6060e3", "#6868e8", "#7070e9",
    "#7b7bec", "#8a8aed", "#9e9ef5", "#b5b5f5",
    "#c8c8f5", "#b3caf3", "#c8d9f7", "#e4edfc",
    "#fef6f6", "#fce1e1", "#fbd1d1", "#fccbcb",
    "#fcc4c4", "#fbb9b9", "#f9acac", "#fb9f9f",
    "#f99595", "#f78888", "#f87d7d", "#fb7474",
    "#f96c6c", "#f76565", "#f05d5d", "#f45757",
    "#f35050", "#f54b4b", "#f44444", "#f13c3c",
    "#f13434", "#ee2727", "#e91a1a", "#ee2d2d",
    "#ec2828", "#ea2222", "#e51b1b", "#e61717",
    "#e21414", "#dd1010", "#d80c0c", "#d30909",
    "#cb0505", "#c00404", "#9c0202", "#000000"]

function X(x0, x) {
    return (x0-x)/delta_x
}
function Y(y0, y) {
    return (y0-y)/delta_y
}

function start(x1, y1, x2, y2) {
    var map = [0, 0], map0 = [[0, 0]], z = 0;
    var marker = false
    for (let i = 0; i < k; i++)
        map0.concat([[0, 0]])
    for (let i = height * y2/(y1-y2); i <= height * y1/(y1-y2); i++) {
        for (let j = width * x1/(x2-x1); j <= width * x2/(x2-x1); j++) {
            map = [delta_x * j, delta_y * i]
            z = Math.hypot(map[0], map[1])
            map0[0][0] = map[0]
            map0[0][1] = map[1]
            if (z > r) {
                ctx.fillStyle = colors[0]
                ctx.fillRect(X(map[0], x1), Y(map[1], y2), 1, 1)
                continue
            }
            marker = true
            for (let l = 1; l < k + 1; l++) {
                map0[l] = [map0[l - 1][0] * map0[l - 1][0] - map0[l - 1][1] * map0[l - 1][1] + map[0],
                    2 * map0[l - 1][0] * map0[l - 1][1] + map[1]]
                z = Math.hypot(map0[l][0], map0[l][1])
                if (z > r) {
                    ctx.fillStyle = colors[l]
                    ctx.fillRect(X(map[0], x1), Y(map[1], y2), 1, 1)
                    marker = false
                    break
                }
            }
            if (marker) {
                ctx.fillStyle = colors[k + 1]
                ctx.fillRect(X(map[0], x1), Y(map[1], y2), 1, 1)
            }
        }
    }
}

var x1 = -8/3
var y1 = 2
var x2 = 4/3
var y2 = -2
start(x1, y1, x2, y2)

document.getElementsByTagName("canvas")[0].onclick = e => {
    console.log(e)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, width, height)
    var size_x = x2-x1
    var size_y = y1-y2
    delta = size_x/4
    x2 = e.layerX*delta_x + (size_x-delta)/2 + x1
    x1 = e.layerX*delta_x - (size_x-delta)/2 + x1
    y1 = e.layerY*delta_y + (size_y-delta)/2 + y2
    y2 = e.layerY*delta_y - (size_y-delta)/2 + y2
    delta_x = (x2-x1)/width
    delta_y = (y1-y2)/height
    start(x1, y1, x2, y2)
}
