document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const menuList = document.getElementById("menu-list");

  menuIcon.addEventListener("click", function () {
      menuList.classList.toggle("hidden");
      
      if (menuIcon.classList.contains("active")) {
          menuIcon.innerHTML = '<i class="ph-fill ph-list"></i>';
      } else {
          menuIcon.innerHTML = '<i class="ph-fill ph-x"></i>';
      }
      
      menuIcon.classList.toggle("active");
  });
});

// Animasi saat halaman dimuat
window.addEventListener("load", function () {
  document.body.classList.add("fade-in");
});

function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in, .slide-up");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 50) {
      element.classList.add("show");
    }
  });
}

// Panggil fungsi saat pengguna scroll atau saat halaman dimuat
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

document.addEventListener("DOMContentLoaded", function () {
  // Cek apakah userId sudah ada di localStorage
  let userId = localStorage.getItem("userId");
  if (!userId) {
      // Jika belum ada, buat userId unik
      userId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      localStorage.setItem("userId", userId);
  }

  const form = document.querySelector(".feedback-form");
  const commentsList = document.getElementById("comments-list");
  const alertMessage = document.getElementById("alert-message");

  // Muat komentar yang ada
  loadComments();

  form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
          showAlert("Harap isi semua kolom formulir sebelum mengirim.");
          return;
      }

      alertMessage.classList.remove("show");

      const comment = {
          name: name,
          email: email,
          message: message,
          timestamp: new Date().toLocaleString(),
          userId: userId 
      };

      saveComment(comment);
      displayComment(comment, getComments().length - 1);

      form.reset();
  });

  function saveComment(comment) {
      let comments = getComments();
      comments.push(comment);
      localStorage.setItem("comments", JSON.stringify(comments));
  }

  function getComments() {
      return JSON.parse(localStorage.getItem("comments")) || [];
  }

  function loadComments() {
      commentsList.innerHTML = "";
      let comments = getComments();
      comments.forEach((comment, index) => displayComment(comment, index));
  }

  function displayComment(comment, index) {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      commentDiv.innerHTML = `
          <h4>${comment.name} <span>(${comment.email})</span></h4>
          <p>${comment.message}</p>
          <small>${comment.timestamp}</small>
          ${comment.userId === userId ? `<button class="delete-button" onclick="deleteComment(${index}, this.parentElement)">Hapus</button>` : ""}
          <hr>
      `;
      commentsList.appendChild(commentDiv);
  }

  window.deleteComment = function(index, commentDiv) {
      let comments = getComments();

      // Hanya hapus komentar jika userId komentar sama dengan userId pengguna saat ini
      if (comments[index].userId === userId) {
          comments.splice(index, 1);
          localStorage.setItem("comments", JSON.stringify(comments));
          commentDiv.remove();
      } else {
          alert("Anda tidak memiliki izin untuk menghapus komentar ini.");
      }
  };

  function showAlert(message) {
      alertMessage.textContent = message;
      alertMessage.classList.add("show");
  }
});

// Fungsi untuk Menampilkan MAP
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.257132, lng: 106.817202 },
    zoom: 17,
  });

  const marker = new google.maps.Marker({
    position: { lat: -6.257132, lng: 106.817202 },
    map: map,
    title: "Lokasi Warteg Kharomah",
  });
}

function showVideo() {
  const videoURL = "https://www.youtube.com/embed/dCD97HekVz4";
  document.getElementById('videoFrame').src = videoURL; 
  document.getElementById('videoOverlay').style.display = 'block';
  document.getElementById('videoContainer').style.display = 'block';
}

function closeVideo() {
  document.getElementById('videoOverlay').style.display = 'none';
  document.getElementById('videoContainer').style.display = 'none';
  document.getElementById('videoFrame').src = ""; 
}

// Animasi Loading saat membuka halaman
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
      setTimeout(function() {
          document.getElementById('loading').style.display = 'none';
      }, 1000); 
  }
};

window.addEventListener('beforeunload', function () {
  document.getElementById('loading').style.display = 'flex';
});
