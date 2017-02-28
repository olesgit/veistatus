import React , {PropTypes} from 'react';
import classnames from "classnames";

const TextFieldGroup = ({ name, value, label, error, type, onChange, onBlur}) => {
    return(
        <div className={classnames('form-group', {'has-error': error})}>
            <label className="control-label">{label}</label>
            <input className="form-control"
              onChange={onChange}
              onBlur={onBlur}
              defaultValue={value}
              type={type}
              name={name}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
   name: PropTypes.string.isRequired,
   value:PropTypes.string.isRequired,
   label:PropTypes.string.isRequired,
   error:PropTypes.string,
   type: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur: PropTypes.func
}

TextFieldGroup.defaultProps ={
    type:'text'
}
export default TextFieldGroup;