import { memo, useCallback } from 'react';
import { Link } from 'react-router';

import styles from './ActionCard.module.scss';

const ActionCard = (props) => {
  const { title, description, children, to, renderIcon = () => null, ...otherProps } = props;

  const renderCardContent = useCallback(() => {
    return (
      <div className={`${styles.content} ${styles.contentCompact}`}>
        <div className={styles.actionCardHeader}>
          <div className={styles.icon}>
            {renderIcon()}
          </div>
          <div className={styles.actionCardInfo}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        {children}
      </div>
    );
  }, [ children, description, renderIcon, title ]);


  return (
    <Link
      className={`${styles.ActionCard} ${styles.hoverable}`}
      to={to}
      {...otherProps}
    >
      {renderCardContent()}
    </Link>
  );
};

const ActionCardMemo = memo(ActionCard);

export { ActionCardMemo as ActionCard };
