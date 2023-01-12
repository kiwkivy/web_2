function isCorrect() {
    //border="1" cellpadding="10" cellspacing="0" width="100%"
    let val_y = document.getElementById("y")
    let val_r = document.getElementById("r")

    document.getElementById('err_y').innerHTML = ""
    document.getElementById('err_r').innerHTML = ""
    document.getElementById('err_range').innerHTML = ""
    if (val_y.value.match(/^-?\d+[.,]?\d*$/) == null) {
        document.getElementById('err_y').innerHTML
            = "бедному игорю (y) тоже досталось, ведь он хотел быть от -3 до 5..."

    }
    if (val_r.value.match(/^-?\d+[.,]?\d*$/) == null) {
        document.getElementById('err_r').innerHTML = "как можно было испортить радиус? От 1 до 4 надо"
    }
    let isOk = (val_y.value.match(/^-?\d+[.,]?\d*$/) != null &&
        val_r.value.match(/^-?\d+[.,]?\d*$/) != null)
    if (isOk) {
        val_y.value = val_y.value.replace(",", ".")
        val_r.value = val_r.value.replace(",", ".")
        let numY = Number(val_y.value)
        let numR = Number(val_r.value)
        let count = 0;

        if (numR > 1 && numR < 4) {
            count++;
        } else document.getElementById('err_r').innerHTML = "диапазон кста: (1;4)"
        if (numY > -3 && numY < 5) {
            count++;
        } else document.getElementById('err_y').innerHTML = "значение от -3 до 5( надо"

        if (count === 2) {
            return true
        }
    } else {
        document.getElementById('err_range').innerHTML = "мне лень проверять диапазон, у Вас формат " +
            "неверный даже"
    }
    return false
}


function isRCorrect() {
    let val_r = document.getElementById("r")
    if (val_r.value === "") {
        document.getElementById('err_canvas').innerHTML = "введите радиус пожалуйста я так не работаю"
        return false;
    }
    document.getElementById('err_r').innerHTML = ""
    if (val_r.value.match(/^-?\d+[.,]?\d*$/) == null) {
        document.getElementById('err_r').innerHTML = "как можно было испортить радиус"
        return false;
    }
    if (val_r.value > 1 && val_r.value < 4) {
    } else {
        document.getElementById('err_r').innerHTML = "ну от 1 до 4............";
        return false;
    }
    return true

}


function typeROnAction() {
    document.getElementById("r-value").value = document.getElementById("r").value;
}