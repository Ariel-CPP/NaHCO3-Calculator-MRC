document.getElementById("calculateButton").addEventListener("click", calculateNaHCO3);

// Tambahkan event listener untuk menekan tombol Enter
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        calculateNaHCO3();
    }
});

function calculateNaHCO3() {
    const alkalinitasAwal = parseFloat(document.getElementById("alkalinitasAwal").value);
    const alkalinitasTarget = parseFloat(document.getElementById("alkalinitasTarget").value);
    const volumeAir = parseFloat(document.getElementById("volumeAir").value);

    if (isNaN(alkalinitasAwal) || isNaN(alkalinitasTarget) || isNaN(volumeAir)) {
        alert("Mohon masukkan angka yang valid pada semua kolom!");
        return;
    }

    if (alkalinitasTarget < alkalinitasAwal) {
        alert("Nilai Alkalinitas Target tidak boleh lebih rendah dari Alkalinitas Awal.");
        return;
    }

    const delta = alkalinitasTarget - alkalinitasAwal;

    // Rumus perhitungan NaHCO₃ (ppm)
    const resultPPM = 22.8 + (1.53 * delta) - (8.89 * Math.pow(10, -5) * Math.pow(delta, 2));

    // Hitung range hasil (-8% hingga +8%)
    const minResultPPM = resultPPM * 0.92;
    const maxResultPPM = resultPPM * 1.08;

    // Hitung berat (gram) NaHCO₃ berdasarkan volume air
    const weightNaHCO3 = (resultPPM / 1000) * volumeAir; // Konversi dari ppm ke gram/liter

    // Tampilkan hasil dalam tabel
    document.getElementById("result").innerHTML = `
        <table>
            <tr>
                <th>Parameter</th>
                <th>Hasil</th>
            </tr>
            <tr>
                <td>Kebutuhan NaHCO₃ (ppm)</td>
                <td>${resultPPM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Range (ppm)</td>
                <td>${minResultPPM.toFixed(2)} - ${maxResultPPM.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Kebutuhan Berat NaHCO₃ (gram)</td>
                <td>${weightNaHCO3.toFixed(2)}</td>
            </tr>
        </table>
    `;
}
