function makeBuffer() {
    var currentBuffer = [];

    function bufferOps(value) {
        return !value ? currentBuffer.join(", ") : currentBuffer.push(value);
    }

    bufferOps.clear = function () {
        currentBuffer = [];
    };

    return bufferOps;
}

(function () {
    var buffer = makeBuffer(),
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
})();