document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".section");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((el) => el.classList.remove("active"));
      sections.forEach((sec) => sec.classList.remove("active"));

      item.classList.add("active");
      const target = item.getAttribute("data-target");
      const targetSection = document.getElementById(target);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  const inputNilaiSection = document.getElementById("input-nilai");
  if (inputNilaiSection) {
    const form = inputNilaiSection.querySelector("form");

    const nilaiContainer = document.createElement("div");
    nilaiContainer.className = "card";
    nilaiContainer.innerHTML = "<h4>Data Nilai yang Sudah Diinput:</h4><ul id='nilai-list'></ul>";
    inputNilaiSection.appendChild(nilaiContainer);

    const nilaiList = document.getElementById("nilai-list");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = form.querySelector("input[type='text']").value.trim();
      const nilai = form.querySelector("input[type='number']").value.trim();

      if (nama !== "" && nilai !== "") {
        const li = document.createElement("li");
        li.textContent = `${nama} - Nilai: ${nilai}`;
        nilaiList.appendChild(li);
        form.reset();
      }
    });
  }

  const formSiswa = document.getElementById("formSiswa");
  const daftarSiswa = document.getElementById("daftarSiswa");

  formSiswa.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("namaSiswa").value.trim();
    const kelas = document.getElementById("kelasSiswa").value.trim();
    const status = document.getElementById("statusSiswa").value;

    if (nama && kelas && status) {
      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.innerHTML = `
        <strong>Nama:</strong> ${nama}<br>
        <strong>Kelas:</strong> ${kelas}<br>
        <strong>Status:</strong> ${status}<br>
        <button onclick="hapusSiswa(this)">Hapus</button>
        <button onclick="editSiswa(this)">Edit</button>
      `;
      daftarSiswa.appendChild(div);
      formSiswa.reset();
    }
  });

  window.hapusSiswa = function (btn) {
    const konfirmasi = confirm("Yakin ingin menghapus siswa ini?");
    if (konfirmasi) {
      btn.parentElement.remove();
    }
  };

  window.editSiswa = function (btn) {
    const div = btn.parentElement;
    const items = div.querySelectorAll("strong");

    const namaLama = items[0].nextSibling.textContent.trim();
    const kelasLama = items[1].nextSibling.textContent.trim();
    const statusLama = items[2].nextSibling.textContent.trim();

    const namaBaru = prompt("Edit Nama:", namaLama);
    if (namaBaru === null) return;
    const kelasBaru = prompt("Edit Kelas:", kelasLama);
    if (kelasBaru === null) return;
    const statusBaru = prompt("Edit Status:", statusLama);
    if (statusBaru === null) return;

    items[0].nextSibling.textContent = " " + namaBaru;
    items[1].nextSibling.textContent = " " + kelasBaru;
    items[2].nextSibling.textContent = " " + statusBaru;
  };
});
