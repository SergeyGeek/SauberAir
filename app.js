const ESP8266_IP = "192.168.68.100"; // �������� �� IP ������ ESP!

const map = L.map('map').setView([55.751244, 37.618423], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

async function fetchSensorData() {
  try {
    const response = await fetch(`http://${ESP8266_IP}/data`);
    return await response.json();
  } catch (error) {
    console.error("������:", error);
    return null;
  }
}

function addSensorMarker(lat, lng, data) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`
    <div class="sensor-info">
      <h3>������ BMP280</h3>
      <p>?? �����������: ${data.temp} �C</p>
      <p>?? ��������: ${data.pressure} ���</p>
      <p>?? ������: ${data.altitude} �</p>
    </div>
  `);
}

// ������ ������� (�������� ���������� �� ����)
addSensorMarker(55.751244, 37.618423, {
  temp: 25.5,
  pressure: 1013.2,
  altitude: 120
});

// ���������� ������ ������ 30 ���
setInterval(async () => {
  const data = await fetchSensorData();
  if (data) console.log("������ ���������:", data);
}, 30000);