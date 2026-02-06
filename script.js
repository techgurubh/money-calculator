/* ===== Date & Day ===== */
const now = new Date();
document.getElementById("dayDateText").textContent =
  now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short"
  });

/* ===== Calculator Logic ===== */
const denominations = [500, 200, 100, 50, 20, 10];

const denomContainer = document.getElementById("denominationRows");
const grandTotalEl = document.getElementById("grandTotal");
const addInput = document.getElementById("addAmount");
const addTotalEl = document.getElementById("addTotal");
const expectedInput = document.getElementById("expectedAmount");
const differenceEl = document.getElementById("difference");
const compareBtn = document.getElementById("compareBtn");
const clearBtn = document.getElementById("clearBtn");

/* Create rows */
denominations.forEach(val => {
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `
    <span class="label">${val}</span>
    <input type="number" class="qty" data-value="${val}" placeholder="0" />
    <span class="equals">=</span>
    <span class="total">0</span>
  `;
  denomContainer.appendChild(row);
});

function calculate() {
  let total = 0;

  document.querySelectorAll("[data-value]").forEach(input => {
    const qty = Number(input.value) || 0;
    const value = Number(input.dataset.value);
    const rowTotal = qty * value;
    input.parentElement.querySelector(".total").textContent = rowTotal;
    total += rowTotal;
  });

  const addVal = Number(addInput.value) || 0;
  addTotalEl.textContent = addVal;
  total += addVal;

  grandTotalEl.textContent = total;
  compareBtn.disabled = !expectedInput.value;
}

compareBtn.addEventListener("click", () => {
  const diff = Number(grandTotalEl.textContent) -
               Number(expectedInput.value);
  differenceEl.textContent = (diff > 0 ? "+" : "") + "₹" + diff;
  differenceEl.style.color = diff >= 0 ? "#baffc9" : "#ff9aa2";
});

clearBtn.addEventListener("click", () => {
  document.querySelectorAll("input").forEach(i => i.value = "");
  document.querySelectorAll(".total").forEach(t => t.textContent = "0");
  differenceEl.textContent = "0";
  differenceEl.style.color = "#fff";
  grandTotalEl.textContent = "0";
  compareBtn.disabled = true;
});

document.addEventListener("input", calculate);

/* ===== Colored Floating Particles ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const colors = ["#d6b3ff", "#baffc9", "#ffb3c6", "#9ad0ff"];

const particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
  color: colors[Math.floor(Math.random() * colors.length)]
}));

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
