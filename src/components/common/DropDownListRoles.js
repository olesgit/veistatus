import React, {PropTypes} from 'react';
import classnames from "classnames";
//import { DropdownButton, MenuItem } from "react-bootstrap";


const DropDownListRoles = ({title, roleItems, onChange, error , selected})=>{
    return(
        <div className={classnames('form-group', {'has-error': error})}>    
             <select defaultValue={selected.toString()} onChange={onChange} className="form-control" id="RolesDropdownlist">
                  <option value="0">{title}</option>
                  { 
                      roleItems.map(items =>{
                      return(<option key={items.id} value={items.id}>{items.navn}</option>);
                     })
                  }              
              </select>  
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}

DropDownListRoles.propTypes = {
   title: PropTypes.string.isRequired,
   label:PropTypes.string,
   error:PropTypes.string,
   roleItems: PropTypes.array,
   onChange: PropTypes.func,
   selected:PropTypes.string
}

export default DropDownListRoles;