import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlVCzk3svmRDS0MrKnsrvvPcYn4jQ_tjk",
  authDomain: "pesquisa-f6306.firebaseapp.com",
  projectId: "pesquisa-f6306",
  storageBucket: "pesquisa-f6306.appspot.com",
  messagingSenderId: "330225536275",
  appId: "1:330225536275:web:8136ab54f2704514175ee6",
};

// Inicializa o Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp);
const useCollectionRef = collection(db, "PesquisaCandidatos");

const HomePage = () => {
  const [pesquisa, setPesquisa] = useState([]);
  const [totaisPorPrefeito, setTotaisPorPrefeito] = useState({});
  const [totaisPorVereador, setTotaisPorVereador] = useState({});
  const [votosPorBairroPrefeito, setVotosPorBairroPrefeito] = useState({});
  const [votosPorBairroVereador, setVotosPorBairroVereador] = useState({});

  // Consulta os dados da coleção "PesquisaCandidatos"
  useEffect(() => {
    const fetchData = async () => {
      const dataResponse = await getDocs(useCollectionRef);
      const data = dataResponse.docs.map((doc) => doc.data());
      setPesquisa(data);

      // Processa os dados para calcular os totais
      const totaisPrefeito = {};
      const totaisVereador = {};
      const votosPrefeito = {};
      const votosVereador = {};

      data.forEach((item) => {
        // Total de votos por prefeito
        totaisPrefeito[item.prefeito] =
          (totaisPrefeito[item.prefeito] || 0) + 1;

        // Total de votos por vereador

        totaisVereador[item.vereador] =
          (totaisVereador[item.vereador] || 0) + 1;

        // Votos por bairro para prefeito
        votosPrefeito[item.bairro] = votosPrefeito[item.bairro] || {};
        votosPrefeito[item.bairro][item.prefeito] =
          (votosPrefeito[item.bairro][item.prefeito] || 0) + 1;

        // Votos por bairro para vereador
        votosVereador[item.bairro] = votosVereador[item.bairro] || {};
        votosVereador[item.bairro][item.vereador] =
          (votosVereador[item.bairro][item.vereador] || 0) + 1;
      });

      setTotaisPorPrefeito(totaisPrefeito);
      setTotaisPorVereador(totaisVereador);
      setVotosPorBairroPrefeito(votosPrefeito);
      setVotosPorBairroVereador(votosVereador);
    };

    fetchData();
  }, []);
  console.log(totaisPorVereador, totaisPorPrefeito);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard Pesquisa</h1>

      {/* Seção: Total de Votos por Prefeito */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Total de Votos por Prefeito
        </h2>
        <div className="card bg-base-200 shadow-xl p-4 rounded-md">
          {Object.entries(totaisPorPrefeito).map(([prefeito, total]) => (
            <div key={prefeito} className="py-1">
              <span className="font-semibold">{prefeito}:</span> {total} votos
            </div>
          ))}
        </div>
      </div>

      {/* Seção: Total de Votos por Vereador */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Total de Votos por Vereador
        </h2>
        <div className="card bg-base-200 shadow-xl p-4 rounded-md">
          {Object.entries(totaisPorVereador).map(([vereador, total]) => (
            <div key={vereador} className="py-1">
              <span className="font-semibold">{vereador}:</span> {total} votos
            </div>
          ))}
        </div>
      </div>

      {/* Seção: Votos por Bairro para Prefeito */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Votos por Bairro para Prefeito
        </h2>
        {Object.entries(votosPorBairroPrefeito).map(([bairro, candidatos]) => (
          <div
            key={bairro}
            className="card bg-base-200 shadow-xl p-4 rounded-md mb-2"
          >
            <h3 className="font-semibold">Bairro: {bairro}</h3>
            {Object.entries(candidatos).map(([prefeito, total]) => (
              <p key={prefeito}>
                {prefeito}: {total} votos
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Seção: Votos por Bairro para Vereador */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Votos por Bairro para Vereador
        </h2>
        {Object.entries(votosPorBairroVereador).map(([bairro, vereadores]) => (
          <div
            key={bairro}
            className="card bg-base-200 shadow-xl p-4 rounded-md mb-2"
          >
            <h3 className="font-semibold">Bairro: {bairro}</h3>
            {Object.entries(vereadores).map(([vereador, total]) => (
              <p key={vereador}>
                {vereador}: {total} votos
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
