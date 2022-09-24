import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function ValidarAutenticacaoCliente() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem("token") === null) {
        alert("Você precisa estar conectado a sua conta para acessar essa tela!");
        setRedirect({ redirect: true });
        return;
      }

      if (sessionStorage.getItem("tipo_usuario") !== "Cliente") {
        alert("Você precisa estar conectado como cliente para acessar essa tela!");
        setRedirect({ redirect: true });
      }
    }

    validarSessao();
  }, []);

  return (
    <>
      {redirect && (
        <Redirect to='/login' />
      )}
    </>
  )
}

function ValidarAutenticacaoAdvogado() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem("token") === null) {
        alert("Você precisa estar conectado a sua conta para acessar essa tela!");
        setRedirect({ redirect: true });
        return;
      }

      if (sessionStorage.getItem("tipo_usuario") !== "Advogado") {
        alert("Você precisa estar conectado como advogado para acessar essa tela!");
        setRedirect({ redirect: true });
      }
    }

    validarSessao();
  }, []);

  return (
    <>
      {redirect && (
        <Redirect to='/login' />
      )}
    </>
  )
}

export { ValidarAutenticacaoCliente, ValidarAutenticacaoAdvogado }