import React, { useState, useMemo, useEffect } from 'react';

// --- Icons (using simple inline SVGs for compatibility) ---

const Icon = ({ name, className = "w-5 h-5" }) => {
  let path = '';
  const defaultClasses = `${className} transition-colors duration-200`;

  switch (name) {
    case 'Dashboard':
      path = <path d="M3 4H1v16h22V4H3zm18 2v12h-6V6h6zm-8 0v12H9V6h4zm-6 0v12H3V6h4z" />;
      break;
    case 'Commands':
      path = <path d="M11 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-4-8v-2h4v2H7zM5 5v2H3v2h2v2H3v2h2v2H3v2h2v2h2v-2h2v-2h2v-2h2v-2h2V5h-2V3h-2v2h-2v2h-2V5H9V3H7v2H5zm12 0v2h-2V5h2zM9 5h2V3H9v2zm8 12v-2h4v2h-4z" />;
      break;
    case 'Activity Log':
      path = <path d="M13 3v2.09c4.54.85 8.1 4.41 8.95 8.95H23v2h-2.06c-.86 4.54-4.41 8.1-8.95 8.95V23h-2v-2.06c-4.54-.86-8.1-4.41-8.95-8.95H1v-2h2.06c.86-4.54 4.41-8.1 8.95-8.95V3h2zm0 2c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" />;
      break;
    case 'Settings':
      path = <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.79-7-4.14-7-8.1 0-.68.1-1.34.28-1.97l6.97 6.97v3.1zm5.35-2.61l-3.95-3.95 2.12-2.12 3.95 3.95c.5.5.5 1.37 0 1.87-.5.5-1.37.5-1.87 0zm-1.42-7.53c-.39-.39-1.02-.39-1.41 0l-4.24 4.24c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.24-4.24c.39-.39.39-1.02 0-1.41z" />;
      break;
    case 'Message':
      path = <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />;
      break;
    case 'Error':
      path = <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />;
      break;
    case 'Success':
      path = <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />;
      break;
    case 'Command':
      path = <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />;
      break;
    case 'Refresh':
      path = <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.25 4.31l1.77-1.77c-.52-.86-.82-1.83-.82-2.54 0-3.31 2.69-6 6-6zm6.75 1.69l-1.77 1.77c.52.86.82 1.83.82 2.54 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.25-4.31z" />;
      break;
    case 'Test':
      path = <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zM13 9V3.5L18.5 9H13z" />;
      break;
    case 'User':
      path = <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />;
      break;
    case 'SettingsCog':
      path = <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />;
      break;
    case 'Sun':
      path = <path d="M12 4V2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10c0-1.5-.37-2.92-1.03-4.18l-1.42 1.42C18.9 9.8 19 10.88 19 12c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7zM12 0c6.63 0 12 5.37 12 12s-5.37 12-12 12S0 18.63 0 12 5.37 0 12 0zm0 4v2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4z" />;
      break;
    case 'Moon':
      path = <path d="M10 2C5.59 2 2 5.59 2 10s3.59 8 8 8c.55 0 1-.45 1-1s-.45-1-1-1c-3.31 0-6-2.69-6-6s2.69-6 6-6c.55 0 1-.45 1-1s-.45-1-1-1zM18 10c0-4.41-3.59-8-8-8-.55 0-1-.45-1-1s.45-1 1-1c5.52 0 10 4.48 10 10s-4.48 10-10 10c-.55 0-1-.45-1-1s.45-1 1-1c3.31 0 6-2.69 6-6z" />;
      break;
    case 'Close':
      path = <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />;
      break;
    case 'Edit':
      path = <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />;
      break;
    case 'Delete':
      path = <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />;
      break;
    case 'Key':
      path = <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />;
      break;
    case 'Lock':
      path = <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />;
      break;
    default:
      path = <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />;
  }

  return (
    <svg className={defaultClasses} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {path}
    </svg>
  );
};


// --- Sub-Components ---

