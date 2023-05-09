import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import InvoiceGenerator from "./components/InvoiceGenerator";

function App() {
  return (
      <div>
        <Sidebar/>
        <div className="flex flex-col md:pl-64">
          <Navbar/>
            {/* Content */}
          <main className="flex-1">
            <div className="py-6">
                <InvoiceGenerator/>
            </div>
          </main>
        </div>
      </div>
  );
}

export default App;
