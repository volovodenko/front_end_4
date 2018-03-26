var myLib = (function () {  //библиотека

    result = {};

    result.makeBuffer = function () {
        var currentBuffer = [];

        function bufferOps(value) {
            return !value ? currentBuffer : currentBuffer.push(value);
        }

        bufferOps.clear = function () {
            currentBuffer = [];
        };

        return bufferOps;
    };

    return result;

})();


var run = (function () { //библиотека отображения данных

    result = {};

    result.buffer = function () {
        var buffer = myLib.makeBuffer(), //подключаем буффер
            submit = document.getElementById("submit"),
            clearBuffer = document.getElementById("clear"),
            div = document.getElementById("bufferResult"); //вытягиваем наш div

        function showBuffer() {
            var currentResult = "";

            div.innerHTML = "";

            buffer().forEach(function (person) {

                currentResult += "<p>" + "<b>name:</b> " + person.name + ";</p>";
                currentResult += "<p><b>surname:</b> " + person.surname + ";</p>";
                currentResult += "<p><b>age:</b> " + person.age + "</p><hr>";

                div.innerHTML = currentResult;
            });
        }


        submit.addEventListener("click", function () {
            var currentUser = {},
                name = document.getElementById("name"),
                surname = document.getElementById("surname"),
                age = document.getElementById("age");

            if (!name.value || !surname.value || !age.value || !+age.value || +age.value <= 0) {
                alert("Введите корректные данные");
                return false;
            }

            currentUser.name = name.value;
            currentUser.surname = surname.value;
            currentUser.age = age.value;

            buffer(currentUser); //заганяем значение в буффер

            name.value = "";
            surname.value = "";
            age.value = "";

            showBuffer(); //отображаем буффер
        });

        clearBuffer.addEventListener("click", function () {
            buffer.clear(); //очищаем буффер
            showBuffer(); //отображаем буффер
        });
    };

    return result;

})();


run.buffer();