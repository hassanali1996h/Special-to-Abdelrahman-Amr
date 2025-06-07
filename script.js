// script.js

// تحميل السور من ملف JSON fetch("surahs_full.json") .then(response => response.json()) .then(data => { console.log("✅ تم تحميل السور بنجاح");

const surahInput = document.querySelector("#surah-input");
const displayBtn = document.querySelector("#display-btn");
const resultDiv = document.querySelector("#result");

function displaySurah() {
  const value = surahInput.value.trim();
  if (!value) return;

  let surah = null;
  // إذا المستخدم كتب رقم
  if (!isNaN(value)) {
    const index = parseInt(value);
    surah = data.find(s => s.index === index);
  } else {
    // إذا كتب الاسم
    surah = data.find(s => s.name === value || s.name.includes(value));
  }

  if (!surah) {
    resultDiv.innerHTML = `<p style='color:red;'>❌ لم يتم العثور على السورة</p>`;
    return;
  }

  const html = `
    <h2>${surah.index} - ${surah.name}</h2>
    <ol>
      ${surah.verses.map(v => `<li>${v}</li>`).join("")}
    </ol>
  `;
  resultDiv.innerHTML = html;
}

displayBtn.addEventListener("click", displaySurah);

// السماح بالضغط على Enter
surahInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") displaySurah();
});

}) .catch(error => { console.error("❌ فشل تحميل السور", error); });

