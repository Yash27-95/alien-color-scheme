const select = document.getElementById("scheme")
const schemeList = document.getElementById("scheme-list")

select.addEventListener("change", function() {
    const option = this.options[this.selectedIndex]
    document.querySelectorAll("#scheme option").forEach(option => option.classList.remove("highlighted-option"))
    option.classList.add("highlighted-option")
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const seed = formData.get("seed-color").slice(1)
    const scheme = formData.get("scheme")
    renderScheme(seed, scheme, 6)
})

function placeHoldColor() {
    const cleanColors = [
    "#F94144", // Bright Red
    "#F3722C", // Orange
    "#F8961E", // Warm Yellow
    "#F9C74F", // Soft Yellow
    "#90BE6D", // Green
    "#43AA8B", // Teal
    "#4D908E", // Muted Cyan
    "#577590", // Steel Blue
    "#277DA1", // Deep Blue
    "#9B5DE5", // Purple
    "#E056FD", // Bright Violet
    "#FF6F61"  // Coral Red
    ];
    const randomNum = Math.floor(Math.random() * (cleanColors.length-1)) + 1;
    document.getElementById("seed-color").value = cleanColors[randomNum]
    return cleanColors[randomNum].slice(1)
}

function copyToClipboard(code) {
    navigator.clipboard.writeText(code)
        .then(() => alert(`Copied: ${code}`))
        .catch(err => console.error("Failed to copy:", err));
}

function renderScheme(hex=placeHoldColor(), mode="monochrome", count=6) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=${count}`)
        .then(res => res.json())    
        .then(data => {
            const colorsArr = data.colors
            let colorsStr = ""
            for(let x of colorsArr){
                const colorCode = x.hex.value
                colorsStr += `
                    <div id="${colorCode}" class="color" style="background-color: ${colorCode};">
                        <span onclick="copyToClipboard('${colorCode}')">
                            ${colorCode}
                            <i class="fa-solid fa-copy"></i>
                        </span>
                    </div>
                `
            }
            schemeList.innerHTML = colorsStr
        })
}

renderScheme()

