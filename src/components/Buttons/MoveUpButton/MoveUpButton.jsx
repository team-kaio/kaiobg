import { memo } from 'react';

import { Button, ArrowUpLongIcon, ButtonConstants } from '@/components';

const MoveUpButton = (props) => {
  return (
    <Button
      category={ButtonConstants.ButtonCategories.PRIMARY}
      textOnly={true}
      {...props}
    >
      <ArrowUpLongIcon />
    </Button>
  );
};

const MoveUpButtonMemo = memo(MoveUpButton);

export { MoveUpButtonMemo as MoveUpButton };
