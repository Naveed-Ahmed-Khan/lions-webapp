import React from 'react';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ required, label, value, onChange, formik, name }) => {
  let MyEditor = {}
  MyEditor.modules = {
    toolbar: [
      [{ 'header': [false, 3, 2, , 1,] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ 'color': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'font': [] }],
      // { 'size': ['small', 'large', 'huge'] }
      // [{ 'script': 'sub' }, { 'script': 'super' }, { 'direction': 'rtl' }],
      // ['link', 'image', 'clean'],
    ],
  };

  // The formats you want to use in your editor
  // MyEditor.formats = [
  //   'header', 'color', 'font', 'size',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ];
  return (
    <div className='flex flex-col mb-20'>
      <p className='mb-2 text-gray-600 font-medium'>{label}</p>
      {label &&
        <ReactQuill
          className='h-60'
          value={formik ? formik.values[name] : value}
          onChange={formik ? formik.handleChange : onChange}
          theme="snow" // Choose the theme of the editor
          modules={MyEditor.modules} // Pass the modules you want to use
          // formats={MyEditor.formats} // Pass the formats you want to use
          placeholder="Write job description here..." // Placeholder text for the editor
        />
      }
    </div>
  );
}



export default RichTextEditor;
