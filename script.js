function toggleNoteContent(id) {
    var content = document.getElementById(id);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

function handleCopy(event) {
    event.preventDefault();
    const copyText = "For more information, visit: https://www.yoursite.com";
    event.clipboardData.setData('text/plain', copyText);
}

// Prevent dragging images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
});

// document.addEventListener('keydown', function(event) {
//     if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v' || event.key === 'u' || event.key === 'a')) {
//         event.preventDefault();
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengirim permintaan ke API Fear and Greed Index
    function fetchFearAndGreedIndex() {
        const url = "https://api.alternative.me/fng/?limit=2";

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Mendapatkan elemen untuk menampilkan data
                const fearGreedDataElement = document.getElementById('fear-greed-data');

                // Mengambil data Fear and Greed Index
                if (data && data.data && data.data.length > 0) {
                    const latestData = data.data[0];
                    const value = latestData.value;
                    const classification = latestData.value_classification;
                    const timestamp = new Date(latestData.timestamp * 1000).toLocaleString();

                    // Memperbarui konten elemen dengan data yang diambil
                    fearGreedDataElement.innerHTML = `
                        <p>Nilai: ${value}</p>
                        <p>Klasifikasi: ${classification}</p>
                        <p>Waktu: ${timestamp}</p>
                    `;
                } else {
                    fearGreedDataElement.innerHTML = '<p>Data tidak tersedia.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                const fearGreedDataElement = document.getElementById('fear-greed-data');
                fearGreedDataElement.innerHTML = '<p>Error memuat data.</p>';
            });
    }

    // Memanggil fungsi untuk mengambil data saat halaman dimuat
    fetchFearAndGreedIndex();
});


