import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AlertWarning from "../alerts/AlertWarning";

function ValidarAutenticacaoCliente() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem("token") === null) {
        AlertWarning("Você precisa estar conectado a sua conta para acessar essa tela!");
        setRedirect({ redirect: true });
        return;
      }

      if (sessionStorage.getItem("tipo_usuario") !== "Cliente") {
        AlertWarning("Você precisa estar conectado como cliente para acessar essa tela!");
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
        AlertWarning("Você precisa estar conectado a sua conta para acessar essa tela!")
        setRedirect({ redirect: true });
        return;
      }

      if (sessionStorage.getItem("tipo_usuario") !== "Advogado") {
        AlertWarning("Você precisa estar conectado como advogado para acessar essa tela!")
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

function ValidarAutenticacaoAdmin() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    function validarSessao() {
      if (sessionStorage.getItem("token") === null) {
        AlertWarning("Você precisa estar conectado a sua conta para acessar essa tela!")
        setRedirect({ redirect: true });
        return;
      }

      if (sessionStorage.getItem("tipo_usuario") !== "Administrador") {
        AlertWarning("Você precisa estar conectado como administrador para acessar essa tela!")
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

export { ValidarAutenticacaoCliente, ValidarAutenticacaoAdvogado, ValidarAutenticacaoAdmin };