import React from 'react';

class InvoiceField extends React.Component<{ onEditItem: any, cellData: any }> {
    render() {
        let {onEditItem, cellData} = this.props;
        return (
            <input
                className={cellData.className}
                type={cellData.type}
                placeholder={cellData.placeholder}
                min={cellData.min}
                max={cellData.max}
                step={cellData.step}
                name={cellData.name}
                id={cellData.id}
                value={cellData.value}
                onChange={onEditItem}
                required
            />
        );
    }
}

export default InvoiceField;