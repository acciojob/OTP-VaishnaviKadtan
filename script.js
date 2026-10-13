//your JS code here. If required.

const codes = document.querySelectorAll(".code");

codes.forEach((code, index) => {
    // Move to the next input after entering a digit
    code.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "");

        e.target.value = value.slice(-1);

        if (e.target.value && index < codes.length - 1) {
            codes[index + 1].focus();
        }
    });

    // Handle Backspace
    code.addEventListener("keydown", (e) => {
        if (e.key === "Backspace") {
            if (code.value) {
                code.value = "";
            }

            if (index > 0) {
                if (!code.value) {
                    codes[index - 1].value = "";
                }

                codes[index - 1].focus();
            }
        }

        // Allow only numeric digits and navigation keys
        if (
            e.key.length === 1 &&
            !/[0-9]/.test(e.key)
        ) {
            e.preventDefault();
        }
    });

    // Support pasting a six-digit OTP
    code.addEventListener("paste", (e) => {
        e.preventDefault();

        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        pastedData.split("").forEach((digit, i) => {
            codes[i].value = digit;
        });

        const nextIndex = Math.min(
            pastedData.length,
            codes.length - 1
        );

        codes[nextIndex].focus();
    });
});

// Focus the first input automatically
codes[0].focus();
