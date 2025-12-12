/* ---- NAVIGATION ---- */
function goto(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* ---- THEME SWITCH ---- */
function toggleTheme() {
    const body = document.body;
    const isDark = document.getElementById("themeSwitch").checked;
    body.className = isDark ? "dark" : "light";
}

/* ---- JSON ---- */
function formatJSON() {
    try {
        document.getElementById("jsonOutput").textContent =
            JSON.stringify(JSON.parse(document.getElementById("jsonInput").value), null, 4);
    } catch {
        document.getElementById("jsonOutput").textContent = "Invalid JSON!";
    }
}

/* ---- BASE64 ---- */
function encodeBase64() {
    document.getElementById("b64Output").textContent =
        btoa(document.getElementById("b64Input").value);
}

function decodeBase64() {
    try {
        document.getElementById("b64Output").textContent =
            atob(document.getElementById("b64Input").value);
    } catch {
        document.getElementById("b64Output").textContent = "Invalid Base64!";
    }
}

/* ---- MARKDOWN ---- */
function renderMarkdown() {
    const md = document.getElementById("mdInput").value;
    const html = md
        .replace(/^### (.*)$/gim, "<h3>$1</h3>")
        .replace(/^## (.*)$/gim, "<h2>$1</h2>")
        .replace(/^# (.*)$/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*)\*/gim, "<i>$1</i>")
        .replace(/\`(.*)\`/gim, "<code>$1</code>")
        .replace(/\n/gim, "<br>");
    document.getElementById("mdOutput").innerHTML = html;
}

/* ---- UUID ---- */
function generateUUID() {
    document.getElementById("uuidOutput").textContent = crypto.randomUUID();
}

/* ---- REGEX ---- */
function testRegex() {
    try {
        const regex = new RegExp(document.getElementById("regexPattern").value, "g");
        const matches = document.getElementById("regexText").value.match(regex);
        document.getElementById("regexOutput").textContent =
            matches ? matches.join("\n") : "No matches.";
    } catch {
        document.getElementById("regexOutput").textContent = "Invalid regex!";
    }
}

/* ---- COLOR ---- */
function pickColor() {
    document.getElementById("colorOutput").textContent =
        `Selected color: ${document.getElementById("colorPicker").value}`;
}

/* ---- IMAGE COMPRESSOR ---- */
function compressImage() {
    const file = document.getElementById("imageInput").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width * 0.5;
            canvas.height = img.height * 0.5;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                document.getElementById("imageOutput").textContent =
                    `Compressed size: ${(blob.size / 1024).toFixed(2)} KB`;
            }, "image/jpeg", 0.7);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/* ---- HASHES ---- */
async function generateSHA256() {
    const data = document.getElementById("hashInput").value;
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
    document.getElementById("hashOutput").textContent =
        Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function generateMD5() {
    document.getElementById("hashOutput").textContent =
        CryptoJS.MD5(document.getElementById("hashInput").value).toString();
}

/* ---- TIMESTAMP ---- */
function convertTimestamp() {
    const ts = Number(document.getElementById("timestampInput").value);
    document.getElementById("timestampOutput").textContent =
        new Date(ts * 1000).toString();
}
