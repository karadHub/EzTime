(function () {
    var timer = null;
    var duration;
    var counter = 0;
    var startTime;

    const normal_elapse = 1000;
    var next_elapse = normal_elapse;

    var start_button, pause_button, reset_button, set_button;
    var hour_input, min_input, sec_input;
    var timer_main;

    document.addEventListener("DOMContentLoaded", (event) => {
        start_button = document.getElementById("start_button_countdown");
        pause_button = document.getElementById("pause_button");
        reset_button = document.getElementById("reset_button_countdown");
        set_button = document.getElementById("set_button");

        hour_input = document.getElementById("hour_input");
        min_input = document.getElementById("min_input");
        sec_input = document.getElementById("sec_input");

        timer_main = document.getElementById("timer_main");

        if (pause_button) pause_button.disabled = true;
        if (hour_input) hour_input.value = "00";
        if (min_input) min_input.value = "00";
        if (sec_input) sec_input.value = "00";
        if (timer_main) updateCounter();

        // Initialize preset functionality
        initializePresets();
        loadCustomPresets();
    });

    window.start = function () {
        if (!start_button) return;
        start_button.disabled = true;
        pause_button.disabled = false;
        set_button.disabled = true;
        disableInputs(true);

        startTime = new Date().valueOf();

        if (counter < 0) {
            counter = 0;
        }
        duration = counter;
        timer = window.setTimeout(onTimer, next_elapse);
    };

    window.pause = function () {
        if (!start_button) return;
        start_button.disabled = false;
        pause_button.disabled = true;
        set_button.disabled = false;
        disableInputs(false);

        window.clearTimeout(timer);
    };

    window.reset = function () {
        if (!start_button) return;
        start_button.disabled = false;
        pause_button.disabled = true;
        set_button.disabled = false;
        reset_button.disabled = true;
        disableInputs(false);

        hour_input.value = "00";
        min_input.value = "00";
        sec_input.value = "00";

        setTime();
    };

    window.setTime = function () {
        if (!start_button) return;
        start_button.disabled = false;
        pause_button.disabled = true;
        set_button.disabled = false;
        disableInputs(false);

        var hour = hour_input.value;
        var min = min_input.value;
        var sec = sec_input.value;

        if (isNaN(hour) || isNaN(min) || isNaN(sec)) {
            return;
        }

        var hour_num = Number(hour);
        var min_num = Number(min);
        var sec_num = Number(sec);
        counter = hour_num * 3600 + min_num * 60 + sec_num;
        duration = undefined;
        updateCounter();

        window.clearTimeout(timer);
    };

    function disableInputs(disabled) {
        hour_input.disabled = disabled;
        min_input.disabled = disabled;
        sec_input.disabled = disabled;
        const presetButtons = document.querySelectorAll(
            ".preset-btn, .custom-preset-btn"
        );
        presetButtons.forEach((btn) => (btn.disabled = disabled));
    }

    function padZero(n) {
        return n < 10 ? "0" + n : n;
    }

    function updateCounter() {
        if (!timer_main) return;
        let t = Math.max(counter, 0);
        let h = Math.floor(t / 3600);
        let m = Math.floor(t / 60) % 60;
        let s = Math.floor(t) % 60;
        timer_main.innerHTML = `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
        let color = "#e0f7ff";
        if (duration !== undefined) {
            if (counter < 0 && counter % 2 === 0) {
                color = "red";
            } else if (counter > 0 && counter < 10) {
                color = "#ffc107"; // A warning yellow
            }
        }
        timer_main.style.color = color;
    }

    function onTimer() {
        counter--;
        updateCounter();
        window.clearTimeout(timer);
        if (counter < 0) {
            // Changed to < 0 to allow 00:00:00 to show
            start_button.disabled = true;
            pause_button.disabled = true;
            set_button.disabled = false;
            disableInputs(false);
            // Flash timer when done
            let flash = true;
            const flashInterval = setInterval(() => {
                timer_main.style.visibility = flash ? "hidden" : "visible";
                flash = !flash;
            }, 500);
            // Stop flashing after a few seconds
            setTimeout(() => {
                clearInterval(flashInterval);
                timer_main.style.visibility = "visible";
            }, 5000);
            return;
        }

        var counterSecs = (duration - counter) * 1000;
        var elapseSecs = new Date().valueOf() - startTime;
        var diffSecs = counterSecs - elapseSecs;
        next_elapse = normal_elapse + diffSecs;
        if (next_elapse < 0) {
            next_elapse = 0;
        }

        timer = window.setTimeout(onTimer, next_elapse);
    }

    // Preset timer functionality
    function initializePresets() {
        const presetButtons = document.querySelectorAll(".preset-btn");
        const savePresetBtn = document.getElementById("save-preset-btn");

        presetButtons.forEach((btn) => {
            btn.addEventListener("click", function () {
                const hours = this.dataset.hours.padStart(2, "0");
                const minutes = this.dataset.minutes.padStart(2, "0");
                const seconds = this.dataset.seconds.padStart(2, "0");

                hour_input.value = hours;
                min_input.value = minutes;
                sec_input.value = seconds;

                setTime();
            });
        });

        if (savePresetBtn) {
            savePresetBtn.addEventListener("click", function () {
                const h = hour_input.value;
                const m = min_input.value;
                const s = sec_input.value;
                if (h === "00" && m === "00" && s === "00") {
                    alert("Please set a time before saving a preset.");
                    return;
                }
                const name = prompt(
                    `Enter a name for this preset (${h}:${m}:${s}):`
                );
                if (name && name.trim()) {
                    saveCustomPreset(name.trim(), h, m, s);
                }
            });
        }
    }

    function saveCustomPreset(name, hours, minutes, seconds) {
        const preset = { name, hours, minutes, seconds };

        let customPresets = JSON.parse(
            localStorage.getItem("customPresets") || "[]"
        );
        customPresets.push(preset);
        localStorage.setItem("customPresets", JSON.stringify(customPresets));

        loadCustomPresets();
    }

    function loadCustomPresets() {
        const customPresetsContainer =
            document.getElementById("custom-presets");
        if (!customPresetsContainer) return;

        const customPresets = JSON.parse(
            localStorage.getItem("customPresets") || "[]"
        );
        customPresetsContainer.innerHTML = "";

        customPresets.forEach((preset, index) => {
            const presetBtn = document.createElement("button");
            presetBtn.className = "preset-btn custom-preset-btn";
            presetBtn.innerHTML = `${preset.name}<br><small>${preset.hours}:${preset.minutes}:${preset.seconds}</small>`;

            presetBtn.addEventListener("click", function () {
                hour_input.value = preset.hours;
                min_input.value = preset.minutes;
                sec_input.value = preset.seconds;
                setTime();
            });

            const deleteBtn = document.createElement("span");
            deleteBtn.className = "delete-btn";
            deleteBtn.innerHTML = "×";
            deleteBtn.title = "Delete preset";
            deleteBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                deleteCustomPreset(index);
            });

            presetBtn.appendChild(deleteBtn);
            customPresetsContainer.appendChild(presetBtn);
        });
    }

    function deleteCustomPreset(index) {
        if (confirm("Are you sure you want to delete this preset?")) {
            let customPresets = JSON.parse(
                localStorage.getItem("customPresets") || "[]"
            );
            customPresets.splice(index, 1);
            localStorage.setItem(
                "customPresets",
                JSON.stringify(customPresets)
            );
            loadCustomPresets();
        }
    }
})();
