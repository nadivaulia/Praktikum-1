function updateSubKategori() {
    var Kategori = document.getElementById("Kategori").value;
    var subKategori = document.getElementById("SubKategori");

    subKategori.innerHTML = "";

    var options = [];
    switch (Kategori) {
        case "Baju":
            options = ["Baju Pria", "Baju Wanita", "Baju Anak"];
            break;
        case "Elektronik":
            options = ["Mesin Cuci", "Kulkas", "AC"];
            break;
        case "Alat Tulis":
            options = ["Kertas", "Map", "Pulpen"];
            break;
        default:
            options = [];
    }

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.textContent = options[i];
        subKategori.appendChild(option);
    }
}

function toggleHargaGrosir() {
    var yaGrosir = document.querySelector('input[name="wholesale"][value="Ya"]').checked;
    var hargaGrosirField = document.getElementById("fHargaGrosir");

    if (yaGrosir) {
        hargaGrosirField.required = true;
        hargaGrosirField.disabled = false;
        hargaGrosirField.value = ""; // Reset value when switching
    } else {
        hargaGrosirField.required = false;
        hargaGrosirField.disabled = true;
        hargaGrosirField.value = ""; // Clear the value if "Tidak" is selected
    }
}
function generateCaptcha() {
    var captcha = '';
    for (var i = 0; i < 5; i++) {
        var randomAscii = Math.floor(Math.random() * (122 - 65 + 1)) + 65;
        // Skip karakter antara Z (90) dan a (97)
        while (randomAscii > 90 && randomAscii < 97) {
            randomAscii = Math.floor(Math.random() * (122 - 65 + 1)) + 65;
        }
        captcha += String.fromCharCode(randomAscii);
    }
    document.getElementById("captcha").value = captcha;
}
// Panggil fungsi generateCaptcha saat halaman di-load
window.onload = function() {
    generateCaptcha();
};
function validateForm() {
    event.preventDefault(); // Mencegah form untuk submit otomatis
    var isvalid = true 
    var a = document.forms["formTambah"]["fNamaProduk"];
    var b = document.forms["formTambah"]["fDescProduk"];
    var c = document.forms["formTambah"]["fHargaSatuan"];
    var d = document.forms["formTambah"]["fHargaGrosir"];
    if (a.checkValidity() == false || b.checkValidity() == false || c.checkValidity() == false || d.checkValidity() == false) {
        document.getElementById("errNamaProduk").innerHTML = a.validationMessage;
        document.getElementById("errDescProduk").innerHTML = b.validationMessage;
        document.getElementById("errHargaSatuan").innerHTML = c.validationMessage;
        document.getElementById("errHargaGrosir").innerHTML = d.validationMessage;
        isvalid =  false;
    }
    //Validasi Jasa Kirim
    var checkboxes = document.querySelectorAll('input[name="courier"]:checked');
    if (checkboxes.length < 3) {
        document.getElementById("errJasaKirim").innerHTML = "Minimal Jasa Kirim yang dipilih adalah 3";
        isvalid =  false;
    }else{
        document.getElementById("errJasaKirim").innerHTML = "";
    }
    //validasi Captcha
    var captchaInput = document.forms["formTambah"]["captchaInput"].value;
    var captchaGenerated = document.getElementById("captcha").value;

    if (captchaInput !== captchaGenerated) {
        document.getElementById("errCaptcha").innerHTML = "Captcha tidak sesuai.";
        isvalid =  false;
    }else{
        document.getElementById("errJasaKirim").innerHTML = "";
    }

    if (isvalid) {
        document.forms["formTambah"].submit(); // Submit form jika valid
    }
}