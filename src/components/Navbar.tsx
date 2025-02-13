// /components/NavBar.jsx
'use client'; // Indicamos que este componente usa funcionalidades del lado del cliente (ej. onClick)


import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-black text-white w-100">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logotipo (Izquierda) */}
                <div className="flex items-center space-x-8">
                    <div className="hidden md:flex space-x-8 mgr10">
                        <div className="font-bold text-xl">
                            RELIAPLANT
                        </div>
                    </div>
                    {/* Enlaces de navegación (Centro) */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/dashboard" className="font-light hover:text-gray-400">
                            Dashboard
                        </Link>
                        <Link href="/projects" className="font-light hover:text-gray-400">
                            Proyectos
                        </Link>
                        <Link href="/my-company" className="font-light hover:text-gray-400">
                            Mi empresa
                        </Link>
                    </div>
                </div>



                {/* Botón / Enlace de Login (Derecha) */}
                <div>
                    <Link href="/login" className="hover:text-gray-400">
                        Log in →
                    </Link>
                </div>

            </div>
        </nav>
    )
}
