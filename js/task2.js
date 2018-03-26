function byField(field) {
    return function (value1, value2) {
        return value1[field] > value2[field] ? 1 : -1;
    }
}

function showResult(result) {
    var div = document.getElementById("result"); //вытягиваем наш div
    buffer = "";


    result.forEach(function (person) {
        buffer += "name: " + person.name;
        buffer += "; surname: " + person.surname;
        buffer += "; age: " + person.age + "<br>";
    });

    div.innerHTML = buffer;
}


(function () {
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

    showResult(users);

    sortOps.addEventListener("click", function () {
        var field = sortVal.value.toLowerCase();

        users.sort(byField(field));
        showResult(users);
    });
})();