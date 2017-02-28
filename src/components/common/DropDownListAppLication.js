import React, {PropTypes} from 'react';
import classnames from "classnames";
//import { DropdownButton, MenuItem } from "react-bootstrap";


const DropDownListApplication = ({title, roleItems, onChange, error , selected})=>{
    return(
        <div className={classnames('form-group', {'has-error': error})}>    
             <select defaultValue={selected.toString()} onChange={onChange} className="form-control" id="AppsDropdownlist">
                  <option value="0">{title}</option>
                  { 
                      roleItems.map(items =>{
                      return(<option key={items.applikasjonId} value={items.applikasjonId}>{items.applikasjonNavn}</option>);
                     })
                  }              
              </select>  
            {error && <span className="help-block">{error}</span> }
        </div>
    )
}

DropDownListApplication.propTypes = {
   title: PropTypes.string.isRequired,
   label:PropTypes.string,
   error:PropTypes.string,
   roleItems: PropTypes.array,
   onChange: PropTypes.func,
   selected:PropTypes.string
}

export default DropDownListApplication;