import React, { useState } from 'react'
import data from './data'
import './styles.css'

function Accordion() {

  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [enableMulti, setEnableMulti] = useState(false);

  function handleSingleSelection(getCurrentId) {
    setSelected(selected === getCurrentId ? null : getCurrentId);

    // console.log("getCurrentId: ",getCurrentId);
  }

  function handleMultiSelect(getCurrentId) {
    let cpyMulti = [...multiSelected];
    const findIndexOfCurrentId = cpyMulti.indexOf(getCurrentId);

    // console.log("findIndexOfCurrentId: ", findIndexOfCurrentId);

    if (findIndexOfCurrentId === -1) cpyMulti.push(getCurrentId);
    else cpyMulti.splice(findIndexOfCurrentId, 1);

    setMultiSelected(cpyMulti);
  }

  // console.log("Selected: ", selected);
  // console.log("MultiSelected: ", multiSelected);

  return (
    <div className='wrapper'>
      <button onClick={() => setEnableMulti(!enableMulti)}>
        {enableMulti ? "Disable Multi Select" : "Enable Multi Select"}
      </button>
      <div className="accordion">
        {
          data && data.length > 0 ? (
            data.map((dataItem) => (
              <div className="item">
                <div onClick={enableMulti ? () => handleMultiSelect(dataItem.id) : () => handleSingleSelection(dataItem.id)} className="title">
                  <h3>{dataItem.question}</h3>
                  {
                    enableMulti ? (multiSelected.indexOf(dataItem.id) === -1 ? <span>+</span> : <span>-</span> ) : (selected === dataItem.id ? <span>-</span> : <span>+</span>)
                  }
                </div>
                {
                  enableMulti
                    ? multiSelected.indexOf(dataItem.id) !== -1 && (
                      <div className="content">
                      {dataItem.answer}
                    </div>
                  ) : selected === dataItem.id && (
                    <div className="content">
                      {dataItem.answer}
                    </div>
                  )
                }
              </div>
            ))
          ) : (
            <div className="item">No Data Found!</div>
          )
        }
      </div>
    </div>
  )
}

export default Accordion