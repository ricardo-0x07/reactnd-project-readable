import * as React from 'react';

const TextArea = ({
    name,
    label,
    onChange,
    placeholder,
    value,
    error
}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " has-error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <textarea
                    rows={rows}
                    cols={cols}
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}></textarea> {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

TextArea.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
};

export default TextArea;
