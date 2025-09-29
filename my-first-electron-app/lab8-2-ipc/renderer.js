document.addEventListener('DOMContentLoaded', () => {
  const agent = JSON.parse(localStorage.getItem('currentAgent'));
  if (!agent) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('welcome').innerText = `สวัสดี Agent ${agent.name}`;
  document.getElementById('status').innerText = agent.status;

  // 🔄 เปลี่ยนสถานะตัวเอง
  document.getElementById('toggleStatus').addEventListener('click', async () => {
    const newStatus = agent.status === 'online' ? 'offline' : 'online';
    await window.electronAPI.changeAgentStatus(agent.id, newStatus);
    agent.status = newStatus;
    localStorage.setItem('currentAgent', JSON.stringify(agent));
    document.getElementById('status').innerText = newStatus;
  });

  // 🔔 Notification system
  window.electronAPI.onAgentStatusChanged((data) => {
    alert(`Agent ${data.agentId} เปลี่ยนสถานะเป็น ${data.newStatus}`);
    new Audio('assets/notify.mp3').play();
  });

  // 🕒 Real-time clock
  setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
  }, 1000);

  // 📈 Chart
  const ctx = document.getElementById('statsChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Calls', 'Messages', 'Tasks'],
      datasets: [{
        label: 'My Stats',
        data: [12, 19, 7],
        borderWidth: 1
      }]
    }
  });
});
