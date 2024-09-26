import React from 'react';
import './Venta.css'; // Importa tu archivo CSS personalizado

const Venta = () => {
    return (
        <div className="hero-section">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/* ... (código del navbar) ... */}
            </nav>
            <div className="hero-content text-center">
                <h1>"Un sistema que se adapta a tu escuela y no tu escuela al sistema"</h1>
                <div className="container">

                    <div className="mb-4">
                        <p>3 Meses bonificados!!!</p>
                        <p>- Sistema de Gestión para Nivel Terciario y Superior</p>
                        <p>- Sistema Web de Gestión de Aranceles para Academias</p>
                        <p>- Sistema de Gestión Web para Nivel Secundario </p>
                    </div>

                </div>
                <button className="btn btn-primary">Contacto</button>
            </div>
        </div>
    );
};

export default Venta;
