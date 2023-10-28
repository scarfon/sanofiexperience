"use client";
import Image from "next/image";
import { rtdb } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

export default function Home() {
	const [img, setImg] = useState("");
	const [imgProc, setImgProc] = useState("");
	const [nota, setNota] = useState({});
	const [loading, setLoading] = useState(false);
	const [loadingImg, setLoadingImg] = useState(true);
	const [loadingImgProc, setLoadingImgProc] = useState(true);

	useEffect(() => {
		const dbRefImgUrl = ref(rtdb, "nota/imgUrl");
		onValue(dbRefImgUrl, (snapshot) => {
			setImg(snapshot.val());
		});
	}, []);
	useEffect(() => {
		const dbRefImgProc = ref(rtdb, "nota/receipt/img_proc_url");
		onValue(dbRefImgProc, (snapshot) => {
			setImgProc(snapshot.val());
		});
	}, []);
	useEffect(() => {
		const dbRefNota = ref(rtdb, "nota/receipt");
		onValue(dbRefNota, (snapshot) => {
			setNota(snapshot.val());
		});
	}, []);

	useEffect(() => {
		if (img) {
			setLoadingImg(false);
		}
		if (imgProc) {
			setLoadingImgProc(false);
		}
	}, []);

	useEffect(() => {
		const dbRefLoading = ref(rtdb, "nota/start");
		onValue(dbRefLoading, (snapshot) => {
			setLoading(!snapshot.val());
		});
	}, []);

	return (
		<div className="">
			<div className="flex justify-around ">
				<Image src="/logo.svg" alt="Logo" width={500} height={50} />
				<Image src="/a.png" alt="Logo" width={150} height={50} />
			</div>
			<div className="flex justify-around items-center">
				{img && <Image src={img} alt="Nota" height={500} width={400} />}
				{imgProc && <Image src={imgProc} alt="Nota" height={500} width={400} />}
				{loading && (
					<div className="p-4 bg-white rounded-lg shadow-md text-center flex flex-col gap-2">
						<p className="text-2xl font-bold">Nota Processada com Sucesso! </p>
						{nota.merchantName && (
							<p className="text-xlg font-bold">{nota.merchantName}</p>
						)}
						{nota.cnpj && <p className="text-gray-600">CNPJ: {nota.cnpj}</p>}
						{nota.cidade && (
							<p className="text-gray-600">Cidade: {nota.cidade}</p>
						)}
						{nota.tipo && <p className="text-gray-600">Tipo: {nota.tipo}</p>}
						{nota.tipo_especial && (
							<p className="text-gray-600">
								Tipo Especial: {nota.tipo_especial}
							</p>
						)}
						{nota.tipo_pagamento && (
							<p className="text-gray-600">
								Tipo de Pagamento: {nota.tipo_pagamento}
							</p>
						)}
						{nota.total && <p className="text-gray-600">Total: {nota.total}</p>}
						{nota.transactionDate && (
							<p className="text-gray-600">
								Data da Transação: {nota.transactionDate}
							</p>
						)}
						{nota.transactionTime && (
							<p className="text-gray-600">
								Horário da Transação: {nota.transactionTime}
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
