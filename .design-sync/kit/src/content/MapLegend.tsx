import type { ReactNode } from 'react';
import { cx } from '../cx';

export interface MapLegendItem {
  label: ReactNode;
  /** Swatch color, e.g. "#fc6603". */
  color: string;
  /** Swatch opacity (0-1). */
  opacity?: number;
  /** `square` for areas (default), `circle` for point/radius zones. */
  shape?: 'square' | 'circle';
}

export interface MapLegendProps {
  /** Small uppercase heading line. */
  title?: ReactNode;
  items: MapLegendItem[];
}

/** Bordered legend box with colored swatches for a map (`.map-legend`). */
export function MapLegend({ title, items }: MapLegendProps) {
  return (
    <div className="map-legend">
      {title != null && <span className="map-legend__title">{title}</span>}
      {items.map((it, i) => (
        <div key={i} className="map-legend__item">
          <span className={cx('map-legend__swatch', it.shape === 'circle' && 'map-legend__swatch--circle')} style={{ background: it.color, opacity: it.opacity }} />
          {it.label}
        </div>
      ))}
    </div>
  );
}
