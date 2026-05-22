import { STATUS_COLORS, type IssueStatus } from '@/data/issues';

interface StatusBeaconProps {
  status: IssueStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBeacon({ status, showLabel = true, size = 'md' }: StatusBeaconProps) {
  const color = STATUS_COLORS[status];

  const sizeMap = {
    sm: { dot: 8, svg: 10 },
    md: { dot: 10, svg: 12 },
    lg: { dot: 12, svg: 14 },
  };

  const s = sizeMap[size];

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative" style={{ width: s.svg, height: s.svg }}>
        <svg
          width={s.svg}
          height={s.svg}
          viewBox={`0 0 ${s.svg} ${s.svg}`}
          className="overflow-visible"
        >
          <circle
            cx={s.svg / 2}
            cy={s.svg / 2}
            r={s.dot / 2}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            opacity={0}
            className="animate-pulse-out"
            style={{ transformOrigin: 'center' }}
          />
          <circle
            cx={s.svg / 2}
            cy={s.svg / 2}
            r={s.dot / 2}
            fill={color}
          />
        </svg>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-[#9f9f9f]">
          {status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </span>
      )}
    </div>
  );
}
