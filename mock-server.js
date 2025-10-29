const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.MOCK_SERVER_PORT || 4000;

// In-memory state (mock)
let metrics = {
  messagesToday: 42,
  activeCommands: 3,
  avgResponseMs: 120,
  errorsToday: 1,
  chart: [1.2, 2.5, 2.1, 3.0, 4.2, 3.8, 4.0],
};

let logs = [
  { id: 1, type: 'Message', description: 'Received "Hello!"', source: 'User-A', timestamp: new Date().toISOString(), details: { text: 'Hello!' } },
  { id: 2, type: 'Command', description: 'Executed /status', source: 'User-B', timestamp: new Date().toISOString(), details: { command: '/status' } },
];

// Helpers to mutate state
function randomDelta() {
  return Math.floor(Math.random() * 5) - 2;
}

function updateMetrics() {
  metrics.messagesToday = Math.max(0, metrics.messagesToday + Math.floor(Math.random() * 3));
  metrics.activeCommands = Math.max(1, metrics.activeCommands + (Math.random() > 0.95 ? 1 : 0));
  metrics.avgResponseMs = Math.max(20, metrics.avgResponseMs + randomDelta());
  metrics.errorsToday = Math.max(0, metrics.errorsToday + (Math.random() > 0.98 ? 1 : 0));
  // Push a new data point and trim to last 12
  const nextPoint = Math.max(0.5, (Math.random() * 4) + 1);
  metrics.chart.push(Number(nextPoint.toFixed(2)));
  if (metrics.chart.length > 12) metrics.chart.shift();

  // Occasionally add a log
  if (Math.random() > 0.8) {
    const id = logs.length + 1;
    const newLog = {
      id,
      type: Math.random() > 0.8 ? 'Error' : (Math.random() > 0.5 ? 'Message' : 'Command'),
      description: `Auto event #${id}`,
      source: 'System',
      timestamp: new Date().toISOString(),
      details: { synthetic: true }
    };
    logs.unshift(newLog);
    // Keep recent 50 logs
    if (logs.length > 50) logs.pop();
  }
}

// REST endpoints
app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

// SSE endpoint
app.get('/sse', (req, res) => {
  res.set({
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*', // <- ensure browser can open SSE
  });
  res.flushHeaders();

  // Send an initial comment to keep connection alive in some proxies
  res.write(': connected\n\n');

  const sendState = () => {
    updateMetrics();
    res.write(`event: metrics\ndata: ${JSON.stringify(metrics)}\n\n`);
    res.write(`event: logs\ndata: ${JSON.stringify(logs.slice(0, 10))}\n\n`);
  };

  sendState();
  const interval = setInterval(sendState, 2000);

  req.on('close', () => {
    clearInterval(interval);
  });
});

// Simple health
app.get('/', (req, res) => res.send('Mock server running'));

app.listen(PORT, () => {
  console.log(`Mock server listening on http://localhost:${PORT}`);
});