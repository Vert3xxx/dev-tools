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
    const input = document.getElementById("b64Input").value;
    document.getElementById("b64Output").textContent = btoa(input);
}

function decodeBase64() {
    const input = document.getElementById("b64Input").value;
    try {
        document.getElementById("b64Output").textContent = atob(input);
    } catch {
        document.getElementById("b64Output").textContent = "Invalid Base64!";
    }
}

/* MARKDOWN PREVIEW */
function renderMarkdown() {
    const md = document.getElementById("mdInput").value;

    // Simple Markdown parser
    let html = md
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*)\*/gim, "<i>$1</i>")
        .replace(/\`(.*)\`/gim, "<code>$1</code>")
        .replace(/\n/gim, "<br>");

    document.getElementById("mdOutput").innerHTML = html;
}

/* UUID GENERATOR */
function generateUUID() {
    const uuid = crypto.randomUUID();
    document.getElementById("uuidOutput").textContent = uuid;
}
