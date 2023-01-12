const message = document.getElementById("message");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const X_CENTER = 220;
const Y_CENTER = 228;
const LINE_LENGTH = 20;


loadCanvas();


function getNearestY(yval, rval) {
    return -(yval - Y_CENTER) / (2 * LINE_LENGTH) * rval / 4;
}

function getNearestX(xval, rval) {
    return ((xval - X_CENTER) / LINE_LENGTH) / 2 * rval / 4;
}

function getCursorPosition(event) {
    rval = getR();
    const x = getNearestX(event.offsetX, rval);
    const y = getNearestY(event.offsetY, rval);
    setPointFixed(x, y);
    setCoorToSend(x, y);
}

function setCoorToSend(xval, yval) {
    document.getElementById("x-value").value = xval;
    document.getElementById("y-value").value = yval;
}

function setRadiusToSend(rval) {
    document.getElementById("r-value").value = rval;
}

function sendReq() {
    document.getElementById("send-data-form").submit();

}

function getX() {
    let xtemp = document.getElementById("x-value").value
    let xval = parseFloat(xtemp);
    if (xval == null || isNaN(xval)) return 9;
    return xtemp;
}

function getY() {
    let ytemp = document.getElementById("y-value").value;
    let yval = parseFloat(ytemp);
    if (yval == null || isNaN(yval)) return 9;
    return ytemp;
}

function getR() {
    let rtemp = document.getElementById("r-value").value;
    let rval = parseFloat(rtemp);
    if (rval == null || isNaN(rval)) return -1;
    return rtemp;
}

canvas.addEventListener('click', function (e) {
    if (isRCorrect()) {
        document.getElementById("flag").value = true;
        let xval = getX();
        let yval = getY();
        let rval = getR();
        if (rval !== -1) {
            drawArea();
            setRadiusToSend(rval);
            if (xval !== 9 && yval !== 9) {
                setPoint(xval, yval);
                setCoorToSend(xval, yval);
                message.textContent = ""
            } else {
                getCursorPosition(e);
            }
            drawLastPoint();
            sendReq();
        }

    }


});

function loadCanvas() {
    drawArea();
    drawLastPoint();
}

function setPoint(xval, yval, rval) {
    ctx.beginPath();
    ctx.fillStyle = '#eb5201';
    ctx.arc(X_CENTER + xval * 2 * 4 / rval * LINE_LENGTH, Y_CENTER - yval * 2 * 4 / rval * LINE_LENGTH, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function setPointFixed(xval, yval) {
    ctx.beginPath();
    ctx.fillStyle = '#eda618';
    ctx.arc(X_CENTER + xval * 2 * 4 / rval * LINE_LENGTH, Y_CENTER - yval * 2 * 4 / rval * LINE_LENGTH, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

//TODO поставить радиус на картинке


function drawArea() {
    ctx.beginPath();

    //треугольник
    ctx.fillStyle = '#759242';
    ctx.moveTo(X_CENTER - 8 * LINE_LENGTH, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER + 4 * LINE_LENGTH);
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.fill();
    ctx.closePath();

    // прямоугольник
    ctx.beginPath();
    ctx.fillStyle = '#DED3A6';
    ctx.fillRect(X_CENTER, Y_CENTER, 4 * LINE_LENGTH, 8 * LINE_LENGTH);
    ctx.closePath();

    // четверть круга
    ctx.beginPath();
    ctx.fillStyle = '#374709';
    ctx.moveTo(X_CENTER, Y_CENTER);
    ctx.lineTo(X_CENTER - 4 * LINE_LENGTH, Y_CENTER);
    ctx.lineTo(X_CENTER, Y_CENTER);
    ctx.fill();
    ctx.arc(X_CENTER, Y_CENTER, 4 * LINE_LENGTH, Math.PI, Math.PI * 1.5);
    ctx.fill();
    ctx.closePath();

}

//точки
function drawLastPoint() {
    let x = document.getElementsByClassName('x-table');
    let y = document.getElementsByClassName('y-table');
    let r = document.getElementsByClassName('r-table');
    for (let i = 0; i < x.length; ++i) {
        setPoint(parseFloat(x[i].textContent), parseFloat(y[i].textContent), parseFloat(r[i].textContent));
    }
}