//New Segment Form
//Displays the form for submitting new segment to a story
import React from 'react';

//Component
const NewSegmentForm = ({onChange, onSubmit, clearError, error}) => {
  return (
    <div className='story-extra card' style={{padding: '15px'}}>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='page-subtitle' htmlFor='newSegment'>
            What happens next? <span className='page-footnotes'>(You will NOT be able to edit the text after submitting it)</span>
          </label>
          <textarea
            name='newSegment'
            type='text'
            className='form-control'
            placeholder='Tell us how this story continues...'
            onChange={onChange}
            onFocus={clearError}/>
          <div className='text-right page-footnotes'>0 out 150 words</div>
        </div>
        <div className='text-right'>
          <button type='submit' className='btn std-button'>Contribute to this story</button>
          <div style={{marginTop: '5px'}} className='general-error'>{error}</div>
        </div>
      </form>
    </div>
  );
}

//Export
export default NewSegmentForm;
