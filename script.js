/* JSON FORMATTER */
function formatJSON() {
    const input = document.getElementById("jsonInput").value;
    const output = document.getElementById("jsonOutput");
    try {
        output.textContent = JSON.stringify(JSON.parse(input), null, 4);
    } catch {
        output.textContent = "Invalid JSON!";
    }
}

/* BASE64 */
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

/* MARKDOWN */
function renderMarkdown() {
    const md = document.getElementById("mdInput").value;
    const html = md
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*)\*/gim, "<i>$1</i>")
        .replace(/\`(.*)\`/gim, "<code>$1</code>")
        .replace(/\n/gim, "<br>");
    document.getElementById("mdOutput").innerHTML = html;
}

/* UUID */
function generateUUID() {
    document.getElementById("uuidOutput").textContent = crypto.randomUUID();
}

/* REGEX */
function testRegex() {
    const pattern = document.getElementById("regexPattern").value;
    const text = document.getElementById("regexText").value;

    try {
        const regex = new RegExp(pattern, "g");
        const matches = text.match(regex);
        document.getElementById("regexOutput").textContent =
            matches ? matches.join("\n") : "No matches.";
    } catch {
        document.getElementById("regexOutput").textContent = "Invalid regex!";
    }
}

/* COLOR PICKER */
function pickColor() {
    const color = document.getElementById("colorPicker").value;
    document.getElementById("colorOutput").textContent = `Selected: ${color}`;
}

/* IMAGE COMPRESSOR */
function compressImage() {
    const file = document.getElementById("imageInput").files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const scale = 0.5; // 50% compression
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
                document.getElementById("imageOutput").textContent =
                    `Compressed image size: ${(blob.size / 1024).toFixed(2)} KB`;
            }, "image/jpeg", 0.7);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

/* HASH GENERATOR */
async function generateSHA256() {
    const text = document.getElementById("hashInput").value;
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    document.getElementById("hashOutput").textContent =
        [...new Uint8Array(hashBuffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function generateMD5() {
    document.getElementById("hashOutput").textContent = CryptoJS.MD5(
        document.getElementById("hashInput").value
    ).toString();
}

/* TIMESTAMP */
function convertTimestamp() {
    const input = document.getElementById("timestampInput").value;
    const date = new Date(input * 1000);
    document.getElementById("timestampOutput").textContent = date.toString();
}
