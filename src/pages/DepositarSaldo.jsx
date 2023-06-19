import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProvider";
import "../Styles/DepositarSaldo.css";

const DepositarSaldo = () => {
  const { loginResponse } = useContext(AuthContext); // Obter o loginResponse do contexto
  const [valor, setValor] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleMetodoPagamentoChange = (event) => {
    setMetodoPagamento(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (valor <= 0) {
      setMensagem("O valor do depósito deve ser maior que zero.");
      return;
    }

    try {
      const userId = loginResponse?.id; // Obter o ID do usuário do loginResponse
      console.log("Depósito realizado com sucesso:", loginResponse.id);
      const response = await axios.put(`/v1/account/deposit/${userId}`, {
        valor,
        metodoPagamento,
        numeroCartao,
        dataValidade,
        codigoSeguranca,
        senha,
      });

      console.log("Depósito realizado com sucesso:", response.data);

      setValor("");
      setMetodoPagamento("");
      setNumeroCartao("");
      setDataValidade("");
      setCodigoSeguranca("");
      setSenha("");
      setMensagem("Depósito realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar o depósito:", error);
      setMensagem(
        "Erro ao realizar o depósito. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleCancelar = () => {
    setValor("");
    setMetodoPagamento("");
    setNumeroCartao("");
    setDataValidade("");
    setCodigoSeguranca("");
    setSenha("");
    setMensagem("");
  };

  return (
    <div className="depositar-saldo-container">
      <div className="depositar-saldo-form">
        <h2 className="depositar-saldo-title">Depósito</h2>
        {mensagem && <p>{mensagem}</p>}
        <form onSubmit={handleSubmit}>
          <div className="depositar-saldo-descricao">
            <label className="depositar-saldo-label" htmlFor="valor" style={{ color: "#000" }}>
              Valor:
            </label>
            <input
              className="depositar-saldo-inputtext"
              type="text"
              id="valor"
              value={valor}
              onChange={handleValorChange}
            />
          </div>

          <div className="depositar-saldo-descricao">
            <label className="depositar-saldo-label" htmlFor="metodoPagamento" style={{ color: "#000" }}>
              Método de Pagamento:
            </label>
            <select
              className="depositar-saldo-select"
              id="metodoPagamento"
              value={metodoPagamento}
              onChange={handleMetodoPagamentoChange}
            >
              <option value="">Selecione um método de pagamento</option>
              <option value="transferenciaBancaria">Transferência Bancária</option>
              <option value="carteiraDigital">Carteira Digital</option>
            </select>
          </div>
          <div className="depositar-saldo-button-container">
            <button className="depositar-saldo-btn-depositar" type="submit">
              Depositar
            </button>
            <button type="button" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositarSaldo;