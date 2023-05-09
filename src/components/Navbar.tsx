import {Bars3BottomLeftIcon, BellIcon} from "@heroicons/react/24/outline";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";

function Navbar() {

    // Navigation items
    const userNavigation = [
        { name: 'Mi perfil', href: '#' },
        { name: 'Configuración', href: '#' },
        { name: 'Cerrar sesión', href: '#' },
    ]

    function classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => console.log('Button clicked hahahaha') /*setSidebarOpen(true)*/}>
                <span className="sr-only">Abir navegación</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
                <div className="flex flex-1">
                    <form className="flex w-full md:ml-0" action="#" method="GET">
                        <label htmlFor="search-field" className="sr-only">
                            Buscar factura
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                                id="search-field"
                                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                                placeholder="Buscar factura"
                                type="search"
                                name="search"/>
                        </div>
                    </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://scontent.fntr10-2.fna.fbcdn.net/v/t1.6435-9/81726474_2509608966027902_3113650675972571136_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=101&ccb=1-7&_nc_sid=85a577&_nc_ohc=_EPMDgxPLlwAX8yvJgH&_nc_ht=scontent.fntr10-2.fna&oh=00_AfBFwZ2qN_0agWNaCWgJoc_IlSCtSZ9fAfSFbiyp_6wZEQ&oe=6481329A"
                                    alt="" />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}>
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Navbar;