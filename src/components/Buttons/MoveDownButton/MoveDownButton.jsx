import { memo } from 'react';

import { Button, ButtonConstants, ArrowDownLongIcon } from '@/components';

const MoveDownButton = (props) => {
  return (
    <Button
      category={ButtonConstants.ButtonCategories.PRIMARY}
      textOnly={true}
      {...props}
    >
      <ArrowDownLongIcon />
    </Button>
  );
};

const MoveDownButtonMemo = memo(MoveDownButton);

export { MoveDownButtonMemo as MoveDownButton };
