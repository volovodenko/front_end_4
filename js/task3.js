var myLib = (function () {  //библиотека

    result = {};

    result.makeBuffer = function () {
        var currentBuffer = [];

        function bufferOps(value) {
            return !value ? currentBuffer.join(", ") : currentBuffer.push(value);
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

    result = {};

    result.buffer = function () {
        var buffer = myLib.makeBuffer(), //подключаем буффер
            bufferVal = document.getElementById("bufferVal"),
            clearBuffer = document.getElementById("clearBuffer"),
            showBuffer = document.getElementById("showBuffer"),
            addBuffer = document.getElementById("addBuffer"),
            bufferResult = document.getElementById("bufferResult");

        addBuffer.addEventListener("click", function () {
            buffer(bufferVal.value);
        });

        clearBuffer.addEventListener("click", function () {
            buffer.clear();
        });

        showBuffer.addEventListener("click", function () {
            bufferResult.innerHTML = buffer();
        });
    };


    result.usersSort = function () {
        var sortVal = document.getElementById("sortVal"),
            sortOps = document.getElementById("sortOps"),
            users = [
                {
                    name: "Вася",
                    surname: 'Иванов',
                    age: 20
                },
                {
                    name: "Петя",
                    surname: 'Чапаев',
                    age: 25
                },
                {
                    name: "Маша",
                    surname: 'Медведева',
                    age: 18
                },
                {
                    name: "Арни",
                    surname: 'Шварц',
                    age: 35
                }
            ];


        function showResult(result) {
            var div = document.getElementById("result"); //вытягиваем наш div
            div.innerHTML = "";

            result.forEach(function (person) {
                div.innerHTML += "name: " + person.name;
                div.innerHTML += "; surname: " + person.surname;
                div.innerHTML += "; age: " + person.age + "<br>";
            });
        }

        showResult(users);

        sortOps.addEventListener("click", function () {
            var field = sortVal.value.toLowerCase();

            users.sort(myLib.byField(field)); //сортируем через библиотеку
            showResult(users);
        });
    };

    return result;

})();


run.buffer();
run.usersSort();