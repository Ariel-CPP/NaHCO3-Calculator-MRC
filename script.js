document.getElementById("calculateButton").addEventListener("click", function() {
    const alkalinitasAwal = parseFloat(document.getElementById("alkalinitasAwal").value);
    const alkalinitasTarget = parseFloat(document.getElementById("alkalinitasTarget").value);

    // Validasi input
    if (isNaN(alkalinitasAwal) || isNaN(alkalinitasTarget)) {
        alert("Mohon masukkan angka yang valid!");
        return;
    }

    if (alkalinitasTarget < alkalinitasAwal) {
        alert("Alkalinitas Target tidak boleh lebih rendah dari Alkalinitas Awal.");
        return;
    }

    const delta = alkalinitasTarget - alkalinitasAwal;

    // Hitung NaHCO3 (ppm) dengan rumus baru
    const result = 25.3 + (1.52 * delta) - (8.34 * Math.pow(10, -5) * Math.pow(delta, 2));

    // Hitung range (-8% hingga +8%)
    const minResult = result * 0.92;
    const maxResult = result * 1.08;

    // Tampilkan hasil
    document.getElementById("result").innerHTML = `
        <p>NaHCO3 (ppm): ${result.toFixed(2)}</p>
        <p>Range: ${minResult.toFixed(2)} - ${maxResult.toFixed(2)}</p>
    `;
});
