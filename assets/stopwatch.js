(function () {
    var timer = null;
    var counter = 0;
    var tcount = 0;
    var startTime;

    const normal_elapse = 10;
    var next_elapse = normal_elapse;

    var start_button_stopwatch,
        stop_button,
        reset_button_stopwatch,
        stopwatch_main;

    document.addEventListener("DOMContentLoaded", (event) => {
        start_button_stopwatch = document.getElementById(
            "start_button_stopwatch"
        );
        stop_button = document.getElementById("stop_button");
        reset_button_stopwatch = document.getElementById(
            "reset_button_stopwatch"
        );
        stopwatch_main = document.getElementById("stopwatch_main");

        if (start_button_stopwatch) {
            start_button_stopwatch.disabled = false;
            stop_button.disabled = true;
            reset_button_stopwatch.disabled = true;
            updateCounter();
        }
    });

    window.startStopwatch = function () {
        if (!start_button_stopwatch) return;
        start_button_stopwatch.disabled = true;
        stop_button.disabled = false;
        reset_button_stopwatch.disabled = true;

        startTime = new Date().valueOf();
        timer = window.setTimeout(onTimer, next_elapse);
    };

    window.stopStopwatch = function () {
        if (!start_button_stopwatch) return;
        start_button_stopwatch.disabled = false;
        stop_button.disabled = true;
        reset_button_stopwatch.disabled = false;

        tcount = 0;
        window.clearTimeout(timer);
    };

    window.resetStopwatch = function () {
        if (!start_button_stopwatch) return;
        start_button_stopwatch.disabled = false;
        stop_button.disabled = true;
        reset_button_stopwatch.disabled = true;

        counter = 0;
        tcount = 0;
        updateCounter();
        window.clearTimeout(timer);
    };

    function padZero(n) {
        return n < 10 ? "0" + n : n;
    }

    function updateCounter() {
        if (!stopwatch_main) return;
        let m = Math.floor(counter / 100 / 60);
        let s = Math.floor(counter / 100) % 60;
        let ms = Math.floor(counter) % 100;

        stopwatch_main.innerHTML = `<strong>${padZero(m)}:${padZero(
            s
        )},${padZero(ms)}</strong>`;
        stopwatch_main.style.color = "#A3DAFD";
    }

    function onTimer() {
        counter++;
        tcount++;
        updateCounter();
        window.clearTimeout(timer);

        var tcountSecs = tcount * 10;
        var elapseSecs = new Date().valueOf() - startTime;
        var diffSecs = tcountSecs - elapseSecs;
        next_elapse = normal_elapse + diffSecs;
        if (next_elapse < 0) {
            next_elapse = 0;
        }
        timer = window.setTimeout(onTimer, next_elapse);
    }
})();