const NavItem = ({ name, activePage, setActivePage }) => {
  const isActive = activePage === name;
  const activeClasses = isActive
    ? 'bg-blue-600/10 text-blue-500 font-semibold dark:bg-blue-600/20'
    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700';

  return (
    <div
      onClick={() => setActivePage(name)}
      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-colors duration-200 ${activeClasses}`}
    >
      <Icon name={name} className="w-5 h-5" />
      <span>{name}</span>
    </div>
  );
};

const MetricCard = ({ title, value, unit, iconName, colorClass = 'text-blue-500' }) => (
  <div className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 min-w-[200px]">
    <div className="flex justify-between items-start">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</div>
      <Icon name={iconName} className={`w-6 h-6 ${colorClass}`} />
    </div>
    <div className="mt-2 flex flex-col">
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">{unit}</div>
    </div>
  </div>
);

// --- LineChart (now accepts data prop) ---
const LineChart = ({ data: propData }) => {
  const data = propData && propData.length ? propData : [1.2, 2.5, 2.8, 3.1, 4.5, 3.9, 4.2]; // fallback
  const max = Math.max(...data);
  const height = 150;
  const width = 600;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
    const y = height - padding - (d / (max || 1)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = [
    `${padding},${height - padding}`,
    ...points.split(' '),
    `${width - padding},${height - padding}`,
  ].join(' ');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Message Volume</h3>
      <div className="relative overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={index}
              x1={padding}
              y1={height - padding - ratio * (height - 2 * padding)}
              x2={width - padding}
              y2={height - padding - ratio * (height - 2 * padding)}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
              strokeDasharray="4"
            />
          ))}

          <polygon points={areaPoints} className="fill-blue-500/20" />
          <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points={points} />
          {data.map((d, i) => {
            const [x, y] = points.split(' ')[i].split(',');
            return <circle key={i} cx={x} cy={y} r="3" fill="#1d4ed8" />;
          })}

          <text x={10} y={padding} className="text-xs fill-gray-500 dark:fill-gray-400">$3.0</text>
          <text x={10} y={height / 2} className="text-xs fill-gray-500 dark:fill-gray-400">$2.0</text>
          <text x={10} y={height - padding + 5} className="text-xs fill-gray-500 dark:fill-gray-400" dominantBaseline="hanging">$1.0</text>

          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <text
              key={i}
              x={padding + (i / (data.length - 1 || 1)) * (width - 2 * padding)}
              y={height - 5}
              textAnchor="middle"
              className="text-xs fill-gray-500 dark:fill-gray-400"
            >
              {day}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// --- Page Components ---

// DashboardPage now receives metrics prop
const DashboardPage = ({ metrics }) => (
  <div className="space-y-8 p-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
    <p className="text-gray-500 dark:text-gray-400">Monitor your bot's performance and activity.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Messages Today"
        value={metrics?.messagesToday ?? "0"}
        unit="Total messages received"
        iconName="Message"
        colorClass="text-blue-500"
      />
      <MetricCard
        title="Active Commands"
        value={metrics?.activeCommands ?? "0"}
        unit="Custom commands enabled"
        iconName="Commands"
        colorClass="text-green-500"
      />
      <MetricCard
        title="Avg Response Time"
        value={`${metrics?.avgResponseMs ?? 0}ms`}
        unit="Average across all messages"
        iconName="SettingsCog"
        colorClass="text-amber-500"
      />
      <MetricCard
        title="Errors"
        value={metrics?.errorsToday ?? "0"}
        unit="Failed messages today"
        iconName="Error"
        colorClass="text-red-500"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <LineChart data={metrics?.chart} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <p className="text-gray-500 dark:text-gray-400 italic">No recent activity.</p>
      </div>
    </div>
  </div>
);

// ActivityLogPage now accepts logs prop
const ActivityLogPage = ({ logs: externalLogs = [] }) => {
  const [selectedLog, setSelectedLog] = useState(null);
  const mockLogs = externalLogs.length ? externalLogs : [
    { id: 1, type: 'Message', description: 'Received "What is the capital of France?"', source: 'User-A1B2C', timestamp: '2025-10-25 10:30:15', details: { message_id: 'msg123', platform: 'messenger', text: 'What is the capital of France?' } },
    { id: 2, type: 'Command', description: 'Executed command /status', source: 'User-D3E4F', timestamp: '2025-10-25 10:31:05', details: { command: '/status', user: 'User-D3E4F', execution_time_ms: 50 } },
    { id: 3, type: 'Admin', description: 'Updated Bot Configuration: Prefix changed to !', source: 'Admin-G5H6I', timestamp: '2025-10-25 10:45:22', details: { setting: 'prefix', old_value: '/', new_value: '!' } },
    { id: 4, type: 'Error', description: 'Failed to send response: API timeout', source: 'System', timestamp: '2025-10-25 10:48:40', details: { error_code: 504, endpoint: '/send_message', latency_ms: 10000 } },
    { id: 5, type: 'Message', description: 'Received "Thanks for the help!"', source: 'User-A1B2C', timestamp: '2025-10-25 11:01:10', details: { message_id: 'msg124', platform: 'messenger', text: 'Thanks for the help!' } },
  ];

  const handleLogClick = (log) => {
    setSelectedLog(log);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Activity Log</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Track messages, commands, and administrative changes in real-time.</p>

      <div className="flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex">
        {/* Log List (Left Panel) */}
        <div className={`w-full ${selectedLog ? 'lg:w-2/3' : 'w-full'} overflow-y-auto transition-all duration-300`}>
          <div className="sticky top-0 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Filter logs..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </div>
          {mockLogs.map(log => (
            <LogEntry
              key={log.id}
              log={log}
              isSelected={selectedLog?.id === log.id}
              onClick={() => handleLogClick(log)}
            />
          ))}
          {mockLogs.length === 0 && (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">No recent activity logs found.</div>
          )}
        </div>

        {/* Detail Panel (Right Side) */}
        {selectedLog && (
          <div className="hidden lg:block w-1/3 border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
            <LogDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
          </div>
        )}
      </div>

      {/* Mobile Detail Panel (Overlay) */}
      {selectedLog && (
        <div className="lg:hidden">
          <LogDetailPanel log={selectedLog} onClose={() => setSelectedLog(null)} />
        </div>
      )}
    </div>
  );
};

const CommandCard = ({ command, status, description, type }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 flex flex-col">
    <div className="flex justify-between items-start mb-3">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{command}</h2>
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${status === 'Enabled' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
        {status}
      </span>
    </div>

    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
      Type: <span className="font-medium text-gray-700 dark:text-gray-300">{type}</span>
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
      {description}
    </p>

    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-end space-x-3">
      <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
        <Icon name="Edit" className="w-4 h-4" />
        <span>Edit</span>
      </button>
      <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/50 dark:hover:bg-red-900 rounded-lg transition-colors">
        <Icon name="Delete" className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </div>
  </div>
);

const CommandsPage = () => {
  const mockCommands = [
    { command: '/help', status: 'Enabled', type: 'simple', description: 'Show available commands: /help, /status, /info' },
    { command: '/status', status: 'Enabled', type: 'simple', description: 'Check bot status. Bot is online and functioning properly!' },
    { command: '/info', status: 'Enabled', type: 'simple', description: 'Get bot information. I\'m your personal AI assistant powered by OpenAI. I can answer questions, execute commands, and help...' },
    { command: '/ping', status: 'Disabled', type: 'utility', description: 'Simple test command to check bot latency.' },
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Commands</h1>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 dark:text-gray-400">Create and manage custom bot commands.</p>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-500/50">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Add Command</span>
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search commands..."
          className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm11 2-4.35-4.35" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCommands.map((cmd, index) => (
          <CommandCard key={index} {...cmd} />
        ))}
      </div>
    </div>
  );
};

const LogDetailPanel = ({ log, onClose }) => (
  <div className="fixed inset-0 z-50 bg-gray-900/50 dark:bg-gray-900/70 backdrop-blur-sm flex justify-end">
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 h-full shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out translate-x-0">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Log Details</h3>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <Icon name="Close" className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{log.type} Event</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</p>
          <p className="font-mono text-sm text-gray-700 dark:text-gray-300">{log.timestamp}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
          <p className="text-gray-700 dark:text-gray-300">{log.description}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Source</p>
          <p className="text-gray-700 dark:text-gray-300">{log.source}</p>
        </div>

        <div className="space-y-1 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payload Data</p>
          <pre className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto text-xs text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
            {JSON.stringify(log.details, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  </div>
);

const LogEntry = ({ log, isSelected, onClick }) => {
  let iconName;
  let colorClass;
  switch (log.type) {
    case 'Message':
      iconName = 'Message';
      colorClass = 'text-blue-500 bg-blue-100 dark:bg-blue-900/50';
      break;
    case 'Command':
      iconName = 'Command';
      colorClass = 'text-green-500 bg-green-100 dark:bg-green-900/50';
      break;
    case 'Error':
      iconName = 'Error';
      colorClass = 'text-red-500 bg-red-100 dark:bg-red-900/50';
      break;
    case 'Admin':
    default:
      iconName = 'SettingsCog';
      colorClass = 'text-amber-500 bg-amber-100 dark:bg-amber-900/50';
  }

  const selectedClass = isSelected ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700';

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-150 ${selectedClass}`}
    >
      <div className={`flex-shrink-0 p-2 rounded-full ${colorClass}`}>
        <Icon name={iconName} className="w-5 h-5" />
      </div>
      <div className="ml-4 flex-grow overflow-hidden">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{log.description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {log.type} from {log.source}
        </p>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 ml-4 flex-shrink-0">{log.timestamp.split(' ')[1]}</p>
    </div>
  );
};

