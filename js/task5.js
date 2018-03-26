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

    result.byField = function (field) {
        return function (value1, value2) {
            return value1[field] > value2[field] ? 1 : -1;
        }
    };

    return result;

})();


var run = (function () { //библиотека отображения данных
    var buffer = myLib.makeBuffer(); //подключаем буффер

    result = {};

    function showBuffer(value) {
        var currentResult = "",
            div = document.getElementById("bufferResult"); //вытягиваем наш div

        div.innerHTML = "";

        value.forEach(function (person) {

            currentResult += "<p>" + "<b>name:</b> " + person.name + ";</p>";
            currentResult += "<p><b>surname:</b> " + person.surname + ";</p>";
            currentResult += "<p><b>age:</b> " + person.age + "</p><hr>";

            div.innerHTML = currentResult;
        });
    }

    result.buffer = function () {
        var submit = document.getElementById("submit"),
            clearBuffer = document.getElementById("clear");


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

            showBuffer(buffer()); //отображаем буффер
        });

        clearBuffer.addEventListener("click", function () {
            buffer.clear(); //очищаем буффер
            showBuffer(buffer()); //отображаем буффер
        });
    };

    result.usersSort = function () {
        var sortVal = document.getElementById("sortVal"),
            sortOps = document.getElementById("sortOps"),
            users = buffer();

        sortOps.addEventListener("click", function () {
            var field = sortVal.value.toLowerCase();

            users.sort(myLib.byField(field)); //сортируем через библиотеку
            showBuffer(users);
        });
    };

    return result;

})();


run.buffer();
run.usersSort();
