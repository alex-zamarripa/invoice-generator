import React, { useState } from 'react';
import { uid } from 'react-uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';
const date = new Date();
const today = date.toLocaleDateString('es-MX', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
});

const InvoiceForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [cashierName, setCashierName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([
        {
            id: uid(6),
            name: '',
            qty: 1,
            price: 1.00,
        },
    ]);

    const reviewInvoiceHandler = (event: any) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const addNextInvoiceHandler = () => {
        setInvoiceNumber((prevNumber) => incrementString(prevNumber));
        setItems([
            {
                id: uid(6),
                name: '',
                qty: 1,
                price: 1.00,
            },
        ]);
    };

    const addItemHandler = () => {
        const id = uid(6);
        setItems((prevItem) => [
            ...prevItem,
            {
                id: id,
                name: '',
                qty: 1,
                price: 1.00,
            },
        ]);
    };

    const deleteItemHandler = (id: any) => {
        setItems((prevItem) => prevItem.filter((item) => item.id !== id));
    };

    const editItemHandler = (event: { target: { id: any; name: any; value: any; }; }) => {
        const editedItem = {
            id: event.target.id,
            name: event.target.name,
            value: event.target.value,
        };

        const newItems = items.map((items) => {
            for (let key in items) {
                if (key === editedItem.name && items.id === editedItem.id) {
                    // @ts-ignore
                    items[key] = editedItem.value;
                    console.log(editedItem.value)
                }
            }
            return items;
        });

        setItems(newItems);
    };

    const subtotal = items.reduce((prev, curr) => {
        if (curr.name.trim().length > 0)
            return prev + Number(curr.price * Math.floor(curr.qty));
        else return prev;
    }, 0);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;

    return (
        <form
            className="relative flex flex-col px-2 md:flex-row"
            onSubmit={reviewInvoiceHandler}>
            <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
                <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
                    <div className="flex space-x-2">
                        <span className="font-bold">Fecha: </span>
                        <span>{today}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="font-bold" htmlFor="invoiceNumber">
                            Número de factura:
                        </label>
                        <input
                            required
                            className="max-w-[130px]"
                            type="number"
                            name="invoiceNumber"
                            id="invoiceNumber"
                            min="1"
                            step="1"
                            value={invoiceNumber}
                            onChange={(event) => setInvoiceNumber(parseInt(event.target.value))}
                        />
                    </div>
                </div>
                <h1 className="text-center text-lg font-bold">FACTURA</h1>
                <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
                    <label
                        htmlFor="cashierName"
                        className="text-sm font-bold sm:text-base">
                        Vendedor:
                    </label>
                    <input
                        required
                        className="flex-1"
                        placeholder="Nombre del vendedor"
                        type="text"
                        name="cashierName"
                        id="cashierName"
                        value={cashierName}
                        onChange={(event) => setCashierName(event.target.value)}/>
                    <label
                        htmlFor="customerName"
                        className="col-start-2 row-start-1 text-sm font-bold md:text-base">
                        Cliente:
                    </label>
                    <input
                        required
                        className="flex-1"
                        placeholder="Nombre del cliente"
                        type="text"
                        name="customerName"
                        id="customerName"
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                    />
                </div>
                <table className="w-full p-4 text-left">
                    <thead>
                    <tr className="border-b border-gray-900/10 text-sm md:text-base">
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th className="text-center">PRECIO</th>
                        <th className="text-center">OPCIONES</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <InvoiceItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            qty={item.qty}
                            price={item.price}
                            onDeleteItem={deleteItemHandler}
                            onEditItem={editItemHandler}/>
                    ))}
                    </tbody>
                </table>
                <button
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                    type="button"
                    onClick={addItemHandler}>
                    Añadir producto
                </button>
                <div className="flex flex-col items-end space-y-2 pt-6">
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Descuento:</span>
                        <span>
              ({discount || '0'}%)${discountRate.toFixed(2)}
            </span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                        <span className="font-bold">Impuesto:</span>
                        <span>
              ({tax || '0'}%)${taxRate.toFixed(2)}
            </span>
                    </div>
                    <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">
              ${total % 1 === 0 ? total : total.toFixed(2)}
            </span>
                    </div>
                </div>
            </div>
            <div className="basis-1/4 bg-transparent">
                <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
                    <button
                        className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                        type="submit">
                        Continuar
                    </button>
                    <InvoiceModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        invoiceInfo={{
                            invoiceNumber,
                            cashierName,
                            customerName,
                            subtotal,
                            taxRate,
                            discountRate,
                            total,
                        }}
                        items={items}
                        onAddNextInvoice={addNextInvoiceHandler}/>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <label className="text-sm font-bold md:text-base" htmlFor="tax">
                                Impuesto:
                            </label>
                            <div className="flex items-center">
                                <input
                                    className="w-full rounded-r-none bg-white shadow-sm"
                                    type="number"
                                    name="tax"
                                    id="tax"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.0"
                                    value={tax}
                                    onChange={(event) => setTax(parseFloat(event.target.value))} />
                                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-bold md:text-base"
                                htmlFor="discount">
                                Descuento:
                            </label>
                            <div className="flex items-center">
                                <input
                                    className="w-full rounded-r-none bg-white shadow-sm"
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.0"
                                    value={discount}
                                    onChange={(event) => setDiscount(parseFloat(event.target.value))}
                                />
                                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  %
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default InvoiceForm;