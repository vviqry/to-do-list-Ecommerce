document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    {
      group: "1. Setup Awal",
      items: [
        "Install XAMPP/WAMP (Apache + MySQL + PHP)",
        "Buat database ecommerce_db di phpMyAdmin",
        "Jalankan SQL untuk membuat tabel (users, products, orders, order_items)",
      ],
    },
    {
      group: "2. Struktur Folder",
      items: [
        "Buat struktur folder sesuai panduan",
        "Pastikan semua file ada di lokasi yang benar",
      ],
    },
    {
      group: "3. Koneksi Database",
      items: [
        "File config/database.php sudah berfungsi",
        "Test koneksi dengan script sederhana",
      ],
    },
    {
      group: "4. Sistem Autentikasi",
      items: [
        "Login/logout berfungsi",
        "Session management bekerja",
        "Pembatasan akses (admin vs user biasa)",
      ],
    },
    {
      group: "5. CRUD Produk",
      items: [
        "Create: Form tambah produk",
        "Read: Tampilkan daftar produk",
        "Update: Form edit produk",
        "Delete: Hapus produk dengan konfirmasi",
      ],
    },
    {
      group: "6. Frontend User",
      items: [
        "Halaman utama menampilkan produk",
        "Halaman detail produk",
        "Keranjang belanja (cart)",
        "Sistem checkout sederhana",
      ],
    },
    {
      group: "7. Testing",
      items: [
        "Test semua fitur sebagai admin",
        "Test sebagai user biasa",
        "Perbaiki bug yang ditemukan",
      ],
    },
    {
      group: "8. Deployment",
      items: [
        "Upload ke hosting/web server",
        "Konfigurasi database di server",
        "Final testing di lingkungan live",
      ],
    },
  ];

  const todoList = document.getElementById("todo-list");
  const progressBar = document.getElementById("progress-bar");

  let totalTasks = 0;
  let completedTasks = 0;

  // Ambil data status checklist dari localStorage
  let savedStatus = JSON.parse(localStorage.getItem("taskStatus")) || {};

  tasks.forEach((taskGroup, groupIndex) => {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("task-group");

    const groupTitle = document.createElement("h3");
    groupTitle.textContent = taskGroup.group;
    groupDiv.appendChild(groupTitle);

    taskGroup.items.forEach((item, itemIndex) => {
      totalTasks++;
      const taskKey = `task-${groupIndex}-${itemIndex}`;
      const isChecked = savedStatus[taskKey] || false;
      if (isChecked) completedTasks++;

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = taskKey;
      checkbox.checked = isChecked;

      checkbox.addEventListener("change", () => {
        savedStatus[taskKey] = checkbox.checked;
        localStorage.setItem("taskStatus", JSON.stringify(savedStatus));
        checkbox.checked ? completedTasks++ : completedTasks--;
        updateProgress();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item));
      groupDiv.appendChild(label);
    });

    todoList.appendChild(groupDiv);
  });

  function updateProgress() {
    const percent = Math.round((completedTasks / totalTasks) * 100);
    progressBar.style.width = `${percent}%`;
    progressBar.textContent = `${percent}%`;
  }

  updateProgress(); // Panggil saat halaman pertama kali dimuat
});
