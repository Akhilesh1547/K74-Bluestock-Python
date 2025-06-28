document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("ipo-table-body");

  // Load existing IPOs
  fetch("/api/ipos/")
    .then(res => res.json())
    .then(data => {
      data.forEach(ipo => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${ipo.company.company_name}</td>
          <td>${ipo.status}</td>
          <td>${ipo.ipo_price}</td>
          <td>${ipo.current_market_price}</td>
          <td>${ipo.current_return}%</td>
        `;
        tableBody.appendChild(row);
      });
    });

  // Handle form submission
  document.getElementById("ipo-form").addEventListener("submit", e => {
    e.preventDefault();

    const body = {
      company_id: parseInt(document.getElementById("company_id").value),
      price_band: document.getElementById("price_band").value,
      status: document.getElementById("status").value,
      ipo_price: parseFloat(document.getElementById("ipo_price").value),
      current_market_price: parseFloat(document.getElementById("cmp").value),
      current_return: parseFloat(document.getElementById("return").value),
      open_date: "2024-01-01",  // placeholder
      close_date: "2024-01-05", // placeholder
      issue_size: "500 Cr",
      issue_type: "Book Built",
      listing_date: "2024-01-10",
      listing_price: 100,
      listing_gain: 10,
    };

    fetch("/api/ipos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
        alert("IPO added!");
        window.location.reload();
      } else {
        alert("Failed to add IPO.");
      }
    });
  });
});

fetch("/api/ipos/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
})
.then(res => {
  if (res.ok) {
    alert("IPO added successfully!");
    window.location.reload();
  } else {
    return res.json().then(err => {
      const msg = Object.values(err).flat().join("\n");
      alert("Error:\n" + msg);
    });
  }
})
.catch(err => alert("Unexpected error: " + err.message));