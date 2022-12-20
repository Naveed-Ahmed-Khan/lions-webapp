import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const RichTextEditor = ({ value, formik, name }) => {
  return (
    <ReactQuill
      value={formik ? formik.values[name] : value}
      theme="bubble"
      readOnly
    />
  );
}



export default RichTextEditor;
