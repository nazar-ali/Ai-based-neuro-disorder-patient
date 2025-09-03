'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

interface GlassyCardProps {
  title?: string;
  children: ReactNode;
  styles?: string;
  cardStyles?: string;
}

const GlassyCard: React.FC<GlassyCardProps> = ({
  title,
  children,
  styles = '',
  cardStyles = '',
}) => {
  return (
    <div className={clsx('p-4', styles)}>
      <div
        className={clsx(
          'glass w-full p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-md',
          cardStyles
        )}
      >
        {title && (
          <h2 className="text-xl font-bold text-white mb-2 border-b-2 border-white border-dashed w-fit">
            {title}
          </h2>
        )}
        <div className="text-wrap">{children}</div>
      </div>
    </div>
  );
};

export default GlassyCard;
