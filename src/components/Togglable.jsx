import { useState, forwardRef, useImperativeHandle } from "react";

// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [show, setShow] = useState(false)

  const toggleVisibility = () => setShow(!show);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: show ? 'none' : '' }}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={{ display: show ? '' : 'none' }}>
        {children}
      </div>
    </div>
  );
})  

export default Togglable;