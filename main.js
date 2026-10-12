
let tahap = 0;
let daftarPilihan = [];

// Fungsi utama saat tombol OK ditekan
function userInput() {
    let namaDepan = document.getElementById("firstname").value.trim();
    let namaBelakang = document.getElementById("surnname").value.trim();
    let jumlah = document.getElementById("jumlahPilihan").value;

    let error = document.getElementById("error");
    let inputPilihan = document.getElementById("inputPilihan");
    let pilihPilihan = document.getElementById("pilihPilihan");
    let inputEmail = document.getElementById("inputEmail");
    let hasil = document.getElementById("hasil");

    // Menghapus pesan error sebelumnya
    error.textContent = "";
    hasil.textContent = "";

    // Tahap 0: Memeriksa nama dan jumlah pilihan
    if (tahap === 0) {

        // Nama depan tidak boleh kosong atau mengandung angka
        if (namaDepan === "" || /\d/.test(namaDepan)) {
            error.textContent =
                "Nama depan wajib diisi dan tidak boleh mengandung angka!";
            return;
        }

        // Nama belakang tidak boleh kosong atau mengandung angka
        if (namaBelakang === "" || /\d/.test(namaBelakang)) {
            error.textContent =
                "Nama belakang wajib diisi dan tidak boleh mengandung angka!";
            return;
        }

        // Jumlah pilihan harus bilangan bulat minimal 1
        if (jumlah === "" || !Number.isInteger(Number(jumlah))
            || Number(jumlah) < 1) {
            error.textContent =
                "Jumlah pilihan harus bilangan bulat minimal 1!";
            return;
        }

        jumlah = Number(jumlah);

        // Membatasi jumlah agar tidak terlalu banyak
        if (jumlah > 50) {
            error.textContent =
                "Jumlah pilihan maksimal 50!";
            return;
        }

        // Membuat input teks sesuai jumlah pilihan
        inputPilihan.innerHTML = "";

        for (let i = 1; i <= jumlah; i++) {
            inputPilihan.innerHTML +=
                `<p>Pilihan ${i} :
                <input class="inputBio" type="text"
                id="pilihan${i}"></p>`;
        }

        tahap = 1;
        return;
    }

    // Tahap 1: Memeriksa dan menyimpan semua teks pilihan
    if (tahap === 1) {
        daftarPilihan = [];

        for (let i = 1; i <= Number(jumlah); i++) {
            let teks = document.getElementById(`pilihan${i}`)
                .value.trim();

            if (teks === "") {
                error.textContent =
                    `Teks Pilihan ${i} wajib diisi!`;
                return;
            }

            daftarPilihan.push(teks);
        }

        // Membuat radio button dari daftar pilihan
        pilihPilihan.innerHTML = "<p>Pilih salah satu:</p>";

        for (let i = 0; i < daftarPilihan.length; i++) {
            pilihPilihan.innerHTML +=
                `<p>
                    <input type="radio" name="pilihanDipilih"
                    id="radio${i}" value="${i}">
                    <label for="radio${i}">${daftarPilihan[i]}</label>
                </p>`;
        }

        tahap = 2;
        return;
    }

    // Tahap 2: Memeriksa pilihan pengguna
    if (tahap === 2) {
        let pilihanDipilih =
            document.querySelector('input[name="pilihanDipilih"]:checked');

        if (pilihanDipilih === null) {
            error.textContent =
                "Kamu harus memilih minimal satu pilihan!";
            return;
        }

        // Menampilkan input email
        inputEmail.innerHTML =
            `<p>Email :
            <input class="inputBio" type="text" id="email"></p>`;

        tahap = 3;
        return;
    }

    // Tahap 3: Memeriksa email dan menampilkan hasil
    if (tahap === 3) {
        let email = document.getElementById("email").value.trim();

        // Pola dasar alamat email
        let polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "" || !polaEmail.test(email)) {
            alert("Email tidak valid! Silakan masukkan email kembali.");

            document.getElementById("email").focus();
            return;
        }

        let pilihanDipilih =
            document.querySelector('input[name="pilihanDipilih"]:checked');

        let teksDipilih =
            daftarPilihan[Number(pilihanDipilih.value)];

        // Menggabungkan seluruh teks pilihan
        let semuaPilihan = daftarPilihan.join(", ");

        hasil.textContent =
            `Hallo, nama saya ${namaDepan} ${namaBelakang}, ` +
            `email ${email}. Saya mempunyai sejumlah ${jumlah} ` +
            `pilihan yaitu ${semuaPilihan}, dan saya memilih ${teksDipilih}.`;

        tahap = 4;

        // Menonaktifkan tombol setelah selesai
        document.getElementById("tombolOK").disabled = true;
    }
}
