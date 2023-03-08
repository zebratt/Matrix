import type { CSSProperties, FC, PropsWithChildren } from 'react';
import styles from './index.less';
import cls from 'classnames';

interface IPageProps {
  className?: string;
  style?: CSSProperties;
}

const Page: FC<PropsWithChildren<IPageProps>> = ({ children, className, style }) => {
  return (
    <div
      className={cls(styles.page, {
        [`${className}`]: !!className,
      })}
      style={style}
    >
      {children}
    </div>
  );
};

export default Page;
