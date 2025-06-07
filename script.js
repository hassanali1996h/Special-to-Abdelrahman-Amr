
let isAnalyzed = false;
let originalText = '';

document.getElementById("fetchSurah").addEventListener("click", function () {
  const input = document.getElementById("surahInput").value.trim();
  if (!input) {
    alert("يرجى إدخال اسم أو رقم السورة.");
    return;
  }

  fetch("surahs_full.json")
    .then(res => res.json())
    .then(data => {
      const entry = data.find(s => s.index == input || s.name == input);
      if (!entry) {
        alert("لم يتم العثور على السورة.");
        return;
      }
      originalText = entry.verse || "";
      document.getElementById("resultArea").textContent = originalText;

      // تحليل تلقائي مباشر بعد الجلب
      const words = originalText.trim().split(/\s+/);
      const analyzed = words.map((w, i) => `${w} [${i + 1}]`).join(" ");
      document.getElementById("resultArea").textContent = analyzed;
      isAnalyzed = true;
    })
    .catch(err => {
      alert("حدث خطأ أثناء جلب السورة.");
      console.error(err);
    });
});

document.getElementById("toggleWordAnalysis").addEventListener("click", () => {
  const resultArea = document.getElementById("resultArea");
  if (!originalText) return;

  if (isAnalyzed) {
    resultArea.textContent = originalText;
    isAnalyzed = false;
  } else {
    const words = originalText.trim().split(/\s+/);
    const analyzed = words.map((w, i) => `${w} [${i + 1}]`).join(" ");
    resultArea.textContent = analyzed;
    isAnalyzed = true;
  }
});
