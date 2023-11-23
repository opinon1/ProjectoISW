import React from 'react'

export const Home = () => {

    const headerStyle1 = {fontWeight: "lighter"}
    const divStyle1 = {backgroundColor: "#6275e6", color: "#fff"}
    const image = "https://d2lcsjo4hzzyvz.cloudfront.net/blog/wp-content/uploads/2019/12/Me%CC%81dico-atendiendo-a-una-sen%CC%83ora-de-edad.jpg"

    return (
        <div id="homeContent" class="content">
            <div class="main">
            <div class="row">
                <div class="col-sm-6 text-center">
                <h4 class="display-4" style={headerStyle1}>¡Bienvenido Doctor!</h4>
                <br/>
                <div class="jumbotron p-4 mx-auto w-50" style={divStyle1}>
                    <h1>SIGAMOS AYUDANDO</h1>
                    <h2 style={headerStyle1}>A TODO EL MUNDO</h2>
                </div>
                <br/>
                <div class="textoHospital">
                    <p class="textoH"><u>Tu dedicación ilumina caminos hacia la curación</u></p>
                    <p class="textoHU"><u>Eres la inspiración que guía la esperanza en cada diagnóstico</u></p>
                </div>
                </div>
                <div class="col-sm-6">
                <img src={image} class="imgDoctor img-fluid"/>
                </div>
            </div>
            </div>
        </div>
  
    )
}
