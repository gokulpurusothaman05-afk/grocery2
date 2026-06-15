/**
 * Stackly Dashboard Controller
 * Manages client-side and admin-side dashboards, including sidebar transitions and custom vector charts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sidebar Panel Switching
  initDashboardSidebar();

  // 2. Load Analytics Graphs (Custom Canvas Renderer)
  initDashboardCharts();

  // 3. Client Dashboard Profile updates
  initClientDashboard();

  // 4. Admin Dashboard Inventory CRUD operations
  initAdminDashboard();
});

/* ==========================================================================
   1. Dashboard Sidebar Switching
   ========================================================================== */

function initDashboardSidebar() {
  const sidebarButtons = document.querySelectorAll('.sidebar-btn');
  const sections = document.querySelectorAll('.dashboard-section');

  if (sidebarButtons.length === 0) return;

  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      if (!targetId) return;

      // Remove active class from buttons
      sidebarButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Transition to target section
      sections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.display = 'none';
      });

      const activeSection = document.getElementById(targetId);
      if (activeSection) {
        activeSection.style.display = 'block';
        activeSection.classList.add('active');

        // GSAP animate entrance if available
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(activeSection, 
            { opacity: 0, x: 20 }, 
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
          );
        } else {
          activeSection.style.opacity = '0';
          setTimeout(() => {
            activeSection.style.transition = 'opacity 0.3s ease';
            activeSection.style.opacity = '1';
          }, 50);
        }
      }
    });
  });
}

/* ==========================================================================
   2. Analytics Charts (Canvas Rendering)
   ========================================================================== */

function initDashboardCharts() {
  // 1. Client Order Spending Chart
  const clientCanvas = document.getElementById('clientSpendingChart');
  if (clientCanvas) {
    drawSpendingChart(clientCanvas);
  }

  // 2. Admin Revenue Trend Line Chart
  const adminRevenueCanvas = document.getElementById('adminRevenueChart');
  if (adminRevenueCanvas) {
    drawRevenueChart(adminRevenueCanvas);
  }

  // 3. Admin Category Distribution Doughnut
  const adminCatCanvas = document.getElementById('adminCategoryChart');
  if (adminCatCanvas) {
    drawCategoryChart(adminCatCanvas);
  }
}

function drawSpendingChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  // Chart data
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const values = [45, 120, 85, 160, 110, 195]; // Spent in rupees (demo values)

  // Draw chart grid
  ctx.strokeStyle = '#eef1f6';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i <= 4; i++) {
    const gridY = h - 40 - (i * (h - 70) / 4);
    ctx.moveTo(40, gridY);
    ctx.lineTo(w - 20, gridY);
  }
  ctx.stroke();

  // Draw bars
  const startX = 60;
  const chartWidth = w - 80;
  const spacing = chartWidth / (labels.length - 1 || 1);
  const chartHeight = h - 70;
  const maxVal = 250;

  labels.forEach((label, idx) => {
    const val = values[idx];
    const barW = 30;
    const barH = (val / maxVal) * chartHeight;
    const x = startX + (idx * spacing) - (barW / 2);
    const y = h - 40 - barH;

    // Gradient fill
    const grad = ctx.createLinearGradient(x, y, x, y + barH);
    grad.addColorStop(0, '#FF9F1C'); // Accent Orange
    grad.addColorStop(1, '#ffc87c');

    ctx.fillStyle = grad;
    // Draw rounded rect bar
    drawRoundedRect(ctx, x, y, barW, barH, 6);
    ctx.fill();

    // Value text
    ctx.fillStyle = '#1A535C';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('₹' + val, x + (barW / 2), y - 8);

    // Label text
    ctx.fillStyle = '#6b7c96';
    ctx.font = '12px sans-serif';
    ctx.fillText(label, x + (barW / 2), h - 15);
  });
}

function drawRevenueChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  const values = [1200, 2400, 1900, 3500, 4200, 5800]; // Revenue in rupees (demo values)
  const maxVal = 7000;

  // Grid lines
  ctx.strokeStyle = '#eef1f6';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i <= 5; i++) {
    const gridY = h - 40 - (i * (h - 70) / 5);
    ctx.moveTo(50, gridY);
    ctx.lineTo(w - 20, gridY);
  }
  ctx.stroke();

  // Draw line
  const startX = 60;
  const chartWidth = w - 90;
  const spacing = chartWidth / (labels.length - 1 || 1);
  const chartHeight = h - 70;

  ctx.strokeStyle = '#1A535C'; // Primary Forest Green
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  labels.forEach((label, idx) => {
    const val = values[idx];
    const x = startX + (idx * spacing);
    const y = h - 40 - (val / maxVal) * chartHeight;

    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Draw dots and shadow
  labels.forEach((label, idx) => {
    const val = values[idx];
    const x = startX + (idx * spacing);
    const y = h - 40 - (val / maxVal) * chartHeight;

    // Dot circle
    ctx.fillStyle = '#FF9F1C';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Value label
    ctx.fillStyle = '#1A535C';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('₹' + val, x, y - 12);

    // X axis label
    ctx.fillStyle = '#6b7c96';
    ctx.font = '12px sans-serif';
    ctx.fillText(label, x, h - 15);
  });
}

function drawCategoryChart(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const data = [
    { label: 'Fruits', value: 40, color: '#1A535C' },
    { label: 'Vegetables', value: 30, color: '#2EC4B6' },
    { label: 'Nuts', value: 20, color: '#FF9F1C' },
    { label: 'Bakery', value: 10, color: '#E63946' }
  ];

  const centerX = w / 3;
  const centerY = h / 2;
  const radius = Math.min(centerX, centerY) - 20;

  let total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = -Math.PI / 2;

  data.forEach(slice => {
    const angle = (slice.value / total) * Math.PI * 2;
    ctx.fillStyle = slice.color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fill();
    startAngle += angle;
  });

  // Inner cutout for doughnut look
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Legends
  const legendX = centerX + radius + 40;
  const startLegendY = centerY - (data.length * 20) / 2;

  data.forEach((slice, idx) => {
    const y = startLegendY + idx * 25;

    // Color box
    ctx.fillStyle = slice.color;
    ctx.fillRect(legendX, y, 15, 15);

    // Label Text
    ctx.fillStyle = '#1A535C';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${slice.label} (${slice.value}%)`, legendX + 25, y + 12);
  });
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (height < radius) radius = height;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/* ==========================================================================
   3. Client Dashboard Functions
   ========================================================================== */

function initClientDashboard() {
  const profileForm = document.getElementById('client-profile-form');
  if (!profileForm) return;

  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');
    const addressInput = document.getElementById('profile-address');

    if (nameInput && emailInput && addressInput) {
      // Update displayed name in headers
      const displayNames = document.querySelectorAll('.client-name-display');
      displayNames.forEach(el => el.innerText = nameInput.value);

      // Simple notifications
      alert('Success! Your profile details have been saved.');
    }
  });

  // Schedule subscription order delivery
  const subForm = document.getElementById('subscription-form');
  if (subForm) {
    subForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const deliveryDate = document.getElementById('subscription-date').value;
      const boxType = document.getElementById('subscription-box-type').value;
      if (!deliveryDate) {
        alert('Please choose a valid scheduling date.');
        return;
      }
      alert(`Awesome! Your Stackly '${boxType}' box has been scheduled for delivery on ${deliveryDate}.`);
    });
  }
}

/* ==========================================================================
   4. Admin Dashboard Functions
   ========================================================================== */

function initAdminDashboard() {
  const addProductForm = document.getElementById('admin-add-product-form');
  const inventoryTable = document.getElementById('admin-inventory-list');

  if (!addProductForm || !inventoryTable) return;

  addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('inv-prod-name').value;
    const category = document.getElementById('inv-prod-category').value;
    const price = document.getElementById('inv-prod-price').value;
    const stock = document.getElementById('inv-prod-stock').value;

    if (!name || !price || !stock) {
      alert('Please fill out all product details.');
      return;
    }

    // Insert new row into the inventory table
    const tbody = inventoryTable.querySelector('tbody');
    const rowId = 'p-' + Math.floor(Math.random() * 1000);
    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.innerHTML = `
      <td><strong>${name}</strong></td>
      <td>${category}</td>
      <td>₹${parseFloat(price).toFixed(2)}</td>
      <td>${stock} Units</td>
      <td>
        <button class="btn-custom" onclick="deleteProduct('${rowId}')" style="background-color: #e63946; padding: 0.3rem 0.8rem; font-size: 0.8rem; box-shadow: none;">Delete</button>
      </td>
    `;

    tbody.appendChild(tr);
    addProductForm.reset();
    alert('Product added successfully to inventory!');

    // Re-draw categories doughnut (just add mockup change)
    const catCanvas = document.getElementById('adminCategoryChart');
    if (catCanvas) drawCategoryChart(catCanvas);
  });

  // Admin Order Status Switchers
  const orderTable = document.getElementById('admin-orders-table');
  if (orderTable) {
    orderTable.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('status-toggle-btn')) {
        const tr = e.target.closest('tr');
        const statusSpan = tr.querySelector('.status-pill');
        if (statusSpan.classList.contains('status-pending')) {
          statusSpan.className = 'status-pill status-completed';
          statusSpan.innerText = 'Completed';
          e.target.innerText = 'Ship Order';
        } else if (statusSpan.classList.contains('status-completed')) {
          statusSpan.className = 'status-pill status-cancelled';
          statusSpan.innerText = 'Cancelled';
          e.target.innerText = 'Reopen';
        } else {
          statusSpan.className = 'status-pill status-pending';
          statusSpan.innerText = 'Pending';
          e.target.innerText = 'Complete Order';
        }
      }
    });
  }
}

// Global scope delete product helper
window.deleteProduct = function(rowId) {
  const row = document.getElementById(rowId);
  if (row && confirm('Are you sure you want to delete this product from inventory?')) {
    row.remove();
  }
};
