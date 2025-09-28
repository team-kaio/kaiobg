import { memo, useEffect } from 'react';

import './Quill.scss';

const QuillComponent = (props) => {
  const { value } = props;
  const { quillRef } = props;

  useEffect(() => {
    if (quillRef.current && window.AlloyEditor) {
      if (window.CKEDITOR) {
        window.CKEDITOR.basePath = '/alloy-editor/';
      }

      const editorInstance = window.AlloyEditor.editable(quillRef.current);

      return () => {
        if (editorInstance) {
          editorInstance.destroy();
        }
      };
    }
  }, [ quillRef ]);
  
  return (
    <div
      ref={quillRef}
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

const QuillMemo = memo(QuillComponent);

export { QuillMemo as Quill };
