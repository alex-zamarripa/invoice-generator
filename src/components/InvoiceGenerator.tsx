import InvoiceForm from "./InvoiceForm";

function InvoiceGenerator() {

    return (
        <div>
            {/* Title */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Generador de facturas</h1>
            </div>
            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    <InvoiceForm/>
                </div>
            </div>
        </div>
    );
}

export default InvoiceGenerator;