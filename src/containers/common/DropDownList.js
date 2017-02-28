import React, {PropTypes} from 'react';
import classnames from "classnames";


const DropDownList = ({label, title, id , Items, onChange, error , selected})=>{
    return(
        <div className={classnames('form-group', {'has-error': error})}>    
             <label htmlFor={id}>{label}</label>
             <select defaultValue={selected.toString()} onChange={onChange} className="form-control" id={id}>
                  { 
                      Items.map(items =>{
                      return(<option key={items.id} value={items.id}>{items.navn}</option>);
                     })
                  }              
              </select>  
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}

DropDownList.propTypes = {
   title: PropTypes.string.isRequired,
   id:PropTypes.string.isRequired,
   label:PropTypes.string,
   error:PropTypes.string,
   Items: PropTypes.array,
   onChange: PropTypes.func,
   selected:PropTypes.string
}
export default DropDownList
