import React from 'react'

export const LogOut = () => {

    const h4Style = {fontWeight: "lighter"}

    return (
        <div id="log-out" class="content">
            <div class="main">
                <div class="row">
                    <div class="col-sm-6 text-center">
                        <h4 class="display-4" style={h4Style}>Adios doctor</h4>
                        <p>Esperamos de nuevo su ayuda</p>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}