const SettingsPage = () => {
  const [prefix, setPrefix] = useState('/');
  const [responseLength, setResponseLength] = useState(512);

  const mockUsers = [
    { id: 1, name: 'Developer Bot Owner', email: 'dev@bot.com', role: 'Owner', removable: false, github: 'https://github.com/DeveloperBotOwner' },
    { id: 2, name: 'Jane Doe', email: 'jane@user.com', role: 'Manager', removable: true },
    { id: 3, name: 'John Smith', email: 'john@user.com', role: 'Editor', removable: true },
  ];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p className="text-gray-500 dark:text-gray-400">Manage bot configuration, integrations, and user access.</p>

      {/* --- Messenger Integration & Webhook Management --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Messenger Integration & Webhook</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Webhook Subscription Status</label>
              <div className="mt-1 flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Subscribed and Active</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bot is successfully connected to the Facebook Page.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Webhook URL (For Facebook App)</label>
              <p className="mt-1 text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-gray-600 dark:text-gray-300 break-all">
                https://your-server.com/api/messenger-hook
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use this URL when setting up your Facebook App webhook.</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 pt-4 md:pt-0">
            <button className="flex justify-center items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-500/50">
              <Icon name="Refresh" className="w-5 h-5" />
              <span>Sync Page Data</span>
            </button>
            <button className="flex justify-center items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
              <Icon name="Test" className="w-5 h-5" />
              <span>Test Webhook Connection</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Bot Configuration --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Bot Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Command Prefix</label>
              <input
                id="prefix"
                type="text"
                maxLength={1}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="mt-1 block w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Character used to trigger bot commands (e.g., /help).</p>
            </div>
            <div>
              <label htmlFor="responseLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Response Length (Tokens)</label>
              <input
                id="responseLength"
                type="number"
                value={responseLength}
                onChange={(e) => setResponseLength(parseInt(e.target.value))}
                min="100"
                max="2048"
                className="mt-1 block w-full md:w-40 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Controls the verbosity of AI-generated responses (max 2048).</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200">
            Save Configuration
          </button>
        </div>
      </div>

      {/* --- Security & User Management --- */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Security & User Management</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Authorized Users</h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockUsers.map(user => (
              <li key={user.id} className={`flex justify-between items-center p-3 rounded-lg ${!user.removable ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                <div className="flex flex-col">
                  <p className={`text-sm font-medium ${!user.removable ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                    {user.name} ({user.role})
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {!user.removable && (
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150"
                    >
                      View GitHub
                    </a>
                  )}
                  {user.removable && (
                    <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition duration-150">
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200">
            Add New User
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Login Page Component ---

const LoginPage = ({ handleLogin, isDarkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    if (email && password) {
      handleLogin();
    } else {
      // FIX: Replace alert() with console log or custom UI message
      console.log("Please enter both email and password.");
    }
  };

  const IconWrapper = isDarkMode ? Icon('Sun') : Icon('Moon');

  // Custom CSS for background animation and backdrop filter
  return (
    <div className={`h-screen flex items-center justify-center ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}>
      <style>{`
        /* Custom keyframes for background effect */
        @keyframes move-bg {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
          100% { transform: translate(0, 0); }
        }

        .animated-bg-shape {
          animation: move-bg 30s ease-in-out infinite alternate;
        }

        /* Frosted Glass Effect */
        .frosted-card {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial Gradient Base */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-50' : 'opacity-20'}`} style={{
          background: `radial-gradient(circle at 10% 90%, #3b82f640, transparent 40%),
                       radial-gradient(circle at 90% 10%, #ef444440, transparent 40%)`
        }}></div>

        {/* Animated Shapes (Simulating 3D elements) */}
        <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full top-1/4 left-1/4 animated-bg-shape"></div>
        <div className="absolute w-96 h-96 bg-red-600/10 rounded-lg bottom-1/4 right-1/4 animated-bg-shape"></div>
      </div>

      {/* --- Login Card --- */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl frosted-card bg-white/70 dark:bg-gray-900/70 border border-white/30 dark:border-gray-700/50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messenger Bot Login</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name={isDarkMode ? 'Sun' : 'Moon'} className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Main Application Component ---

const navItems = ['Dashboard', 'Commands', 'Activity Log', 'Settings'];

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true); // Changed default to TRUE for dark mode
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [logs, setLogs] = useState([]);

  // --- Added: missing handlers used by the UI (login, logout, theme toggle, nav) ---
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('Dashboard');
  };

  const toggleDarkMode = () => {
    setIsDarkMode((v) => !v);
  };

  const handleNavClick = (name) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(name);
      setIsTransitioning(false);
    }, 160);
  };
  // --- end added handlers ---

  // Resolve API base and SSE URL dynamically so client uses the same host/protocol and works in:
  // - local dev (http://localhost:4000)
  // - Codespaces / app.github.dev (https://<host>:4000)
  const protocol = window.location.protocol; // keep same scheme as the app (http/https)
  const host = window.location.hostname && (window.location.hostname.includes('github.dev') ? window.location.hostname : 'localhost');
  const API_BASE = `${protocol}//${host}:4000`;
  const SSE_URL = `${protocol}//${host}:4000/sse`;

  // Fetch initial snapshot
  useEffect(() => {
    fetch(`${API_BASE}/api/metrics`).then(r => r.json()).then(setMetrics).catch(() => {});
    fetch(`${API_BASE}/api/logs`).then(r => r.json()).then(setLogs).catch(() => {});
  }, [API_BASE]);

  // SSE connection for realtime updates with backoff + polling fallback
  useEffect(() => {
    let es = null;
    let polling = null;
    let shouldRun = true;
    let reconnectDelay = 1000;

    const startPolling = () => {
      if (polling) return;
      polling = setInterval(async () => {
        try {
          const [mRes, lRes] = await Promise.all([
            fetch(`${API_BASE}/api/metrics`),
            fetch(`${API_BASE}/api/logs`)
          ]);
          if (mRes.ok) setMetrics(await mRes.json());
          if (lRes.ok) setLogs(await lRes.json());
        } catch (err) {
          // ignore transient errors
        }
      }, 2000);
    };

    const connectSSE = () => {
      try {
        es = new EventSource(SSE_URL);
        es.addEventListener('metrics', (e) => {
          try { setMetrics(JSON.parse(e.data)); } catch (err) { /* ignore */ }
        });
        es.addEventListener('logs', (e) => {
          try { setLogs(JSON.parse(e.data)); } catch (err) { /* ignore */ }
        });
        es.addEventListener('open', () => {
          // connected, clear any polling
          if (polling) {
            clearInterval(polling);
            polling = null;
          }
          reconnectDelay = 1000;
        });
        es.onerror = () => {
          // close and attempt reconnect with backoff
          try { es.close(); } catch (_) {}
          es = null;
          if (!shouldRun) return;
          // start polling immediately as fallback
          startPolling();
          setTimeout(() => {
            if (!shouldRun) return;
            reconnectDelay = Math.min(reconnectDelay * 1.5, 30000);
            connectSSE();
          }, reconnectDelay);
        };
      } catch (err) {
        // EventSource not available / construction failed -> start polling
        startPolling();
      }
    };

    connectSSE();

    // If SSE hasn't opened within 2.5s, start polling as fallback
    const fallbackTimeout = setTimeout(() => {
      if (!es || es.readyState !== 1) startPolling();
    }, 2500);

    return () => {
      shouldRun = false;
      clearTimeout(fallbackTimeout);
      if (es) try { es.close(); } catch (_) {}
      if (polling) clearInterval(polling);
    };
  }, [API_BASE, SSE_URL]);

  // Map activePage state to the correct component
  const pageContent = useMemo(() => {
    if (isTransitioning) return null;

    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage metrics={metrics} />;
      case 'Commands':
        return <CommandsPage />;
      case 'Activity Log':
        return <ActivityLogPage logs={logs} />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DashboardPage metrics={metrics} />;
    }
  }, [activePage, isTransitioning, metrics, logs]);

  // If not logged in, show the Login Page
  if (!isLoggedIn) {
    return <LoginPage handleLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
  }


  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{`
        /* Global CSS for custom animation */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* Prevent scroll jump when the transition is active */
        .main-content-transition-active {
          overflow-y: hidden;
        }
      `}</style>

      {/* Main Layout Container */}
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 font-sans">

        {/* --- Permanent Sidebar (Always Visible on Desktop) --- */}
        <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Icon name="Message" className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messenger Bot</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Dashboard</p>
              </div>
            </div>
          </div>

          <div className="p-4 flex-grow space-y-1">
            <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Navigation</h2>
            {navItems.map(item => (
              <NavItem
                key={item}
                name={item}
                activePage={activePage}
                setActivePage={handleNavClick}
              />
            ))}
          </div>

          {/* Bot Status & Uptime (Bottom) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="relative group">
              {/* Status Indicator */}
              <div className="flex items-center justify-between p-2 rounded-lg cursor-pointer">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bot Active</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-green-500 font-semibold">Online</span>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>

              {/* Uptime Detail Panel (Hidden on hover) */}
              <div className="absolute bottom-full left-0 mb-2 w-full p-3 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-200 text-xs rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 pointer-events-none">
                <p className="font-semibold mb-1">Uptime Details:</p>
                <p>Uptime: 7 days, 4 hours</p>
                <p>Last Restart: 2025-10-18</p>
                <p>System Health: Nominal</p>
              </div>
            </div>
          </div>
        </div>


        {/* --- Main Content Area --- */}
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Top Navbar */}
          <header className="flex-shrink-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-end px-6 sticky top-0 z-10 transition-colors duration-300">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} className="w-6 h-6" />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                title="Logout"
              >
                <Icon name="User" className="w-6 h-6" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 overflow-y-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0 main-content-transition-active' : 'animate-fade-in'}`} key={activePage}>
            {pageContent}
          </main>
        </div>

      </div>
    </div>
  );
}
