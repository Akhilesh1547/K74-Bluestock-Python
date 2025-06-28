document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/ipos/")
    .then(response => response.json())
    .then(ipos => {
      const container = document.getElementById("ipo-list");
      ipos.forEach(ipo => {
        // Fetch related documents for each IPO
        fetch(`/api/documents/?ipo_id=${ipo.id}`)
          .then(response => response.json())
          .then(documents => {
            const rhp = documents.length > 0 ? documents[0].rhp_pdf : "N/A";
            const drhp = documents.length > 0 ? documents[0].drhp_pdf : "N/A";


            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `
              <div class="card h-100 shadow-sm">
                <div class="card-body">
                  <h5 class="card-title">${ipo.company.company_name}</h5>
                  <p><strong>Price Band:</strong> ${ipo.price_band}</p>
                  <p><strong>Status:</strong> ${ipo.status}</p>
                  <p><strong>IPO Price:</strong> ₹${ipo.ipo_price}</p>
                  <p><strong>CMP:</strong> ₹${ipo.current_market_price}</p>
                  <p><strong>Return:</strong> ${ipo.current_return}%</p>
                  <p><strong>RHP:</strong> <a href="${rhp}" target="_blank">View</a></p>
                  <p><strong>DRHP:</strong> <a href="${drhp}" target="_blank">View</a></p>
                </div>
              </div>
            `;
            container.appendChild(card);
          });
      });
    });
});

card.innerHTML = `
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">${ipo.company.company_name}</h5>
      <ul class="list-unstyled">
        <li><strong>Status:</strong> ${ipo.status}</li>
        <li><strong>Price Band:</strong> ${ipo.price_band}</li>
        <li><strong>IPO Price:</strong> ₹${ipo.ipo_price}</li>
        <li><strong>CMP:</strong> ₹${ipo.current_market_price}</li>
        <li><strong>Return:</strong> ${ipo.current_return}%</li>
      </ul>
    </div>
  </div>
`;