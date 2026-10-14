import React, { useEffect, useRef } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warning' | 'error';
}

const LiveLogger: React.FC = () => {
  const logs: LogEntry[] = [
    { id: '1', timestamp: '10:23:45', message: 'Campaign started successfully', level: 'info' },
    { id: '2', timestamp: '10:24:10', message: 'Message sent to +15551234567', level: 'info' },
    { id: '3', timestamp: '10:25:30', message: 'Failed to send message to +15552345678: Number not found', level: 'error' },
    { id: '4', timestamp: '10:26:15', message: 'Proxy rotation initiated', level: 'warning' },
    { id: '5', timestamp: '10:27:45', message: 'Message sent to +15553456789', level: 'info' },
  ];

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div 
      ref={logContainerRef} 
      className="font-mono text-xs text-green-400 bg-black/80 rounded-xl p-4 h-64 overflow-y-auto"
    >
      {logs.map((log) => (
        <div key={log.id} className="mb-1">
          <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
          <span className={`${getLevelColor(log.level)}`}>
            {log.message}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LiveLogger;